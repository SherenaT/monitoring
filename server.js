const express = require("express");
const path = require("path"); //variable we use to tell the deployment were going to use where we are at

const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: "dd7f418cfe194e95b84541d79bce2111",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const students = [];

const app = express();

app.use(rollbar.errorHandler); //every time we use app it will run middle ware

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  rollbar.info("html file served successfully.");
});

app.post("/api/student", (req, res) => {
  const { name } = req.body;
  name = name.trim(); //trim whitespace

  students.push(name);

  rollbar.log("Student add successfully", {
    author: "Sherena",

    type: "manual entry",
  });
  res.status(200).send(students);
});

const port = process.env.PORT || 4545;

app.listen(port, () => console.log("take us to warp ${port}!"));
