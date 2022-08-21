const express = require("express");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

//serving the static resources (where to take the static resources is)
app.use(express.static("public"));

//whenever I navigate localhost/3001/notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

//read the db.json file and return all saved notes as JSON
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

//all other routes should return the index.html file
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.post("api/notes", (req, res) => {});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));
