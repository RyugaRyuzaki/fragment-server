import * as WebIFC from "web-ifc";
import { Event } from "./Event";
import { GeometryReader } from "./GeometryReader";
import { DataConverter } from "./Data";

export class IfcLoader {
	/**
	 *
	 */

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
	onParser = new Event();
	constructor(api) {
		this.api = api;
		this.dataConverter = new DataConverter(this.api);
		this.geometryReader = new GeometryReader(this.api);
	}
	async parse(data) {
		try {
			await this.api.Init();
			const modelID = this.api.OpenModel(data, this.webIfcSettings);
			this.api.GetAndClearErrors(modelID);
			this.dataConverter.onPropertiesSerialized.on(({ itemsByFloor, coordinationMatrix, properties }) => {
				const ifcSpaces = {};
				const elements = {};
				const buildings = {};
				this.readIfcSpaceGeometry(modelID, ifcSpaces, elements);
				Object.keys(itemsByFloor).forEach((key) => {
					if (!buildings[itemsByFloor[key]]) buildings[itemsByFloor[key]] = [];
					buildings[itemsByFloor[key]].push(parseInt(key));
				});
				this.onParser.trigger({
					ifcSpaces,
					elements,
					buildings,
					coordinationMatrix,
					properties,
				});
				this.api.CloseModel(modelID);
			});
			this.dataConverter.generate(modelID);
		} catch (error) {
			console.log(error);
		}
	}
	readIfcSpaceGeometry(modelID, ifcSpaces, elements) {
		this.api.StreamAllMeshesWithTypes(modelID, [WebIFC.IFCSPACE], (mesh) => {
			this.geometryReader.streamMeshIfcSpace(modelID, mesh, ifcSpaces);
		});
		this.api.StreamAllMeshes(modelID, (mesh) => {
			this.geometryReader.streamMesh(modelID, mesh, elements);
		});
	}
}
