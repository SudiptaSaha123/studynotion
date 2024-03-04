import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import {
  addCourse,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { useDispatch, useSelector } from "react-redux";
import RequirmentsField from "./RequirmentsField";
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
import UploadField from "./UploadField";
import { COURSE_STATUS } from "../../../../../utils/constants";
import ChipInput from "./ChipInput";
import toast from "react-hot-toast";
import { IoIosArrowForward } from "react-icons/io";

const CourseInfirmationForm = () => {
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const getCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();
    if (categories.length > 0) {
      setCourseCategories(categories);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }

    return false;
  };

  const handelOnSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);

        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No Changes Made To The Form");
      }

      return;
    }
    console.log("Printing Data", data);
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);
    console.log("Form Data: ", formData);

    setLoading(true);
    const result = await addCourse(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <form
      className="w-full p-4 bg-richblack-800 border border-richblack-700 rounded-md flex flex-col gap-6"
      onSubmit={handleSubmit(handelOnSubmit)}
    >
      <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Course Title
        </p>
        <input
          name="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
        ></input>
        {errors.courseTitle && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Course Title is Required
          </span>
        )}
      </label>

      <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Course Short Description
        </p>
        <textarea
          name="courseShortDesc"
          placeholder="Enter Course Description"
          rows="3"
          {...register("courseShortDesc", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
        ></textarea>
        {errors.courseShortDesc && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Course Description is required
          </span>
        )}
      </label>

      <label className=" relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 flex items-center gap-3">
          Course Price{" "}
          <HiOutlineCurrencyRupee className=" text-2xl text-richblack-300 absolute top-[2.35rem] left-1"></HiOutlineCurrencyRupee>
        </p>
        <input
          name="coursePrice"
          placeholder="Enter Course Price"
          {...register("coursePrice", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] pl-9 text-richblack-5"
        ></input>
        {errors.coursePrice && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Course Price is required
          </span>
        )}
      </label>

      <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Course Category
        </p>
        <select
          name="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
        >
          <option value="" disabled>
            Choose a category
          </option>

          {!loading &&
            courseCategories.map((category, i) => (
              <option key={i} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
      </label>

      <ChipInput
        label="Tags"
        name="courseTags"
        placeHolder="Enter Tags"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      ></ChipInput>

      {/* Component for uploading and showing prwview of media */}
      <UploadField
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      ></UploadField>

      <label>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Course Benefits
        </p>
        <textarea
          name="courseBenefits"
          placeholder="Enter Course Description"
          rows="3"
          {...register("courseBenefits", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
        ></textarea>
        {errors.courseBenefits && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Course Benefits are required
          </span>
        )}
      </label>

      <RequirmentsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      ></RequirmentsField>

      <div className="flex items-center gap-4 justify-end">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="px-6 py-3 rounded-md bg-richblack-200 text-richblack-800 font-semibold hover:scale-95 transition-all duration-200"
          >
            Continue Without Saving
          </button>
        )}

        <button
          type="submit"
          className="px-6 py-3 hover:scale-95 transition-all duration-200 bg-yellow-50 text-black rounded-md font-semibold"
        >
          {!editCourse ? (
            <p className="flex items-center gap-2">
              Next<IoIosArrowForward></IoIosArrowForward>
            </p>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default CourseInfirmationForm;
