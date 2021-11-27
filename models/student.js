const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailid: {
    type: String,
    required: true,
  },
  class: {
    type: Number,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const db = mongoose.db;
const Student = mongoose.model("Student", studentSchema);
// db.Students.createIndex({ emailid: 1 }, { unique: true });
module.exports = Student;
