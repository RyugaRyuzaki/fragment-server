import * as WebIFC from "web-ifc";
import { v4 as uuidv4 } from "uuid";
import { IfcJsonExporter } from "./IfcJsonExporter";
import { SpatialStructure } from "./SpatialStructure";
import { Event } from "../Event";
export class DataConverter {
	onPropertiesSerialized = new Event();

	constructor(api) {
		this.api = api;
		this._propertyExporter = new IfcJsonExporter(this.api);
		this._spatialTree = new SpatialStructure(this.api);
	}

	cleanUp() {
		this._spatialTree.cleanUp();
	}

	async generate(modelID) {
		await this._spatialTree.setUp(modelID);
		await this.onPropertiesSerialized.trigger({
			itemsByFloor: this._spatialTree.itemsByFloor,
			coordinationMatrix: this.api.GetCoordinationMatrix(modelID),
			properties: await this.getModelProperties(modelID),
		});
	}

	getIfcMetadata(modelID) {
		const { FILE_NAME, FILE_DESCRIPTION } = WebIFC;
		const name = this.getMetadataEntry(modelID, FILE_NAME);
		const description = this.getMetadataEntry(modelID, FILE_DESCRIPTION);
		const schema = this.api.GetModelSchema(modelID) || "IFC2X3";
		const maxExpressID = this.api.GetMaxExpressID(modelID);
		return { name, description, schema, maxExpressID };
	}

	getMetadataEntry(modelID, type) {
		let description = "";
		const descriptionData = this.api.GetHeaderLine(modelID, type) || "";
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

	getProjectID(modelID) {
		const projectsIDs = this.api.GetLineIDsWithType(modelID, WebIFC.IFCPROJECT);
		const projectID = projectsIDs.get(0);
		const project = this.api.GetLine(0, projectID);
		return project.GlobalId.value;
	}

	async getModelProperties(modelID) {
		return new Promise((resolve) => {
			this._propertyExporter.onPropertiesSerialized.on((properties) => {
				resolve(properties);
			});
			this._propertyExporter.export(modelID);
		});
	}
}
