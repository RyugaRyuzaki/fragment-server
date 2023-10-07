import { nodeResolve } from "@rollup/plugin-node-resolve";
import extensions from "./rollup-extensions.mjs";
import commonjs from "@rollup/plugin-commonjs";

// This creates the bundle used by the examples
//https://github.com/IFCjs/fragment/blob/main/resources/rollup.config.mjs
export default {
	input: "./src/powerbi/worker.js",
	output: {
		file: "./src/ifc/PowerBI.js",
		format: "esm",
	},
	plugins: [
		extensions({
			extensions: [".js"],
		}),
		nodeResolve(),
		commonjs(),
	],
};
