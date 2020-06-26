const fs = require('fs');
const path = require("path");

module.exports = function(app) {

	app.get("/api/notes", function(req, res) {
		console.log("inside api-get");
		let dbFilePath = path.join(__dirname, "../db/db.json");
		fs.readFile(dbFilePath, "utf8", function(err, data) {
			if(err) {
				console.log(err);
			}
			res.json(JSON.parse(data)).end();
		});
	});

	app.post("/api/notes", function(req, res) {
		console.log(req.body);
		let dbFilePath = path.join(__dirname, "../db/db.json");
		//  Read file.  data param in callback is stringified json
		
		fs.readFile(dbFilePath, "utf8", function(err, data) {
			if (err) {
				console.log(err);
			}
			//parse data.  now we have array to push new object to.
			let json = JSON.parse(data);
			//push new note to array
			json.push(req.body)

			fs.writeFile(path.join(dbFilePath), JSON.stringify(json), "utf8",  function(err, data) {
				if(err) {
					console.log(err);
				}
				
			});

		});
		res.json(req.body);
	});

	app.delete("/api/notes:id", function(req, res) {

	});

}