/* eslint-disable no-prototype-builtins */
import * as WebIFC from "web-ifc";
import { GeometryReader } from "./GeometryReader";
import { DataConverter } from "../utils";
import { Serializer } from "bim-fragment";
import { Event } from "../Event";
const coordinationMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
export class IfcLoader {
	optionalCategories = {
		[WebIFC.IFCSPACE]: true,
		[WebIFC.IFCOPENINGELEMENT]: false,
	};
	webIfcSettings = {
		COORDINATE_TO_ORIGIN: true,
		USE_FAST_BOOLS: true,
		OPTIMIZE_PROFILES: true,
		CIRCLE_SEGMENTS_LOW: 12,
		CIRCLE_SEGMENTS_MEDIUM: 24,
		CIRCLE_SEGMENTS_HIGH: 48,
		CIRCLE_SEGMENTS: 48,
		BOOL_ABORT_THRESHOLD: 10,
	};
	exporter = new Serializer(); // export to fragment
	ifcLoaded = new Event();

	constructor(api, parentPort) {
		this.api = api;
		this.parentPort = parentPort;
		//https://github.com/IFCjs/components/blob/big-restructure/src/fragments/FragmentIfcLoader/src/geometry-reader.ts
		this.geometryReader = new GeometryReader(this.api);
		// https://github.com/IFCjs/components/blob/big-restructure/src/fragments/FragmentIfcLoader/src/data-converter.ts
		this.dataConverter = new DataConverter(this.api);
	}
	/**
	 *
	 * @param {*} dataArray
	 * @param {*} firstModel
	 * @param {*} callback make sure the all processing finished
	 */
	async loadIfc(dataArray, firstModel, callback) {
		await this.api.Init();
		const before = performance.now();
		this.webIfcSettings.COORDINATE_TO_ORIGIN = firstModel;
		const modelID = this.api.OpenModel(dataArray, this.webIfcSettings);
		if (!firstModel) {
			await this.api.SetGeometryTransformation(modelID, coordinationMatrix);
		}
		await this.readAllGeometries(modelID);

		const items = this.geometryReader.items;
		const model = await this.dataConverter.generate(items);
		this.dataConverter.getModelProperties((properties) => {
			console.log(`${((performance.now() - before) / 1000).toFixed(3)} seconds`);
			this.api.CloseModel(modelID);
			callback({
				arrayBuffer: this.exporter.export(model),
				properties: properties,
			});
		});
	}
	cleanUp() {
		this.geometryReader.cleanUp();
		this.dataConverter.cleanUp();
	}

	async readAllGeometries(modelID) {
		// this.api.StreamAllMeshesWithTypes(modelID, [ WebIFC.IFCOPENINGELEMENT], (mesh) => {
		// 	this.geometryReader.streamMesh(mesh);
		// });
		this.api.StreamAllMeshes(modelID, (mesh) => {
			this.geometryReader.streamMesh(mesh);
		});
	}
}
