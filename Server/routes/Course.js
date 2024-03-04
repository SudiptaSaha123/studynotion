// Import required modules
const express = require("express");
const router = express.Router();

// Import controllers

// Import course controllers
const {
  createCourse,
  getCourseDetails,
  showAllCourses,
  editCourse,
  getInstructorCourse,
  getFullCourseDetails,
  deleteCourse,
} = require("../controllers/Course");

// Import category controllers
const {
  createCategory,
  showAllCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// Import section controllers
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// Import sub-section controllers
const {
  createSubsection,
  updateSubsection,
  deleteSubsection,
} = require("../controllers/Subsection");

// Import Rating and review controllers
const {
  createRating,
  getAvarageRating,
  getAllRatingReview,
} = require("../controllers/RatingAndReview");

// Import Course Progress Controller
const { updateCourseProgress } = require("../controllers/CourseProgress");

// Import Middlewares
const {
  auth,
  isAdmin,
  isInstructor,
  isStudent,
} = require("../middlewares/auth");

// #############################################################
// #                     Course Route                          #
// #############################################################

// Course can only created by instructors
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/editCourse", auth, isInstructor, editCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

router.post("/addSubSection", auth, isInstructor, createSubsection);
router.post("/updateSubSection", auth, isInstructor, updateSubsection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubsection);

router.get("/getAllCourses", showAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourse);
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

router.delete("/deleteCourse", deleteCourse);

// ####################################################################
// #                  Category Route (By Admin)                       #
// ####################################################################

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategory);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ####################################################################
// #                  Rating and Review Route                         #
// ####################################################################

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAvarageRating", getAvarageRating);
router.get("/getReviews", getAllRatingReview);

module.exports = router;
