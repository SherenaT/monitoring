const express = require("express");
const path = require("path"); //variable we use to tell the deployment were going to use where we are at

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

const port = process.env.PORT || 4545;

app.listen(port, () => console.log("take us to warp ${port}!"));
