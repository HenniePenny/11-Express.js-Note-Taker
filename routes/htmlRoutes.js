const path = require("path");
const router = require("express").Router();

//whenever I navigate localhost/3001/notes
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

//all other routes should return the index.html file
router.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

module.exports = router;
