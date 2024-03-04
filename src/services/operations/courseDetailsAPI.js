import { courseEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";

const {
  COURSE_CATEGORIES_API,
  EDIT_COURSE_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  DELETE_COURSE_API,
  COURSE_DETAILS_API,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints;

// Fetching Available Course Categories
export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error);
  }
  return result;
};

// Edit Course Details
export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }

    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

// ADD COURSE
export const addCourse = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details");
    }

    toast.success("Course Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

// CREATE SECTION
export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Create Section");
    }

    toast.success("Course Section Created");
    result = response?.data?.updatedCourse;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

// UPDATE SECTION
export const updateSection = async (data, token) => {
  let result;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Update Section");
    }

    toast.success("Course Section Updated");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// Delete section
export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section");
    }

    toast.success("Course Section Deleted");

    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

// Create Subsection
export const createSubSection = async (data, token) => {
  let result = null;
  const toastid = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture");
    }

    toast.success("Lecture Added");

    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastid);
  return result;
};

// Update Subsection
export const updateSubSection = async (data, token) => {
  let result = null;

  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture");
    }

    toast.success("Lecture Updated");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

// Delete a Subsection
export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture");
    }

    toast.success("Lecture Deleted");
    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

// Fetch Instructor Courses
export const fetchInstructorCourses = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }

    result = response?.data?.data;
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

// Get Full Course Details
export const getFullDetailOfCourse = async (courseId, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      { Authorization: `Bearer ${token}` }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    result = error.response.data;
  }

  toast.dismiss(toastId);
  return result;
};

// Delete Course
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course");
    }

    toast.success("Course Deleted");
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
};

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    result = error.response.data;
  }

  toast.dismiss(toastId);
  return result;
};

export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating");
    }

    toast.success("Your Rating Added");
  } catch (error) {
    toast.error(error.message);
  }

  toast.dismiss(toastId);
};

export const markLectureAsComplete = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    toast.success("Lecture Completed");
    result = response.data.success;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    result = false;
  }
  toast.dismiss(toastId);
  return result;
};
