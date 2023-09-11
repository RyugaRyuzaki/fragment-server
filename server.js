import "./loadEnv.js";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import upload from "./src/upload.js";
import download from "./src/download.js";
const port = process.env.PORT || 3000;
const allowedOrigins = ["http://127.0.0.1:5500"];
const corsOptions = {
	origin: (origin, callback) => {
		// if (allowedOrigins.includes(origin) || !origin) {
		// 	callback(null, true);
		// } else {
		// 	callback(new Error("Not allowed by Cors"));
		// }
		callback(null, true);
	},
	credentials: true,
	// always returen status 200 if allowed
	optionsSuccessStatus: 200,
};
const app = express();
app.set("port", port);
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/upload", upload);
app.use("/download", download);
const server = http.createServer(app);
server.listen(port, () => {
	console.log(`Server is running on port :${port}`);
});
