import * as WebIFC from "web-ifc";

export class GeometryReader {
	/**
	 *
	 */
	constructor(api) {
		this.api = api;
	}

	streamMeshIfcSpace(modelID, mesh, items) {
		const placedGeometries = mesh.geometries;
		const size = placedGeometries.size();

		for (let i = 0; i < size; i++) {
			const placedGeometry = placedGeometries.get(i);
			const geometry = this.api.GetGeometry(modelID, placedGeometry.geometryExpressID);
			if (!items[mesh.expressID]) {
				items[mesh.expressID] = {
					expressID: mesh.expressID,
					matrix: placedGeometry.flatTransformation,
					vertexData: this.api.GetVertexArray(geometry.GetVertexData(), geometry.GetVertexDataSize()),
					indexData: this.api.GetIndexArray(geometry.GetIndexData(), geometry.GetIndexDataSize()),
				};
			}
			//@ts-ignore
			geometry.delete();
		}
	}
	streamMesh(modelID, mesh, items) {
		const placedGeometries = mesh.geometries;
		const size = placedGeometries.size();

		for (let i = 0; i < size; i++) {
			const placedGeometry = placedGeometries.get(i);
			const geometry = this.api.GetGeometry(modelID, placedGeometry.geometryExpressID);
			const color = placedGeometry.color;
			const colID = `${color.x}-${color.y}-${color.z}-${color.w}`;
			if (!items[colID]) items[colID] = [];
			items[colID].push({
				expressID: mesh.expressID,
				matrix: placedGeometry.flatTransformation,
				vertexData: this.api.GetVertexArray(geometry.GetVertexData(), geometry.GetVertexDataSize()),
				indexData: this.api.GetIndexArray(geometry.GetIndexData(), geometry.GetIndexDataSize()),
			});

			//@ts-ignore
			geometry.delete();
		}
	}
}
export const GeometryTypes = new Set([
	1123145078, 574549367, 1675464909, 2059837836, 3798115385, 32440307, 3125803723, 3207858831, 2740243338, 2624227202,
	4240577450, 3615266464, 3724593414, 220341763, 477187591, 1878645084, 1300840506, 3303107099, 1607154358,
	1878645084, 846575682, 1351298697, 2417041796, 3049322572, 3331915920, 1416205885, 776857604, 3285139300,
	3958052878, 2827736869, 2732653382, 673634403, 3448662350, 4142052618, 2924175390, 803316827, 2556980723,
	1809719519, 2205249479, 807026263, 3737207727, 1660063152, 2347385850, 3940055652, 2705031697, 3732776249,
	2485617015, 2611217952, 1704287377, 2937912522, 2770003689, 1281925730, 1484403080, 3448662350, 4142052618,
	3800577675, 4006246654, 3590301190, 1383045692, 2775532180, 2047409740, 370225590, 3593883385, 2665983363,
	4124623270, 812098782, 3649129432, 987898635, 1105321065, 3510044353, 1635779807, 2603310189, 3406155212,
	1310608509, 4261334040, 2736907675, 3649129432, 1136057603, 1260505505, 4182860854, 2713105998, 2898889636,
	59481748, 3749851601, 3486308946, 3150382593, 1062206242, 3264961684, 15328376, 1485152156, 370225590, 1981873012,
	2859738748, 45288368, 2614616156, 2732653382, 775493141, 2147822146, 2601014836, 2629017746, 1186437898, 2367409068,
	1213902940, 3632507154, 3900360178, 476780140, 1472233963, 2804161546, 3008276851, 738692330, 374418227, 315944413,
	3905492369, 3570813810, 2571569899, 178912537, 2294589976, 1437953363, 2133299955, 572779678, 3092502836, 388784114,
	2624227202, 1425443689, 3057273783, 2347385850, 1682466193, 2519244187, 2839578677, 3958567839, 2513912981,
	2830218821, 427810014,
]);
