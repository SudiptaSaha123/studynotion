import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { AiFillCaretDown } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfrimationModal from "../../../../common/ConfrimationModal";
import { FaPlus } from "react-icons/fa";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../redux/slices/courseSlice";
import SubSectionModal from "./SubSectionModal";

const NestedView = ({ handleEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confrimationModal, setConfrimationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      { sectionId, courseId: course._id },
      token
    );

    if (result) {
      dispatch(setCourse(result));
    }

    setConfrimationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId }, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );

      const updatedCourse = { ...course, courseContent: updatedCourseContent };

      dispatch(setCourse(updatedCourse));
    }

    setConfrimationModal(null);
  };
  return (
    <>
      <div className=" bg-richblack-700 p-6 rounded-lg">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-4">
                <RxDropdownMenu className="text-2xl text-richblack-50"></RxDropdownMenu>
                <p className="font-semibold text-richblack-50">
                  {section?.sectionName}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    handleEditSectionName(section._id, section.sectionName)
                  }
                >
                  <MdEdit className="text-xl text-richblack-300"></MdEdit>
                </button>
                <button
                  onClick={() =>
                    setConfrimationModal({
                      text1: "Delete This Section",
                      text2: "All The lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfrimationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300"></RiDeleteBin6Line>
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className="text-xl text-richblack-300"></AiFillCaretDown>
              </div>
            </summary>
            <div>
              {section.subSection.map((data) => (
                <div
                  key={data._id}
                  className="flex w-[90%] mx-auto cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-4">
                    <RxDropdownMenu className="text-2xl text-richblack-50"></RxDropdownMenu>
                    <p
                      className="font-semibold text-richblack-50"
                      onClick={() => setViewSubSection(data)}
                    >
                      {data?.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300"></MdEdit>
                    </button>
                    <button
                      onClick={() =>
                        setConfrimationModal({
                          text1: "Delete This Lecture?",
                          text2: "This Lecture Will Be Deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfrimationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300"></RiDeleteBin6Line>
                    </button>
                  </div>
                </div>
              ))}

              <button
                className="mt-3 pl-4 flex items-center gap-x-1 text-yellow-50"
                onClick={() => setAddSubSection(section._id)}
              >
                <FaPlus className="text-lg"></FaPlus>
                <p>Add lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        ></SubSectionModal>
      )}

      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        ></SubSectionModal>
      )}

      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        ></SubSectionModal>
      )}

      {confrimationModal && (
        <ConfrimationModal modalData={confrimationModal}></ConfrimationModal>
      )}
    </>
  );
};

export default NestedView;
