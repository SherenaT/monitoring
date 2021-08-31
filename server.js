const express = require("express");
const path = require("path"); //variable we use to tell the deployment were going to use where we are at
const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: "4233ac1ab91c4319b588ebf63e0c7140",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  rollbar.info("html file served successfully.");
});

const port = process.env.PORT || 4545;

app.listen(port, () => console.log("take us to warp ${port}!"));
