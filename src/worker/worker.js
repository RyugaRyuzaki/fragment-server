import { workerData, parentPort } from "worker_threads";
import * as WebIFC from "web-ifc";
import { IfcLoader } from "./ifc";
const getData = async ({ dataArray, firstModel }) => {
	try {
		const api = new WebIFC.IfcAPI();
		// we have to use the real URL
		// we can not copy .wasm files in node_modules/we-ifc to same directory this file
		// if we set : api.SetWasmPath("./") and copy those file in same directory this file
		// we will get the error : can not compile url
		api.SetWasmPath("https://unpkg.com/web-ifc@0.0.42/");
		const ifcLoader = new IfcLoader(api, parentPort);
		ifcLoader.loadIfc(dataArray, firstModel, ({ arrayBuffer, properties }) => {
			// we have 2 storage arrayBuffer(.frag file) and properties to use fragmentGroup in front end
			parentPort.postMessage({ result: true, arrayBuffer, properties });
		});
	} catch (error) {
		console.log(error.message);
		parentPort.postMessage({ result: false });
	}
};

getData(workerData);
