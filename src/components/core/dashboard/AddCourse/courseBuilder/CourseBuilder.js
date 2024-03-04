import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./NestedView";
import { IoIosArrowForward } from "react-icons/io";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";

const CourseBuilder = () => {
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const cancelEdit = () => {
    setEditSectionName(false);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please Add Atleast One Section");
      return;
    }

    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please Add Atleast One Lecture");
      return;
    }

    dispatch(setStep(3));
  };

  const onSubmitHandler = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        { sectionName: data.sectionName, courseId: course._id },
        token
      );
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(false);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  const handleEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="w-full p-4 bg-richblack-800 border border-richblack-700 rounded-md flex flex-col gap-6">
      <p className="text-xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Section Name
          </p>
          <input
            name="sectionName"
            placeholder="Enter Section Name"
            {...register("sectionName", { required: true })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
          ></input>
          {errors.sectionName && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Section Name is Required
            </span>
          )}
        </label>
        <div className="mt-6 flex gap-6">
          <button
            type="Submit"
            className="py-3 px-4 rounded-md border flex gap-2 items-center text-yellow-50"
          >
            <p>{editSectionName ? "Edit Section Name" : "Create Section"}</p>
            <MdAddCircleOutline></MdAddCircleOutline>
          </button>

          {editSectionName && (
            <button
              type="button"
              className="text-sm text-richblack-300 underline"
              onClick={cancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.courseContent.length > 0 && (
        <NestedView handleEditSectionName={handleEditSectionName}></NestedView>
      )}

      <div className="flex gap-5 justify-end">
        <button
          className="py-3 px-4 rounded-md bg-richblack-100 text-richblack-900 font-semibold"
          onClick={goBack}
        >
          Back
        </button>
        <button
          className="flex items-center gap-2 py-3 px-4 rounded-md bg-yellow-50 text-richblack-900 font-semibold"
          onClick={goToNext}
        >
          Next <IoIosArrowForward></IoIosArrowForward>
        </button>
      </div>
    </div>
  );
};

export default CourseBuilder;
