import { workerData, parentPort } from "worker_threads";
import * as WebIFC from "web-ifc";
import { IfcLoader } from "./IfcLoader";
import { Serializer } from "./Serializer.js";
const serializer = new Serializer();
const wasmPath = "https://unpkg.com/web-ifc@0.0.44/";
const getData = async (dataArray) => {
	try {
		const before = performance.now();
		const api = new WebIFC.IfcAPI();
		// we have to use the real URL
		// we can not copy .wasm files in node_modules/we-ifc to same directory this file
		// if we set : api.SetWasmPath("./") and copy those file in same directory this file
		// we will get the error : can not compile url
		api.SetWasmPath(wasmPath);
		const ifcLoader = new IfcLoader(api);
		ifcLoader.onParser.on(async (ifcData) => {
			const { ifcSpaces, elements, buildings, coordinationMatrix, properties } = ifcData;
			if (!ifcSpaces || !elements || !buildings || !coordinationMatrix || !properties) return;
			const buffer = serializer.export({
				ifcSpaces,
				elements,
				buildings,
				coordinationMatrix,
				properties,
			});
			console.log(`Export :${(performance.now() - before) / 1000}s`);
			parentPort.postMessage({ result: true, buffer });
		});

		await ifcLoader.parse(dataArray);
	} catch (error) {
		console.log(error.message);
		parentPort.postMessage({ result: false });
	}
};

getData(workerData);
