import fs from "fs";
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
			const jsonData = JSON.stringify(properties, null, 2);
			// write a file in uploads
			await fs.writeFileSync(uploads + "/" + originalname + ".json", jsonData);
			await fs.writeFileSync(uploads + "/" + originalname + ".frag", Buffer.from(arrayBuffer));
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
