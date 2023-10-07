import * as WebIFC from "web-ifc";
import { Event } from "../Event";
import { GeometryTypes } from "../GeometryReader";

export class IfcJsonExporter {
	onPropertiesSerialized = new Event();
	size;

	constructor(api) {
		this.api = api;
	}

	async export(modelID) {
		const geometriesIDs = await this.getAllGeometriesIDs(modelID);
		let properties = {};
		properties.coordinationMatrix = this.api.GetCoordinationMatrix(modelID);
		const allLinesIDs = await this.api.GetAllLines(modelID);
		const linesCount = allLinesIDs.size();

		let counter = 0;
		for (let i = 0; i < linesCount; i++) {
			const id = allLinesIDs.get(i);
			if (!geometriesIDs.has(id)) {
				try {
					properties[id] = await this.api.GetLine(modelID, id);
					properties[id].typeName = this.api.GetNameFromTypeCode(properties[id].type);
				} catch (e) {
					console.log(`Properties of the element ${id} could not be processed`);
				}
				counter++;
			}

			if (this.size !== undefined && counter > this.size) {
				await this.onPropertiesSerialized.trigger(properties);
				properties = null;
				properties = {};
				counter = 0;
			}
		}

		await this.onPropertiesSerialized.trigger(properties);
		properties = null;
	}

	async getAllGeometriesIDs(modelID) {
		// Exclude location info of spatial structure

		const placementIDs = new Set();

		const structures = new Set();
		this.getStructure(WebIFC.IFCPROJECT, modelID, structures);
		this.getStructure(WebIFC.IFCSITE, modelID, structures);
		this.getStructure(WebIFC.IFCBUILDING, modelID, structures);
		this.getStructure(WebIFC.IFCBUILDINGSTOREY, modelID, structures);
		this.getStructure(WebIFC.IFCSPACE, modelID, structures);

		for (const id of structures) {
			const properties = this.api.GetLine(0, id);

			const placementRef = properties.ObjectPlacement;
			if (!placementRef || placementRef.value === null) {
				continue;
			}
			const placementID = placementRef.value;
			placementIDs.add(placementID);

			const placementProps = this.api.GetLine(0, placementID);

			const relPlacementID = placementProps.RelativePlacement;
			if (!relPlacementID || relPlacementID.value === null) {
				continue;
			}

			placementIDs.add(relPlacementID.value);
			const relPlacement = this.api.GetLine(0, relPlacementID.value);

			const location = relPlacement.Location;

			if (location && location.value !== null) {
				placementIDs.add(location.value);
			}
		}

		const geometriesIDs = new Set();
		const geomTypesArray = Array.from(GeometryTypes);
		for (let i = 0; i < geomTypesArray.length; i++) {
			const category = geomTypesArray[i];
			// eslint-disable-next-line no-await-in-loop
			const ids = await this.api.GetLineIDsWithType(modelID, category);
			const idsSize = ids.size();
			for (let j = 0; j < idsSize; j++) {
				const id = ids.get(j);
				if (placementIDs.has(id)) {
					continue;
				}
				geometriesIDs.add(id);
			}
		}
		return geometriesIDs;
	}

	getStructure(type, modelID, result) {
		const found = this.api.GetLineIDsWithType(modelID, type);
		const size = found.size();
		for (let i = 0; i < size; i++) {
			const id = found.get(i);
			result.add(id);
		}
	}
}
