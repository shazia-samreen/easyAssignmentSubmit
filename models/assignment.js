const mongoose = require("mongoose");
const assignmentSchema = new mongoose.Schema({
  class: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher" || "Student",
  },
  referenceAssignmentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  assignmentPdf: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  grade: {
    total: Number,
    marks: Number,
  },
  publishDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  submittedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  deadLine: {
    type: Date,
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
