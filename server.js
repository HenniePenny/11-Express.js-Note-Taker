const express = require("express");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

//serving the static resources (where to take the static resources is)
app.use(express.static("public"));

//middleware
//recognizes the incoming request objet as string or array
app.use(express.urlencoded({ extended: true }));
//recognizes the incoming object as a json object
app.use(express.json());

//whenever I navigate localhost/3001/notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

//read the db.json file and return all saved notes as JSON
app.get("/api/notes", (req, res) => {
  res.json(notes);
});
//!keeping this as reference
// app.get("/api/notes", (req, res) =>
//   res.sendFile(path.join(__dirname, "/db/db.json"))
// );

//all other routes should return the index.html file
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.post("/api/notes", (req, res) => {
  const newNote = {
    //give unique id when it is saved
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text,
  };

  if (!newNote.title || !newNote.text) {
    return res
      .status(400)
      .json({ msg: "Your note must include a title and some text." });
  }

  //push the newNote to the notes(i.e. db.json file)
  notes.push(newNote);

  //then write all notes to the correct file
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) {
      console.log(err);
    }
  });

  //then return the new note to the client
  res.json(newNote);
});

app.delete("/api/notes/:t_id", (req, res) => {
  // get index
  const index = notes.findIndex((element) => {
    return element.id === req.params.t_id;
  });
  if (index > -1) {
    // only splice array when item is found
    notes.splice(index, 1); // only remove one item at the index
  }
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send("Deleted successfully!");
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));
