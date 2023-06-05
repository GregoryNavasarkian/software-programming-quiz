const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.js");

const {
  getEmployer,
  register,
  login,
  update,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.js");

router.route("/").get(protect, getEmployer);

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/update").put(protect, update);

router.route("/forgotpassword").post(forgotPassword);

router.route("/resetpassword/:resetToken").put(resetPassword);

module.exports = router;
