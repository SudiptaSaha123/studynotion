import React from "react";
import CTAbutton from "../homePage/CTAbutton";

const learningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlighted: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    btnText: "Learn more",
    btnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description: "The learning process uses the namely online and offline.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "You will get a certificate that can be used as a certification during job hunting.",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
  },
];

const LearningGrid = () => {
  return (
    <div className="w-full py-14">
      <div className=" w-11/12 max-w-maxContent mx-auto grid gap-6 lg:gap-0 grid-cols-1 lg:grid-cols-4">
        {learningGridArray.map((card, i) => {
          return (
            <div
              key={i}
              className={`${i === 0 && "lg:col-span-2 bg-richblack-900"} ${
                card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"
              } ${card.order === 3 && "lg:col-start-2"} `}
            >
              {card.order < 0 ? (
                <div className="flex flex-col items-start gap-2">
                  <p className=" text-richblack-5 text-3xl font-semibold">
                    {card.heading}
                  </p>
                  <p className="text-3xl font-semibold text-blue-100">
                    {card.highlighted}
                  </p>
                  <p className=" text-sm text-richblack-300 w-[80%] mb-6">
                    {card.description}
                  </p>
                  <CTAbutton active={true} linkto={card.btnLink}>
                    {card.btnText}
                  </CTAbutton>
                </div>
              ) : (
                <div className="flex w-full h-full items-start justify-center px-7 py-6">
                  <div className="flex flex-col gap-6">
                    <p className=" text-lg font-semibold text-richblack-5">
                      {card.heading}
                    </p>
                    <p className=" text-sm text-richblack-300 font-medium">
                      {card.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningGrid;
