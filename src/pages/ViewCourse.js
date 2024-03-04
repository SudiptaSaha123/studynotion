import React, { useEffect, useState } from "react";
import ViewCourseSideBar from "../components/core/viewCourse/ViewCourseSideBar";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFullDetailOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseEntireData,
  setCourseSectionData,
  setTotalNoOfLectures,
  updateCompletedLectures,
} from "../redux/slices/viewCourseSlice";
import CourseReviewModal from "../components/core/viewCourse/CourseReviewModal";

const ViewCourse = () => {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    const fetchCourseAllData = async () => {
      const result = await getFullDetailOfCourse(courseId, token);

      dispatch(setCourseSectionData(result?.courseDetails?.courseContent));
      dispatch(setCourseEntireData(result?.courseDetails));
      dispatch(setCompletedLectures(result?.completedVideos));

      let lectures = 0;
      result?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });

      dispatch(setTotalNoOfLectures(lectures));
    };

    fetchCourseAllData();
  }, []);
  return (
    <>
      <div className="mt-14 w-full flex flex-col-reverse lg:flex-row">
        <ViewCourseSideBar setReviewModal={setReviewModal}></ViewCourseSideBar>
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <Outlet></Outlet>
        </div>
      </div>

      {reviewModal && (
        <CourseReviewModal setReviewModal={setReviewModal}></CourseReviewModal>
      )}
    </>
  );
};

export default ViewCourse;
