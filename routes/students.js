const express = require("express");
const router = express.Router();
const path = require("path");
const dotenv = require("dotenv");
const Student = require("../models/student");
const bcrypt = require("bcrypt");
const saltRounds = 10;
router.route("/login").post(async (req, res) => {
  console.log("request to student/login");
  console.log(req.body);
  const foundStudent = await Student.findOne({ emailid: req.body.emailid });
  try {
    const foundStudent = await Student.findOne({ emailid: req.body.emailid });
    if (foundStudent) {
      bcrypt.compare(
        req.body.password,
        foundStudent.password,
        function (error, result) {
          if (error) {
            res.json({
              status: false,
              message: "Invalid username or password. Please try again.",
            });
          } else {
            console.log("succefully logged in");
            res.redirect(
              `/assignment?class=${foundStudent.class}&schoolName=${foundStudent.schoolName}&userId=${foundStudent._id}&name=${foundStudent.name}`
            );
          }
        }
      );
    } else {
      res.json({
        status: false,
        message:
          "The emailid provided is not associated with us..Please register to continue",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "Something went wrong...Please try again",
    });
  }
});

router.route("/register").post(async (req, res) => {
  console.log("request to student/register");
  console.log(req.body);

  try {
    const foundStudent = await Student.findOne({ emailid: req.body.emailid });
    if (foundStudent) {
      res.json({
        status: false,
        message:
          "There is an account associated with the provided emailid,Please login to view your profile",
      });
    } else {
      await bcrypt
        .hash(req.body.password, saltRounds)
        .then(async (response) => {
          console.log(response);
          console.log("request body is");
          console.log(req.body);
          const student = new Student({
            name: req.body.name,
            emailid: req.body.emailid,
            class: req.body.class,
            schoolName: req.body.schoolName,
            password: response,
          });
          const newStudent = await student.save();
          console.log("new student ");
          console.log(newStudent);
          res.redirect(
            `/assignment?class=${newStudent.class}&schoolName=${newStudent.schoolName}&userId=${newStudent._id}&name=${newStudent.name}`
          );
          console.log("Registration successfull");
        })
        .catch((error) => {
          res.json({
            status: false,
            message: "Something went wrong...Please try again",
          });
        });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "Something went wrong...Please try again",
    });
  }
});

module.exports = router;
