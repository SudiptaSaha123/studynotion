import React, { useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { formateDate } from "../../../../services/formateDate";
import { COURSE_STATUS } from "../../../../utils/constants";
import { HiClock } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import { useSelector } from "react-redux";
import { setCourse } from "../../../../redux/slices/courseSlice";
import ConfrimationModal from "../../../common/ConfrimationModal";

const InstructorCourses = ({ courseList, setCourseList }) => {
  const TRUNCATE_LENGTH = 30;
  const navigate = useNavigate();
  const [confrimationModal, setConfrimationModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);

    if (result) {
      setCourse(result);
    }

    setConfrimationModal(null);
    setLoading(false);
  };

  return (
    <>
      <div className="mt-12 flex flex-col gap-6 w-full">
        {courseList.length === 0 ? (
          <p>No Course Found</p>
        ) : (
          courseList.map((course) => (
            <div className="flex justify-between items-end">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-14">
                <img
                  src={course.thumbnail}
                  alt=""
                  className=" h-[230px] sm:h-[180px] w-full sm:w-[300px] rounded-lg object-cover"
                ></img>
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold text-richblack-5">
                    {course.courseName}
                  </p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.split(" ").length >
                    TRUNCATE_LENGTH
                      ? course.courseDescription
                          .split(" ")
                          .slice(0, TRUNCATE_LENGTH)
                          .join(" ") + "..."
                      : course.courseDescription}
                  </p>
                  <p className="text-[20px] text-white">₹{course.price}</p>
                  <p className="text-[12px] text-white">
                    Created: {formateDate(course.createdAt)}
                  </p>
                  <div className="flex items-center gap-8">
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14}></HiClock>
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8}></FaCheck>
                        </div>
                        Published
                      </p>
                    )}
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/edit-course/${course._id}`)
                        }
                        className="px-2 text-richblack-300 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                      >
                        <FiEdit2 size={20}></FiEdit2>
                      </button>
                      <button
                        className="px-1 text-richblack-300 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                        onClick={() =>
                          setConfrimationModal({
                            text1: "Do you want to delete this course?",
                            text2:
                              "All the data related to this course will be deleted",
                            btn1Text: loading ? "Loading..." : "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: loading
                              ? () => {}
                              : () => handleCourseDelete(course._id),
                            btn2Handler: loading
                              ? () => {}
                              : () => setConfrimationModal(null),
                          })
                        }
                      >
                        <RiDeleteBin6Line size={20}></RiDeleteBin6Line>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {confrimationModal && (
        <ConfrimationModal modalData={confrimationModal}></ConfrimationModal>
      )}
    </>
  );
};

export default InstructorCourses;
