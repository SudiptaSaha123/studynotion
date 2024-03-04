import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import UploadField from "../courseInformation/UploadField";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../../redux/slices/courseSlice";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    }

    return false;
  };

  const handelEditSubSection = async () => {
    const currentValues = getValues();

    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );

      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  };

  const onSubmitHandler = async (data) => {
    if (view) {
      return;
    }

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No Changes Made To The Form");
      } else {
        handelEditSubSection();
      }
      return;
    }

    const fromData = new FormData();
    fromData.append("sectionId", modalData);
    fromData.append("title", data.lectureTitle);
    fromData.append("description", data.lectureDesc);
    fromData.append("video", data.lectureVideo);

    setLoading(true);
    const result = await createSubSection(fromData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );

      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewfing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>

          <button onClick={() => !loading && setModalData(null)}>
            <RxCross2 className="text-2xl text-richblack-5"></RxCross2>
          </button>
        </div>

        {/* Modal Form */}
        <form
          className="flex flex-col gap-5 px-8 py-10"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          {/* Lecture Video Upload */}
          <UploadField
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          ></UploadField>

          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Lecture Title
            </p>
            <input
              name="lectureTitle"
              disabled={view || loading}
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            ></input>

            {errors.lectureTitle && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Lecture title is required
              </span>
            )}
          </label>

          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Lecture Description
            </p>

            <textarea
              name="lectureDesc"
              rows="3"
              placeholder="Enter Lecture Description"
              disabled={view || loading}
              {...register("lectureDesc", { required: true })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            ></textarea>
            {errors.lectureDesc && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Lecture Description is required
              </span>
            )}
          </label>

          {!view && (
            <div className="flex justify-end">
              <button
                disabled={loading}
                type="submit"
                className="py-3 px-4 rounded-md bg-yellow-50 text-richblack-900 font-semibold"
              >
                {loading ? "Loading..." : edit ? "Save Changes" : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
