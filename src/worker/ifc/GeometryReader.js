import { BufferAttribute, BufferGeometry } from "three";
import { BvhManager } from "../utils";
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";

export class GeometryReader {
	items = {};
	constructor(api) {
		this.api = api;
		this.BVH = new BvhManager();
		this.BVH.initializeMeshBVH(computeBoundsTree, disposeBoundsTree, acceleratedRaycast);
	}
	cleanUp() {
		this.items = {};
	}
	streamMesh(mesh, forceTransparent = false) {
		const size = mesh.geometries.size();

		for (let i = 0; i < size; i++) {
			const geometry = mesh.geometries.get(i);
			const geometryID = geometry.geometryExpressID;

			// Transparent geometries need to be separated
			const isColorTransparent = geometry.color.w !== 1;
			const isTransparent = isColorTransparent || forceTransparent;
			const prefix = isTransparent ? "-" : "+";
			const idWithTransparency = prefix + geometryID;
			if (forceTransparent) geometry.color.w = 0.1;

			if (!this.items[idWithTransparency]) {
				const buffer = this.newBufferGeometry(geometryID);
				if (!buffer) continue;
				this.items[idWithTransparency] = { buffer, instances: [] };
			}

			this.items[idWithTransparency].instances.push({
				color: { ...geometry.color },
				matrix: geometry.flatTransformation,
				expressID: mesh.expressID,
			});
		}
	}

	newBufferGeometry(geometryID) {
		const geometry = this.api.GetGeometry(0, geometryID);
		const verts = this.getVertices(geometry);
		if (!verts.length) return null;
		const indices = this.getIndices(geometry);
		if (!indices.length) return null;
		const buffer = this.constructBuffer(verts, indices);
		// @ts-ignore
		geometry.delete();
		return buffer;
	}

	getIndices(geometryData) {
		const indices = this.api.GetIndexArray(geometryData.GetIndexData(), geometryData.GetIndexDataSize());
		return indices;
	}

	getVertices(geometryData) {
		const verts = this.api.GetVertexArray(geometryData.GetVertexData(), geometryData.GetVertexDataSize());
		return verts;
	}

	constructBuffer(vertexData, indexData) {
		const geometry = new BufferGeometry();

		const posFloats = new Float32Array(vertexData.length / 2);
		const normFloats = new Float32Array(vertexData.length / 2);

		for (let i = 0; i < vertexData.length; i += 6) {
			posFloats[i / 2] = vertexData[i];
			posFloats[i / 2 + 1] = vertexData[i + 1];
			posFloats[i / 2 + 2] = vertexData[i + 2];

			normFloats[i / 2] = vertexData[i + 3];
			normFloats[i / 2 + 1] = vertexData[i + 4];
			normFloats[i / 2 + 2] = vertexData[i + 5];
		}

		geometry.setAttribute("position", new BufferAttribute(posFloats, 3));
		geometry.setAttribute("normal", new BufferAttribute(normFloats, 3));
		geometry.setIndex(new BufferAttribute(indexData, 1));

		return geometry;
	}
}
