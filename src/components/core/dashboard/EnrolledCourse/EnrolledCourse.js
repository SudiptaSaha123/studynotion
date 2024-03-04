import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStudentEnrolledCourses } from "../../../../services/operations/userAPI";
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolledCourse, setEnrolledCourse] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const result = await getStudentEnrolledCourses(token);
        setEnrolledCourse(result);
      } catch (error) {
        console.log("Could not fetch enrolled courses.", error);
      }
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <div className="w-full pl-0 lg:pl-[222px]">
      <div className="w-11/12 max-w-[800px] flex flex-col items-start mx-auto mt-12 mb-24">
        <p className="text-4xl font-semibold mb-4">My Enrolled Courses</p>
        {enrolledCourse.length === 0 ? (
          <p className=" text-richblack-5">
            You Have Not Enrolled Any Course Yet!
          </p>
        ) : (
          <div className="w-full flex flex-col gap-2">
            {enrolledCourse.map((course, i) => (
              <div
                key={i}
                className="cursor-pointer p-6 bg-richblack-800 border border-richblack-700 rounded-md w-full flex items-center justify-between"
                onClick={() =>
                  navigate(
                    `/view-course/${course._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection[0]._id}`
                  )
                }
              >
                <div className="flex items-center gap-2">
                  <img
                    src={course.thumbnail}
                    alt="CourseImg"
                    className="h-14 w-14 rounded-lg object-cover"
                  ></img>

                  <p>{course.courseName}</p>
                </div>
                <div className="flex flex-col w-[40%] gap-2">
                  <p className=" text-richblack-5">Course Progress:</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                    animateOnRender={true}
                    bgColor="#45FFCA"
                  ></ProgressBar>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourse;
