import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { createRating } from "../../../services/operations/courseDetailsAPI";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  });

  const ratingChange = (newRatig) => {
    setValue("courseRating", newRatig);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );

    setReviewModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[600px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5"></RxCross2>
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt="profile"
              className="aspect-square w-[50px] rounded-full object-cover"
            ></img>
            <div>
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>

          <form
            className="mt-6 flex flex-col items-center w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ReactStars
              count={5}
              onChange={ratingChange}
              size={24}
              activeColor="#ffd700"
              classNames={`text-lg`}
            ></ReactStars>

            <label className="w-full">
              <p className="text-lg mb-1 tracking-wide text-richblack-5">
                Add Your Experience
              </p>
              <textarea
                name="courseExperience"
                {...register("courseExperience", { required: true })}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              ></textarea>
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please Add Your Experience
                </span>
              )}
            </label>
            <div className="w-full flex justify-end items-center gap-3 mt-3">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-yellow-50 py-[8px] px-[20px] font-semibold text-richblack-900 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
