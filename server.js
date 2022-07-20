require("dotenv").config();

const express = require("express");
const mongoose = require("./middleware/connect");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const studentsRoutes = require("./routes/student.routes");
const subjectsRoutes = require("./routes/subject.routes");
const examsRoutes = require("./routes/exam.routes");
const pagesRoutes=require('./routes/page.routes')

const app = express();

app.use("/", express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1/students", studentsRoutes);
app.use("/api/v1/subjects", subjectsRoutes);
app.use("/api/v1/exams", examsRoutes);
app.use("/api/v1/pages", pagesRoutes);




app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server up!");
});
