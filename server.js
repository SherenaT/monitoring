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
app.use(express.json());
app.use("/style", express.static("./public/styles.css")); //if anybody tries to load a style page (by going to /style) it will load CSS page by going to punlic style.css

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  rollbar.info("html file served successfully.");
});

// app.post("/api/student", (req, res) => {
//   let { name } = req.body;
//   name = name.trim(); //trim whitespace

//   students.push(name);

//   rollbar.log("Student add successfully", {
//     author: "Sherena",
//     type: "manual entry",
//   });
//   res.status(200).send(students);
// });

app.post("/api/student", (req, res) => {
  let { name } = req.body;
  name = name.trim();

  const index = students.findIndex((studentName) => studentName === name); //find index to loop over the name and see if students name already exist

  if (index === -1 && name !== "") {
    //if students name isnt in there are an empty string
    students.push(name);
    rollbar.log("Student add successfully", {
      author: "Sherena",
      type: "manual entry",
    });
    res.status(200).send(students);
  } else if (name === "") {
    rollbar.error("No given name");
    res.status(400).send("must provide a name.");
  } else {
    rollbar.error("stuent already exists");
    res.status(400).send("that student already exists");
  }
});

const port = process.env.PORT || 4545;

app.use(rollbar.errorHandler()); //every time we use app it will run middle ware
app.listen(port, () => console.log("take us to warp ${port}!"));
