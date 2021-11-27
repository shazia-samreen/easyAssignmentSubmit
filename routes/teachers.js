const express = require("express");
const router = express.Router();
const path = require("path");
const dotenv = require("dotenv");
const Teacher = require("../models/teacher");
const bcrypt = require("bcrypt");
const saltRounds = 10;
router.route("/login").post(async (req, res) => {
  console.log("request to teacher/login");
  const foundTeacher = await Teacher.findOne({ emailid: req.body.emailid });
  try {
    const foundTeacher = await Teacher.findOne({ emailid: req.body.emailid });
    if (foundTeacher) {
      bcrypt.compare(
        req.body.password,
        foundTeacher.password,
        function (error, result) {
          if (error) {
            res.json({
              status: false,
              message: "Invalid username or password. Please try again.",
            });
          } else {
            console.log("succefully logged in");
            res.redirect(
              `/assignment?id=${foundTeacher._id}&schoolName=${foundTeacher.schoolName}&userId=${foundTeacher._id}&name=${foundTeacher.name}`
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
    res.json({
      status: false,
      message: "Something went wrong...Please try again",
    });
  }
});

router.route("/register").post(async (req, res) => {
  try {
    const foundTeacher = await Teacher.findOne({ emailid: req.body.emailid });
    if (foundTeacher) {
      res.json({
        status: false,
        message:
          "Emailid already exists.You must have registered with us through our website earlier,Please login to continue",
      });
    } else {
      await bcrypt
        .hash(req.body.password, saltRounds)
        .then(async (response) => {
          const teacher = new Teacher({
            name: req.body.name,
            emailid: req.body.emailid,
            schoolName: req.body.schoolName,
            password: req.body.password,
          });
          const newTeacher = await teacher.save();
          console.log(newTeacher);
          const id = newTeacher._id;
          res.redirect(
            `/assignment?id=${id}&schoolName=${newTeacher.schoolName}&userId=${newTeacher._id}&name=${newTeacher.name}`
          );
          console.log("Registration of teacher successfull");
        })
        .catch((error) => {
          res.json({
            status: false,
            message: "Something went wrong...Please try again",
          });
        });
    }
  } catch (err) {
    res.json({
      status: false,
      message: "Something went wrong...Please try again",
    });
  }
});

module.exports = router;
