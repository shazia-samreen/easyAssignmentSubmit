const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const uuid = require("uuid").v4;
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
const aws = require("aws-sdk");
const Assignment = require("../models/assignment");

dotenv.config("../.env");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "assignmentsubmitter",
    metadata: (req, file, cb) => {
      cb(null, { fieldname: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, file.originalname + uuid() + path.extname(file.originalname));
    },
  }),
});

//route to view assignments
router.route("/").get(async (req, res) => {
  let period = req.query.period;
  if (period === undefined) {
    period = 7;
  }
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - period);
  console.log(pastDate);
  console.log("query body");
  console.log(req.query);
  try {
    const result_by_id = await Assignment.find({
      userId: req.query.id,
      schoolName: req.query.schoolName,
      publishDate: {
        $gte: pastDate,
        $lt: new Date(),
      },
    });
    const result_by_class = await Assignment.find({
      class: req.query.class,
      schoolName: req.query.schoolName,
      publishDate: {
        $gte: pastDate,
        $lt: new Date(),
      },
    });
    if (result_by_id.length > 0)
      res.json({
        status: true,
        data: result_by_id,
        userId: req.query.userId,
        schoolName: req.query.schoolName,
        name: req.query.name,
      });
    else if (result_by_class.length >= 0)
      res.json({
        status: true,
        data: result_by_class,
        userId: req.query.userId,
        schoolName: req.query.schoolName,
        name: req.query.name,
        class: req.query.class,
      });
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "Something went wrong try after some time",
    });
  }
});
router.route("/").patch(async (req, res) => {
  console.log("patch request successfull");
  console.log(req.body);
  console.log(req.params);
  try {
    console.log(req.query);
    const result = await Assignment.updateOne(
      {
        _id: req.query.id,
      },
      {
        grade: { total: req.query.total, marks: req.query.marks },
      }
    );
    console.log(result);
    res.json({ success: true });
  } catch (error) {
    res.json({
      success: false,
      errorMessage: "Error while updating the score",
    });
  }
});

//route to submit assignment
router.route("/submitted").get(async (req, res) => {
  let period = req.query.period;
  if (period === undefined) {
    period = 7;
  }
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - period);
  try {
    const requestid = req.query.id;
    const result_by_id = await Assignment.find({
      userId: req.query.id,
      schoolName: req.query.schoolName,
      publishDate: {
        $gte: pastDate,
        $lt: new Date(),
      },
    });
    const submitted_assignment = await Assignment.find({
      status: "submitted",
      schoolName: req.query.schoolName,
      publishDate: {
        $gte: pastDate,
        $lt: new Date(),
      },
    });
    const result = [];
    result_by_id.forEach((item) => {
      submitted_assignment.forEach((assignment) => {
        if (item._id.equals(assignment.referenceAssignmentId)) {
          result.push(assignment);
        }
      });
    });
    res.json({
      status: true,
      data: result,
    });
  } catch (err) {
    res.json({
      status: false,
      errorMessage: "Something went wrong",
    });
  }
});
router.route("/submit").post(upload.single("assignment"), async (req, res) => {
  if (req.body.class === undefined) req.body.class = 0;
  console.log(typeof req.body.deadline);
  console.log(Date.parse(req.body.deadline));
  try {
    const assignment = new Assignment({
      class: new Number(req.body.class),
      userId: req.body.userId,
      topic: req.body.topic,
      description: req.body.description,
      assignmentPdf: req.file.location,
      status: req.body.status,
      schoolName: req.body.schoolName,
      grade: {
        total: req.body.totalMarks,
        marks: null,
      },
      deadline: new Date(Date.parse(req.body.deadline)),
      referenceAssignmentId: req.body.referenceAssignmentId,
    });
    console.log(assignment);

    const newAssignment = await assignment.save();
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    s3.deleteObject(
      { Bucket: "assignmentsubmitter", Key: req.file.key },
      (err, data) => {
        if (!err) {
          console.log(data);
          console.log("file deleted");
        } else {
          console.log("Error occured");
          console.log(err);
        }
      }
    );
    res.json({
      status: false,
      message: "Error while saving the book.Please try after some time",
    });
  }
});

module.exports = router;
