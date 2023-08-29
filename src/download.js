import express from "express";
import fs from "fs";
const router = express.Router();
router.post("/:fileId", async (req, res) => {
	try {
		const { fileId } = req.params;
		if (!fileId) return res.status(405).json({ message: "Missing param" });
		const buffer = fs.readFileSync("uploads/" + fileId);

		res.write(buffer);
		res.write("\n\n");
		res.end();
	} catch (error) {
		res.status(500).json(error);
	}
});
export default router;
