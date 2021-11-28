const express = require("express");
const router = express.Router();
const path = require("path");
const dotenv = require("dotenv");
const Student = require("../models/student");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//post request to student/login
router.route("/login").post(async (req, res) => {
  const foundStudent = await Student.findOne({ emailid: req.body.emailid });
  try {
    const foundStudent = await Student.findOne({ emailid: req.body.emailid });
    if (foundStudent) {
      bcrypt.compare(
        req.body.password,
        foundStudent.password,
        function (error, result) {
          if (result === true) {
            res.redirect(
              `/assignment?class=${foundStudent.class}&schoolName=${foundStudent.schoolName}&userId=${foundStudent._id}&name=${foundStudent.name}`
            );
          } else {
            res.json({
              status: false,
              message: "Invalid username or password. Please try again.",
            });
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

//post request to student/register
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
          const student = new Student({
            name: req.body.name,
            emailid: req.body.emailid,
            class: req.body.class,
            schoolName: req.body.schoolName,
            password: response,
          });
          const newStudent = await student.save();
          res.redirect(
            `/assignment?class=${newStudent.class}&schoolName=${newStudent.schoolName}&userId=${newStudent._id}&name=${newStudent.name}`
          );
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

//post request to student/forgotPassword
router.route("/forgotPassword").post(async (req, res) => {
  try {
    await bcrypt
      .hash(req.body.password, saltRounds)
      .then(async (response) => {
        const result = await Student.updateOne(
          {
            emailid: req.body.emailid,
          },
          {
            password: response,
          }
        );
        res.json({ success: true });
      })
      .catch((error) => {
        console.log(error);
        res.json({
          status: false,
          message:
            "Error while updating the password...please try after some time",
        });
      });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      errorMessage:
        "Error while updating the password...please try after some time",
    });
  }
});

module.exports = router;
