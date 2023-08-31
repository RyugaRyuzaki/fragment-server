import dotenv from "dotenv";
dotenv.config();
import express from "express";
import upload from "./src/upload.js";
import download from "./src/download.js";
const app = express();
const port = process.env.PORT || 3000;

app.use("/upload", upload);
app.use("/download", download);
app.get("/", (req, res) => {
	res.send("Hello world");
});
app.listen(port, () => {
	console.log(`Server is running on port :${port}`);
});
