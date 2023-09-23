import fs from "fs";
import * as pako from "pako";
import multer from "multer";
import { Worker } from "worker_threads";
import DeleteFile from "./util.js";
const uploads = "uploads";
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploads);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fieldNameSize: 300,
		fileSize: 300 * 1024 * 1024,
	},
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "application/octet-stream") {
			cb(null, true);
		} else {
			return cb(new Error("Only .ifc file"));
		}
	},
});
const root = "./src/ifc/";

async function computeWorker(filename, firstModel) {
	const filePath = "uploads/" + filename;
	const originalname = filename.split(".ifc")[0];
	const fileData = fs.readFileSync(filePath);
	const dataArray = new Uint8Array(fileData);
	const worker = new Worker(root + "fragment.js", {
		workerData: { dataArray, firstModel },
	});
	// listen worker
	worker.on("message", async ({ result, arrayBuffer, properties }) => {
		if (result && arrayBuffer && properties) {
			const compressedData = pako.deflate(JSON.stringify(properties));
			const compressedFrag = pako.deflate(Buffer.from(arrayBuffer));
			await fs.writeFileSync(uploads + "/" + originalname + ".gz", compressedData);
			await fs.writeFileSync(uploads + "/" + originalname + "frag.gz", compressedFrag);
		}
	});
	// if error

	worker.on("error", async (error) => {
		console.error("Error computing :", error);
	});

	worker.on("exit", async (code) => {
		if (code !== 0) {
			console.error("Worker was be stop by:", code);
		}
	});
}
// we can use pako npm to zip file, as you can see the ifc file 80mb and data when we zip ~12mb
// so we can download easy and supper fast
// i copy idea from xeokit
// we can load from data and visualiz intersect wit diagram like barcha or circle

export default async function uploadFile(req, res) {
	upload.single("file")(req, res, async (err) => {
		if (err instanceof multer.MulterError) {
			if (err.code == "LIMIT_FILE_SIZE") {
				err.message = "Limit size is" + 300 + "MB";
			}
			return res.status(405).json({ message: err.message, result: false });
		} else if (err) {
			return res.status(500).json({ message: err.message, result: false });
		}
		if (!req.file) {
			return res.status(403).json({ message: "File not found", result: false });
		}
		const { filename, originalname } = req.file;
		await computeWorker(filename, true);
		DeleteFile(uploads, filename);
		res.status(200).json({ filename, originalname });
	});
}
// clone repo
// install packages
// run server : npm run dev
// make sure install visual studio 2022
// install office/sharepoint
// open visual studio
// create a project, choose template
// wait some time to create a project
// now project is loaded
// we care about manifest file and xml file
// now, run to test
// we can not change width via code
// let change some thing
// because when we upload to server, we storage
//1 ifc file
//2 convert ifc to .frag
// 3 properties of file to json
