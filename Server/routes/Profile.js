const express = require("express");
const router = express.Router();

// Import required controllers
const { auth, isInstructor } = require("../middlewares/auth");
const {
  updateProfile,
  deleteAccount,
  getUserDetails,
  updateDisplayPicture,
  getEnrolledCourse,
  getInstructorDashboard,
} = require("../controllers/Profile");

// ######################################################################
// #                            Profile routes                          #
// ######################################################################

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetails);

router.get("/getEnrolledCourses", auth, getEnrolledCourse);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/instructorDashboard", auth, isInstructor, getInstructorDashboard);

module.exports = router;
