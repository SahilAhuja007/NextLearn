// Import the required modules
const express = require("express")
const router = express.Router()
// const { sendOtp } = require('../controllers/auth'); // Adjust the path to your auth controller

// Import the required controllers and middleware functions
const {
  login,
  signUp,
  sendOtp,
  changePassword
} = require('../controllers/Auth')

const {
    resetPasswordToken,
    resetPassword,
} = require('../controllers/ResetPassword')

const { auth } = require('../middlewares/auth');
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOtp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password",auth, resetPassword)

// Export the router for use in the main application
module.exports = router