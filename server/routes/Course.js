const express = require("express");
const router = express.Router();

// Controllers
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controllers/Course.controller");

const {
  getAllCatogories,
  createCatogory,
  categoryPageDetails,
} = require("../controllers/Catogory.controller");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section.controller");

const {
  createSubSection,
  updateSubSection,
  deletesubsection,
} = require("../controllers/SubSection.controller");

const {
  createRating,
  getAverageRating,
  getAllRatings,
} = require("../controllers/RatingReview");

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

// Course routes
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deletesubsection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.get("/getAllCourses", getAllCourses);
router.get("/getCourseDetails", getCourseDetails);

// Category routes
router.post("/createCategory", createCatogory);
router.get("/showAllCategories", getAllCatogories);
router.get("/getCategoryPageDetails", categoryPageDetails);

// Rating and Review routes
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatings);

module.exports = router;
