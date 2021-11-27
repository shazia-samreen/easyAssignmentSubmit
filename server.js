const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const assignmentRouter = require("./routes/assignments");
const studentRouter = require("./routes/students");
const teacherRouter = require("./routes/teachers");
const app = express();

dotenv.config("./.env");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/assignment", assignmentRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db succesfully");
  })
  .catch((error) => {
    console.log(error);
    console.log("Error while connecting to db");
  });

if (process.env.NODE_ENV === "production") {
}
app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
