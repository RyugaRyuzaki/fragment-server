import express from "express";
import { uploadFile, uploadFilePowerBI } from "./ifc/parser.js";
const router = express.Router();

router.post("/upload", uploadFile);
router.post("/uploadPowerBI", uploadFilePowerBI);
export default router;
