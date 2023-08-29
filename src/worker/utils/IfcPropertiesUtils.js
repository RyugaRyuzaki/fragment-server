import * as WEBIFC from "web-ifc";
import { IfcCategoryMap } from "./IfcCategoryMap";

export class IfcPropertiesUtils {
	static getUnits(properties) {
		const { IFCUNITASSIGNMENT } = WEBIFC;
		const allUnits = this.findItemOfType(properties, IFCUNITASSIGNMENT);
		if (!allUnits) return 1;
		for (const unitRef of allUnits.Units) {
			if (unitRef.value === undefined || unitRef.value === null) continue;
			const unit = properties[unitRef.value];
			if (!unit.UnitType || !unit.UnitType.value) continue;
			const value = unit.UnitType.value;
			if (value !== "LENGTHUNIT") continue;
			let factor = 1;
			let unitValue = 1;
			if (unit.Name.value === "METRE") unitValue = 1;
			if (unit.Name.value === "FOOT") unitValue = 0.3048;
			if (unit.Prefix?.value === "MILLI") factor = 0.001;
			return unitValue * factor;
		}
		return 1;
	}

	static findItemByGuid(properties, guid) {
		for (const id in properties) {
			const property = properties[id];
			if (property.GlobalId?.value === guid) {
				return property;
			}
		}
		return null;
	}

	static findItemOfType(properties, type) {
		for (const id in properties) {
			const property = properties[id];
			if (property.type === type) {
				return property;
			}
		}
		return null;
	}

	static getAllItemsOfType(properties, type) {
		const found = [];
		for (const id in properties) {
			const property = properties[id];
			if (property.type === type) {
				found.push(property);
			}
		}
		return found;
	}

	static getRelationMap(properties, relationType, onElementsFound) {
		const defaultCallback = () => {};
		const _onElementsFound = onElementsFound ?? defaultCallback;
		const result = {};
		for (const expressID in properties) {
			const prop = properties[expressID];
			if (prop === undefined) {
				continue;
			}
			const isRelation = prop.type === relationType;
			const relatingKey = Object.keys(prop).find((key) => key.startsWith("Relating"));
			const relatedKey = Object.keys(prop).find((key) => key.startsWith("Related"));
			if (!(isRelation && relatingKey && relatedKey)) continue;
			const relating = properties[prop[relatingKey]?.value];
			const related = prop[relatedKey];
			if (relating === undefined || related === undefined) {
				continue;
			}
			if (!(related && Array.isArray(related))) continue;
			const elements = related.map((el) => {
				return el.value;
			});
			_onElementsFound(relating.expressID, elements);
			result[relating.expressID] = elements;
		}
		return result;
	}

	static getQsetQuantities(properties, expressID, onQuantityFound) {
		const defaultCallback = () => {};
		const _onQuantityFound = onQuantityFound ?? defaultCallback;
		const pset = properties[expressID];
		if (pset?.type !== WEBIFC.IFCELEMENTQUANTITY) return null;
		const quantities = pset.Quantities ?? [{}];
		const qtos = quantities.map((prop) => {
			if (prop.value) _onQuantityFound(prop.value);
			return prop.value;
		});
		return qtos.filter((prop) => prop !== null);
	}

	static getPsetProps(properties, expressID, onPropFound) {
		const defaultCallback = () => {};
		const _onPropFound = onPropFound ?? defaultCallback;
		const pset = properties[expressID];
		if (pset?.type !== WEBIFC.IFCPROPERTYSET) return null;
		const hasProperties = pset.HasProperties ?? [{}];
		const props = hasProperties.map((prop) => {
			if (prop.value) _onPropFound(prop.value);
			return prop.value;
		});
		return props.filter((prop) => prop !== null);
	}

	static getPsetRel(properties, psetID) {
		const arrayProperties = Object.values(properties);
		if (!properties[psetID]) return null;
		const rel = arrayProperties.find((data) => {
			const isRelation = data.type === WEBIFC.IFCRELDEFINESBYPROPERTIES;
			const relatesToPset = data.RelatingPropertyDefinition?.value === psetID;
			return isRelation && relatesToPset;
		});
		return rel ? rel.expressID : null;
	}

	static getQsetRel(properties, qsetID) {
		return IfcPropertiesUtils.getPsetRel(properties, qsetID);
	}

	static getEntityName(properties, entityID) {
		const entity = properties[entityID];
		const key = Object.keys(entity).find((key) => key.endsWith("Name")) ?? null;
		const name = key ? entity[key].value : null;
		return { key, name };
	}

	static getQuantityValue(properties, quantityID) {
		const quantity = properties[quantityID];
		const key = Object.keys(quantity).find((key) => key.endsWith("Value")) ?? null;
		let value;
		if (key === null) {
			value = null;
		} else if (quantity[key] === undefined || quantity[key] === null) {
			value = null;
		} else {
			value = quantity[key].value;
		}

		return { key, value };
	}

	static isRel(expressID) {
		const entityName = IfcCategoryMap[expressID];
		return entityName.startsWith("IFCREL");
	}

	static attributeExists(properties, expressID, attribute) {
		const entity = properties[expressID];
		if (!entity) return false;
		return Object.keys(properties[expressID]).includes(attribute);
	}

	static groupEntitiesByType(properties, expressIDs) {
		const categoriesMap = new Map();
		for (const expressID of expressIDs) {
			const entity = properties[expressID];
			if (!entity) continue;
			const key = entity.type;
			const set = categoriesMap.get(key);
			if (!set) categoriesMap.set(key, new Set());
			categoriesMap.get(key)?.add(expressID);
		}
		return categoriesMap;
	}
}
