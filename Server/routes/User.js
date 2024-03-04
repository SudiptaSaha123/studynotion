// Import required modules
const express = require("express");
const router = express.Router();

// import required controllers
const {
  logIn,
  signUp,
  sendotp,
  changePassword,
} = require("../controllers/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");
const { auth } = require("../middlewares/auth");

// #################################################################################
// #                      Authentication Routes                                    #
// #################################################################################

// Route for user log in
router.post("/login", logIn);

// Route for sign up
router.post("/signup", signUp);

// Route for send otp to ussers email
router.post("/sendotp", sendotp);

// Route for changing the password
// router.post("/changepassword", auth, changePassword);
router.post("/changepassword", auth, changePassword);

// ##################################################################################
// #                           Reset Password                                       #
// ##################################################################################

// Route for generating reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resettting users password
// router.post("/reset-password", resetPassword);
router.post("/reset-password", resetPassword);

// Export the router
module.exports = router;
