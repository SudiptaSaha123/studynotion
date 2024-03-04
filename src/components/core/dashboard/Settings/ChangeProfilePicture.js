import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";

const ChangeProfilePicture = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputeRef = useRef(null);

  const handleClick = () => {
    fileInputeRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      dispatch(updateDisplayPicture(token, formData));
      setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-2 sm:gap-14 p-10 bg-richblack-800 border border-richblack-700 rounded-md mt-10">
      <img
        src={previewSource || user?.image}
        alt=""
        className="aspect-square w-[78px] rounded-full object-cover"
      ></img>
      <div className="flex flex-col items-center sm:items-start">
        <p className=" mb-2 text-lg font-semibold">Change Profile Picture</p>
        <div className="flex gap-3">
          <input
            type="file"
            ref={fileInputeRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/gif, image/jpeg"
          ></input>
          <button
            className="rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            disabled={loading}
            onClick={handleClick}
          >
            Select
          </button>
          <button
            className="rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 flex items-center gap-2"
            onClick={handleFileUpload}
          >
            {!loading && (
              <FiUpload className="text-lg text-richblack-900"></FiUpload>
            )}
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
