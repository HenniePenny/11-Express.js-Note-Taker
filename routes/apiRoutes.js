const apiRouter = require("express").Router();
const uuid = require("uuid");
const fs = require("fs");
const notes = require("../db/db.json");

//read the db.json file and return all saved notes as JSON
apiRouter.get("/notes", (req, res) => {
  res.json(notes);
});
//!keeping this as reference
// apiRouter.get("/api/notes", (req, res) =>
//   res.sendFile(path.join(__dirname, "/db/db.json"))
// );

apiRouter.post("/notes", (req, res) => {
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
  fs.writeFile("../db/db.json", JSON.stringify(notes), (err) => {
    if (err) {
      console.log(err);
    }
  });

  //then return the new note to the client
  res.json(newNote);
});

apiRouter.delete("/notes/:t_id", (req, res) => {
  // get index
  const index = notes.findIndex((element) => {
    return element.id === req.params.t_id;
  });
  if (index > -1) {
    // only splice array when item is found
    notes.splice(index, 1); // only remove one item at the index
  }
  fs.writeFile("../db/db.json", JSON.stringify(notes), (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send("Deleted successfully!");
});

module.exports = apiRouter;
