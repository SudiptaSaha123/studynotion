import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";

const ViewCourseSideBar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    const setActiveFlag = () => {
      if (!courseSectionData.length) {
        return;
      }

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubSectionIndex
        ]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    };

    setActiveFlag();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="w-full lg:w-[350px] border-r border-richblack-700 h-auto lg:h-[calc(100vh-3.5rem)] bg-richblack-800">
      <div className=" mx-5 border-b border-richblack-600 py-3">
        <div className="flex flex-wrap gap-2 justify-between w-full items-center mt-3">
          <div
            className="flex items-center gap-1 text-sm text-richblack-25 cursor-pointer"
            onClick={() => navigate("/dashboard/enrolled-courses")}
          >
            <IoIosArrowBack className="texy-lg"></IoIosArrowBack>
            <p>Back To Courses</p>
          </div>
          <button
            className="bg-yellow-50 rounded-md py-2 px-3 font-semibold"
            onClick={() => setReviewModal(true)}
          >
            Add Review
          </button>
        </div>
        <div className="flex flex-col mt-4">
          <p className=" text-lg text-richblack-25">
            {courseEntireData?.courseName}
          </p>
          <p className="text-sm font-semibold text-richblack-500">
            {completedLectures.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      <div className="h-[calc(100vh-12.5rem)] overflow-y-auto">
        {courseSectionData?.map((section, i) => (
          <div
            key={i}
            className="mt-2 cursor-pointer text-sm"
            onClick={() => setActiveStatus(section._id)}
          >
            <div className="flex items-center w-full justify-between bg-richblack-600 px-5 py-4">
              <div className="w-[70%] font-semibold text-richblack-5">
                {section?.sectionName}
              </div>

              <span
                className={`${
                  activeStatus === section?._id ? "rotate-0" : "rotate-180"
                } transition-all duration-500`}
              >
                <BsChevronDown className=" text-richblack-25"></BsChevronDown>
              </span>
            </div>

            {activeStatus === section?._id && (
              <div className="transition-[height] duration-500 ease-in-out">
                {section.subSection.map((topic, i) => (
                  <div
                    key={i}
                    className={`${
                      videoBarActive === topic._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                    } flex gap-3 px-5 py-2 text-richblack-100`}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic?._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic._id)}
                      onChange={() => {}}
                    ></input>

                    {topic.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCourseSideBar;
