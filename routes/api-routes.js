const fs = require('fs');
const path = require("path");

module.exports = function(app) {

	app.get("/api/notes", function(req, res) {
		let dbFilePath = path.join(__dirname, "../db/db.json");
		fs.readFile(dbFilePath, "utf8", function(err, data) {
			if(err) {
				console.log(err);
			}
			res.json(JSON.parse(data)).end();
		});
	});

	app.post("/api/notes", function(req, res) {
		let dbFilePath = path.join(__dirname, "../db/db.json");
		fs.readFile(dbFilePath, "utf8", function(err, data) {
			if (err) {
				console.log(err);
			}
			let json = JSON.parse(data);
			json.push(req.body);
			json.forEach(function(note) {
				note.id = json.indexOf(note) + 1;
			});
			fs.writeFile(path.join(dbFilePath), JSON.stringify(json), "utf8",  function(err, data) {
				if(err) {
					console.log(err);
				}
			});
		});
		res.json(req.body);
	});

	app.delete("/api/notes/:id", function(req, res) {
		let noteID = parseInt(req.params.id);
		let dbFilePath = path.join(__dirname, "../db/db.json");
		fs.readFile(dbFilePath, "utf8", function(err, data) {
			let notes = JSON.parse(data);
			let lessNotes = notes.filter(note => note.id !== noteID);
			fs.writeFile(dbFilePath, JSON.stringify(lessNotes), "utf8", function(err, data) {
				if (err) {
					console.log(err);
				}
			});
			res.json(lessNotes).end();
		});
	});
}