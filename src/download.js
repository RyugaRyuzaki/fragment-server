import express from "express";
import fs from "fs";
import * as pako from "pako";

const router = express.Router();
router.get("/:fileId", async (req, res) => {
	try {
		const { fileId } = req.params;
		const { scope } = req.query;
		if (!fileId) return res.status(405).json({ message: "Missing param" });
		let buffer = fs.readFileSync("uploads/" + fileId);
		if (scope && scope === "json") {
			buffer = pako.inflate(buffer, { to: "string" });
			res.write(buffer);
			res.write("\n\n");
			res.end();
		} else {
			getFileWeb(res, fileId, buffer);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

function getFileWeb(res, fileId, buffer) {
	res.setHeader("Content-Type", "application/octet-stream");
	res.setHeader("Content-Disposition", `attachment; filename="${fileId}.gz"`);
	res.setHeader("Content-Length", buffer.length);

	res.write(buffer);
	res.write("\n\n");
	res.end();
}

export default router;
