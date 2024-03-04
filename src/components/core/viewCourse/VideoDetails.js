import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../redux/slices/viewCourseSlice";
import {
  BigPlayButton,
  ControlBar,
  ForwardControl,
  Player,
  ReplayControl,
} from "video-react";
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSourse] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstVideo, setFirstVideo] = useState(false);
  const [lastVideo, setLastVideo] = useState(false);

  useEffect(() => {
    const setvideoDetails = async () => {
      if (!courseSectionData.length) {
        return;
      }

      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );

        const filteredVideoData = filteredData?.[0].subSection.filter(
          (data) => data._id === subSectionId
        );

        setVideoData(filteredVideoData[0]);
        setPreviewSourse(courseEntireData.thumbnail);
        setVideoEnded(false);
      }
    };

    setvideoDetails();
    isFirstVideo();
    isLastVideo();
  }, [courseEntireData, courseSectionData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((subSec) => subSec._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      setFirstVideo(true);
    } else {
      setFirstVideo(false);
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );

    const noOfSubSection =
      courseSectionData[currentSectionIndex]?.subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((subSec) => subSec._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSection - 1
    ) {
      setLastVideo(true);
    } else {
      setLastVideo(false);
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );

    const noOfSubSection =
      courseSectionData[currentSectionIndex]?.subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((subSec) => subSec._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSection - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubSectionIndex + 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1]?.subSection[0]._id;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((subSec) => subSec._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubSectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSectionLength =
        courseSectionData[currentSectionIndex - 1]?.subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1]?.subSection[
          prevSectionLength - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handlelectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      {
        courseId: courseId,
        subSectionId: subSectionId,
      },
      token
    );

    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="w-[85%] mx-auto my-4">
        <div className="w-full">
          <p className="mt-4 mb-2 text-3xl font-semibold text-richblack-5">
            {videoData?.title}
          </p>

          {videoEnded && (
            <div className="w-full flex items-center justify-between my-2">
              <div className="flex flex-wrap items-center gap-3">
                {!completedLectures.includes(subSectionId) && (
                  <button
                    onClick={handlelectureCompletion}
                    disabled={loading}
                    className="bg-yellow-50 rounded-md py-2 px-3 font-semibold text-black text-xs"
                  >
                    {loading ? <p>Loading...</p> : <p>Mark As Complete</p>}
                  </button>
                )}
                <button
                  disabled={loading}
                  onClick={() => {
                    if (playerRef.current) {
                      playerRef?.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  className="bg-yellow-50 rounded-md py-2 px-3 font-semibold text-black text-xs"
                >
                  Rewatch
                </button>
              </div>

              <div className="w-[45%] flex items-center justify-between">
                <div className=" text-richblack-5">
                  {!firstVideo && (
                    <button disabled={loading} onClick={goToPreviousVideo}>
                      <MdSkipPrevious size={30}></MdSkipPrevious>
                    </button>
                  )}
                </div>
                <div className=" text-richblack-5">
                  {!lastVideo && (
                    <button disabled={loading} onClick={goToNextVideo}>
                      <MdSkipNext size={30}></MdSkipNext>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {!videoData ? (
          <img
            src={previewSource}
            alt="thumbnail"
            className="w-full h-full object-cover rounded-md"
          ></img>
        ) : (
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData.videoUrl}
          >
            <BigPlayButton position="center"></BigPlayButton>
            <ControlBar autoHide={false}>
              <ReplayControl seconds={10}></ReplayControl>
              <ForwardControl seconds={10}></ForwardControl>
            </ControlBar>
          </Player>
        )}
      </div>
    </div>
  );
};

export default VideoDetails;
