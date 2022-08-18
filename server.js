const express = require("express");

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.static("public"));

app.listen(PORT, () => console.log(""));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));
