import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const InstructorCart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("student");

  // Function for get Random Colours
  const generateRandomColours = (num) => {
    const colours = [];
    for (let i = 0; i < num; i++) {
      const colour = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;

      colours.push(colour);
    }

    return colours;
  };

  // Data For The Chart Displaying Student Information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentEnrolled),
        backgroundColor: generateRandomColours(courses.length),
      },
    ],
  };

  // Data For The Chart Displaying Income Information
  const chartDataIncome = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColours(courses.length),
      },
    ],
  };

  // Options for generating Chart
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex w-full lg:w-[80%] flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div>
        <button
          onClick={() => setCurrChart("student")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "student"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="mx-auto aspect-square h-full w-full">
        <Pie
          data={currChart === "student" ? chartDataStudents : chartDataIncome}
          options={options}
        ></Pie>
      </div>
    </div>
  );
};

export default InstructorCart;
