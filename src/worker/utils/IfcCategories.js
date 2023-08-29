import { IfcElements } from "./IfcElements";

// TODO: Export elements and category maps from web-ifc

export class IfcCategories {
	getAll(webIfc, modelID) {
		const elementsCategories = {};
		const categoriesIDs = Object.keys(IfcElements).map((e) => parseInt(e, 10));

		for (let i = 0; i < categoriesIDs.length; i++) {
			const element = categoriesIDs[i];
			const lines = webIfc.GetLineIDsWithType(modelID, element);
			const size = lines.size();
			for (let i = 0; i < size; i++) {
				elementsCategories[lines.get(i)] = element;
			}
		}

		return elementsCategories;
	}
}
