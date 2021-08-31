const express = require("express");
const path = require("path"); //variable we use to tell the deployment were going to use where we are at

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(4545, () => console.log("take us to warp 4545!"));
