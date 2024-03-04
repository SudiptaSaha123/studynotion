import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";

const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currntTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCard = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div className=" w-full mt-6 md:mt-24 flex flex-col items-start md:items-center mb-10 xl:mb-[12rem] gap-5 lg:gap-0">
      <div className="flex flex-col items-start md:items-center">
        <div className="text-4xl font-semibold">
          Unlock the <span className="text-[#9bd3e8]">Power of Code</span>
        </div>
        <div className=" text-richblack-300 text-sm font-bold text-center mt-4">
          Learn to Build Anything You Can Imagine
        </div>

        <div className=" hidden lg:flex my-10 px-2 py-1 rounded-full bg-richblack-800 justify-between">
          {tabName.map((element, index) => {
            return (
              <div
                key={index}
                className={`text-[16px] ${
                  currntTab === element
                    ? " bg-richblack-900 text-richblack-5"
                    : "text-richblack-200"
                } py-2 px-5 rounded-full cursor-pointer hover:bg-richblack-900 transition-all duration-200`}
                onClick={() => setMyCard(element)}
              >
                {element}
              </div>
            );
          })}
        </div>
      </div>

      <div className=" w-full xl:absolute -bottom-32 flex justify-between flex-wrap items-center gap-5">
        {courses.map((element, index) => {
          return (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            ></CourseCard>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
