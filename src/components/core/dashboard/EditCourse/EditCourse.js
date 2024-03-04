import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFullDetailOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../redux/slices/courseSlice";
import RanderSteps from "../AddCourse/RanderSteps";

const EditCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEditData = async () => {
      setLoading(true);
      const result = await getFullDetailOfCourse(courseId, token);

      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }
      setLoading(false);
    };

    getEditData();
  }, []);
  return (
    <div className="w-full pl-0 lg:pl-[222px]">
      <div className="w-11/12 max-w-[900px] mx-auto mt-16 mb-24">
        <h1 className="text-4xl font-semibold mb-8 md:mb-0">Edit Course</h1>
        {course ? (
          <RanderSteps></RanderSteps>
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  );
};

export default EditCourse;
