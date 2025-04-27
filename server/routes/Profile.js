const express = require("express")
const router = express.Router()
const { auth } = require('../middlewares/auth')
const {
    deleteAcount,
    updateProfile,
    getAllUserDetails
  // getEnrolledCourses,
} = require('../controllers/Profile.controller')


// Delet User Account
router.delete("/deleteProfile", auth,deleteAcount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
// router.get("/getEnrolledCourses", auth, getEnrolledCourses)
// router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router