import React from "react";

const ConfrimationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 flex items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="max-w-[350px] bg-richblack-800 p-6 rounded-xl border border-richblack-400">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center justify-between">
          <button
            onClick={modalData?.btn1Handler}
            className="bg-yellow-50 py-[8px] px-[20px] font-semibold text-richblack-900 rounded-md"
          >
            {modalData?.btn1Text}
          </button>
          <button
            onClick={modalData?.btn2Handler}
            className="bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900 rounded-md"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfrimationModal;
