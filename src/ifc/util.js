import path from "path";
import fs from "fs";

export default function DeleteFile(uploads, filename) {
	fs.readdir(uploads, (err, files) => {
		if (err) console.log(err);
		fs.unlink(path.join(uploads, filename), (err) => {
			if (err) console.log(err);
		});
	});
}
