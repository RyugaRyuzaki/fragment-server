import { BufferGeometry, Mesh } from "three";

export class BvhManager {
	initializeMeshBVH(computeBoundsTree, disposeBoundsTree, acceleratedRaycast) {
		this.computeBoundsTree = computeBoundsTree;
		this.disposeBoundsTree = disposeBoundsTree;
		this.acceleratedRaycast = acceleratedRaycast;
		this.setupThreeMeshBVH();
	}

	applyThreeMeshBVH(geometry) {
		if (this.computeBoundsTree)
			//@ts-ignore
			geometry.computeBoundsTree();
	}

	setupThreeMeshBVH() {
		if (!this.computeBoundsTree || !this.disposeBoundsTree || !this.acceleratedRaycast) return;
		//@ts-ignore
		BufferGeometry.prototype.computeBoundsTree = this.computeBoundsTree;
		//@ts-ignore
		BufferGeometry.prototype.disposeBoundsTree = this.disposeBoundsTree;
		Mesh.prototype.raycast = this.acceleratedRaycast;
	}
}
