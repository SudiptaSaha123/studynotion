const Category = require("../models/Category");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Create Category Handler
exports.createCategory = async (req, res) => {
  try {
    // Fetch data
    const { name, description } = req.body;

    // Validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create entry in db
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Issue in Category creation",
    });
  }
};

// Get all tags handler
exports.showAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find();
    return res.status(200).json({
      success: true,
      message: "All categories returned successfully",
      data: allCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Issue in fetching categories",
    });
  }
};

// Category page Details
exports.categoryPageDetails = async (req, res) => {
  try {
    // Get category id
    const { categoryId } = req.body;

    // Get courses for specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        populate: [{ path: "instructor" }, { path: "ratingAndReviews" }],
        match: { status: "Published" },
      })
      .exec();

    // Validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }

    // Get courses for different Categories

    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    ).populate({
      path: "courses",
      match: { status: "Published" },
      populate: { path: "instructor" },
    });

    // Get top selling courses

    const allCategory = await Category.find()
      .populate({
        path: "courses",
        populate: {
          path: "instructor",
        },
        match: { status: "Published" },
      })
      .exec();
    const allCourses = allCategory.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    // Return Response
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        mostSellingCourses,
        differentCategory,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
