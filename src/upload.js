import express from "express";
import uploadFile from "./ifc/parser.js";
const router = express.Router();

router.post("", uploadFile);
export default router;
