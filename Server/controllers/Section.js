const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
  try {
    // Fetch Data
    const { sectionName, courseId } = req.body;
    console.log("Section name: ", sectionName);
    console.log("Course  Id: ", courseId);

    // Validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties for creating Section",
      });
    }

    // Create Section
    const newSection = await Section.create({ sectionName });

    // Update course with section object id
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { courseContent: newSection._id } },
      { new: true }
    )
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();

    // Return Response
    return res.status(200).json({
      success: true,
      message: "Section Creared Successfully",
      updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create a Section",
    });
  }
};

// Update Section Handler
exports.updateSection = async (req, res) => {
  try {
    // Data Fetch
    const { sectionName, sectionId, courseId } = req.body;

    // Validation
    if (!sectionName || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties for updating Section",
      });
    }

    // Update Data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    // Update in course
    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    // Return response
    return res.status(200).json({
      success: true,
      message: "Section updated Successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update Section",
    });
  }
};

// Delete Section
exports.deleteSection = async (req, res) => {
  try {
    // Get Id
    const { sectionId, courseId } = req.body;

    Course.findByIdAndUpdate(courseId, { $pull: { courseContent: sectionId } });

    // Delete section
    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Delete The section and  Associated Subsection
    await SubSection.deleteMany({ _id: { $in: section.subSection } });
    await Section.findByIdAndDelete(sectionId);

    // Update The course
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // Return response
    return res.status(200).json({
      success: true,
      message: "Section deleted Successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete a Section",
    });
  }
};
