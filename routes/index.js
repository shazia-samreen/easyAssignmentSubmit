const express = require("express");
const router = express.Router();

router.route("/test").get((req, res) => {
  console.log("test");
});
module.exports = router;
