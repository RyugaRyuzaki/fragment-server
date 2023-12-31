import * as THREE from "three";
import * as WEBIFC from "web-ifc";
import * as FRAGS from "bim-fragment";
import { mergeBufferGeometries } from "three-stdlib";

import { IfcCategories } from "./IfcCategories";
import { BoundingBox } from "./BoundingBox";
import { IfcJsonExporter } from "./IfcJsonExporter";
import { toCompositeID } from "./Misc";
import { SpatialStructure } from "./SpatialStructure";

export class DataConverter {
	categories = {};

	_model = new FRAGS.FragmentsGroup();
	_ifcCategories = new IfcCategories();
	_bbox = new BoundingBox();

	_fragmentKey = 0;

	_keyFragmentMap = {};
	_itemKeyMap = {};
	_propertyExporter = new IfcJsonExporter();
	_spatialTree = new SpatialStructure();

	constructor(api) {
		this.api = api;
	}

	cleanUp() {
		this._fragmentKey = 0;
		this._spatialTree.cleanUp();
		this.categories = {};
		this._model = new FRAGS.FragmentsGroup();
		this._ifcCategories = new IfcCategories();
		this._keyFragmentMap = {};
		this._itemKeyMap = {};
	}

	saveIfcCategories(webIfc) {
		this.categories = this._ifcCategories.getAll(webIfc, 0);
	}

	async generate(geometries) {
		await this._spatialTree.setUp(this.api);
		this.createAllFragments(geometries);
		await this.saveModelData();
		return this._model;
	}

	async saveModelData() {
		const itemsData = this.getFragmentsGroupData();
		this._model.keyFragments = this._keyFragmentMap;
		this._model.data = itemsData;
		this._model.coordinationMatrix = this.getCoordinationMatrix();
		this._model.uuid = this.getProjectID() || this._model.uuid;
		this._model.ifcMetadata = this.getIfcMetadata();
		this._model.boundingBox = this.getBoundingBox();
	}

	getBoundingBox() {
		this._bbox.add(this._model);
		const result = this._bbox.get();
		this._bbox.reset();
		return result;
	}

	getIfcMetadata() {
		const { FILE_NAME, FILE_DESCRIPTION } = WEBIFC;
		const name = this.getMetadataEntry(FILE_NAME);
		const description = this.getMetadataEntry(FILE_DESCRIPTION);
		const schema = this.api.GetModelSchema(0) || "IFC2X3";
		const maxExpressID = this.api.GetMaxExpressID(0);
		return { name, description, schema, maxExpressID };
	}

	getMetadataEntry(type) {
		let description = "";
		const descriptionData = this.api.GetHeaderLine(0, type) || "";
		if (!descriptionData) return description;
		for (const arg of descriptionData.arguments) {
			if (arg === null || arg === undefined) {
				continue;
			}
			if (Array.isArray(arg)) {
				for (const subArg of arg) {
					description += `${subArg.value}|`;
				}
			} else {
				description += `${arg.value}|`;
			}
		}
		return description;
	}

	getProjectID() {
		const projectsIDs = this.api.GetLineIDsWithType(0, WEBIFC.IFCPROJECT);
		const projectID = projectsIDs.get(0);
		const project = this.api.GetLine(0, projectID);
		return project.GlobalId.value;
	}

	getCoordinationMatrix() {
		const coordArray = this.api.GetCoordinationMatrix(0);
		return new THREE.Matrix4().fromArray(coordArray);
	}

	async getModelProperties(callback) {
		this._propertyExporter.propertiesSerialized.on((properties) => {
			this._model.properties = properties;
			this._model.properties.spatialTree = this._spatialTree.itemsByFloor;
			callback(properties);
		});
		this._propertyExporter.export(this.api, 0);
	}

