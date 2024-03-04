import React, { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import InstructorCourses from "./InstructorCourses/InstructorCourses";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import { setEditCourse } from "../../../redux/slices/courseSlice";

const MyCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourseList(result);
      }
    };
    fetchCourses();
  }, []);
  return (
    <div className="w-full pl-0 lg:pl-[222px]">
      <div className="w-11/12 max-w-[800px] flex flex-col items-start mx-auto mt-12 mb-24">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-4xl font-semibold mb-4">My Courses</h1>
          <button
            onClick={() => {
              dispatch(setEditCourse(false));
              navigate("/dashboard/add-course");
            }}
            className="flex items-center gap-2 px-6 py-3 hover:scale-95 transition-all duration-200 bg-yellow-50 text-black rounded-md font-semibold"
          >
            <p>Add Course</p>
            <VscAdd className=" font-semibold"></VscAdd>
          </button>
        </div>

        {courseList && (
          <InstructorCourses
            courseList={courseList}
            setCourseList={setCourseList}
          ></InstructorCourses>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