	createAllFragments(geometries) {
		const uniqueItems = {};

		const matrix = new THREE.Matrix4();
		const color = new THREE.Color();

		for (const id in geometries) {
			const { buffer, instances } = geometries[id];

			const transparent = instances[0].color.w !== 1;
			const opacity = transparent ? 0.4 : 1;
			const material = new THREE.MeshLambertMaterial({ transparent, opacity });

			// This prevents z-fighting for ifc spaces
			if (opacity !== 1) {
				material.depthWrite = false;
				material.polygonOffset = true;
				material.polygonOffsetFactor = 5;
				material.polygonOffsetUnits = 1;
			}

			if (instances.length === 1) {
				const instance = instances[0];
				const { x, y, z, w } = instance.color;
				const matID = `${x}-${y}-${z}-${w}`;
				if (!uniqueItems[matID]) {
					material.color = new THREE.Color().setRGB(x, y, z, "srgb");
					uniqueItems[matID] = { material, geometries: [], expressIDs: [] };
				}
				matrix.fromArray(instance.matrix);
				buffer.applyMatrix4(matrix);
				uniqueItems[matID].geometries.push(buffer);
				uniqueItems[matID].expressIDs.push(instance.expressID.toString());
				continue;
			}

			const fragment = new FRAGS.Fragment(buffer, material, instances.length);
			this._keyFragmentMap[this._fragmentKey] = fragment.id;

			const previousIDs = new Set();

			for (let i = 0; i < instances.length; i++) {
				const instance = instances[i];
				matrix.fromArray(instance.matrix);
				const { expressID } = instance;

				let instanceID = expressID.toString();
				let isComposite = false;
				if (!previousIDs.has(expressID)) {
					previousIDs.add(expressID);
				} else {
					if (!fragment.composites[expressID]) {
						fragment.composites[expressID] = 1;
					}
					const count = fragment.composites[expressID];
					instanceID = toCompositeID(expressID, count);
					isComposite = true;
					fragment.composites[expressID]++;
				}

				fragment.setInstance(i, {
					ids: [instanceID],
					transform: matrix,
				});

				const { x, y, z } = instance.color;
				color.setRGB(x, y, z, "srgb");
				fragment.mesh.setColorAt(i, color);

				if (!isComposite) {
					this.saveExpressID(expressID.toString());
				}
			}

			fragment.mesh.updateMatrix();
			this._model.items.push(fragment);
			this._model.add(fragment.mesh);
			this._fragmentKey++;
		}

		const transform = new THREE.Matrix4();
		for (const matID in uniqueItems) {
			const { material, geometries, expressIDs } = uniqueItems[matID];

			const geometriesByItem = {};
			for (let i = 0; i < expressIDs.length; i++) {
				const id = expressIDs[i];
				if (!geometriesByItem[id]) {
					geometriesByItem[id] = [];
				}
				geometriesByItem[id].push(geometries[i]);
			}

			const sortedGeometries = [];
			const sortedIDs = [];
			for (const id in geometriesByItem) {
				sortedIDs.push(id);
				const geometries = geometriesByItem[id];
				if (geometries.length) {
					const merged = mergeBufferGeometries(geometries);
					sortedGeometries.push(merged);
				} else {
					sortedGeometries.push(geometries[0]);
				}
				for (const geometry of geometries) {
					geometry.dispose();
				}
			}

			const geometry = FRAGS.GeometryUtils.merge([sortedGeometries], true);
			const fragment = new FRAGS.Fragment(geometry, material, 1);
			this._keyFragmentMap[this._fragmentKey] = fragment.id;

			for (const id of sortedIDs) {
				this.saveExpressID(id);
			}
			this._fragmentKey++;

			fragment.setInstance(0, { ids: sortedIDs, transform });
			this._model.items.push(fragment);
			this.setupModel();
			this._model.add(fragment.mesh);
		}
	}
	setupModel() {
		this._model.items.forEach((item) => {
			this.setupFragment(item);
		});
	}
	setupFragment = (fragment) => {
		// model is loaded then have receive shadows?
		fragment.mesh.castShadow = true;
		fragment.mesh.receiveShadow = true;
		// compute geometry
		fragment.mesh.geometry.computeBoundingBox();
		fragment.mesh.geometry.computeBoundingSphere();
		fragment.mesh.geometry.computeVertexNormals();
		// set model type for cast element
		// storage modelMaterials
		if (Array.isArray(fragment.mesh.material)) {
			fragment.mesh.material.forEach((material) => {
				material.clipShadows = true;
			});
		} else {
			fragment.mesh.material.clipShadows = true;
		}
	};
	saveExpressID(expressID) {
		if (!this._itemKeyMap[expressID]) {
			this._itemKeyMap[expressID] = [];
		}
		this._itemKeyMap[expressID].push(this._fragmentKey);
	}

	getFragmentsGroupData() {
		const itemsData = {};
		for (const id in this._itemKeyMap) {
			const keys = [];
			const rels = [];
			const idNum = parseInt(id, 10);
			const level = this._spatialTree.itemsByFloor[idNum] || 0;
			const category = this.categories[idNum] || 0;
			rels.push(level, category);
			for (const key of this._itemKeyMap[id]) {
				keys.push(key);
			}
			itemsData[idNum] = [keys, rels];
		}
		return itemsData;
	}
}
