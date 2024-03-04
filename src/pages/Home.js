import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import CTAbutton from "../components/core/homePage/CTAbutton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/homePage/CodeBlocks";
import TimeLineSection from "../components/core/homePage/TimeLineSection";
import LearningLanguageSection from "../components/core/homePage/LearningLanguageSection";
import InstructorSection from "../components/core/homePage/InstructorSection";
import ExploreMore from "../components/core/homePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div className=" overflow-y-hidden">
      {/* Section - 1 */}
      <div className="w-11/12 mx-auto mt-10 relative flex flex-col text-white max-w-maxContent items-start md:items-center">
        <Link to={"/signup"}>
          <div className="mt-16 px-4 py-3 bg-richblack-700 rounded-md flex items-center justify-center gap-3 font-bold hover:bg-richblack-800 hover:scale-95 transition-all duration-200 text-richblack-100">
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>
        </Link>
        <h2 className="font-inter text-4xl font-semibold items-start md:items-center mt-4">
          Empower your future with{" "}
          <span className=" text-caribbeangreen-50">Coding Skills</span>
        </h2>
        <p className="mt-6 text-richblack-300 text-sm font-bold text-start sm:text-center w-[90%]">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-9">
          <CTAbutton active={true} linkto={"/signup"}>
            Learn More
          </CTAbutton>
          <CTAbutton active={false} linkto={"/signup"}>
            Book a Demo
          </CTAbutton>
        </div>

        <div className="mt-24">
          <div className="w-[90%] md:w-[70%] mx-auto shadow-blue-50 shadow-2xl">
            <div className="shadow-[12px_12px_0_0] shadow-richblack-5">
              <video muted loop autoPlay>
                <source src={Banner} type="video/mp4"></source>
              </video>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <CodeBlocks
            position={`lg:flex-row`}
            heading={
              <div className="font-inter text-4xl font-semibold">
                <div>
                  Unlock your{" "}
                  <span className="text-[#88dcfa]">coding potential</span>
                </div>
                <div>with our online courses</div>
              </div>
            }
            subHeading={
              <div className="text-richblack-300 text-sm font-bold my-4">
                Our courses are designed and taught by industry experts who have
                years of experience in coding and are passionate about sharing
                their knowledge with you.
              </div>
            }
            ctaButton1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctaButton2={{
              btnText: "Learn more",
              linkto: "/signup",
              active: false,
            }}
            codeBlock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
            bgGradient={`codeGradient2`}
          ></CodeBlocks>
        </div>
        <div className=" md:mt-24">
          <CodeBlocks
            position={`lg:flex-row-reverse`}
            heading={
              <div className="font-inter text-4xl font-semibold">
                <div>
                  Start <span className=" text-[#88dcfa]">coding</span>
                </div>
                <div className="text-[#88dcfa]">in Seconds</div>
              </div>
            }
            subHeading={
              <div className="text-richblack-300 text-sm font-bold my-4">
                Go ahead, give it a try. Our hands-on learning environment means
                you'll be writing real code from your very first lesson.
              </div>
            }
            ctaButton1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctaButton2={{
              btnText: "Learn more",
              linkto: "/signup",
              active: false,
            }}
            codeBlock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
            bgGradient={`codeGradient1`}
          ></CodeBlocks>
        </div>
        <ExploreMore></ExploreMore>
      </div>

      {/* Section - 2 */}
      <div className=" bg-pure-greys-5 text-richblack-700">
        <div className="homePageBg h-[280px]">
          <div className=" w-11/12 max-w-maxContent mx-auto flex items-center justify-center">
            <div className="flex flex-col sm:flex-row gap-9 mt-10 sm:mt-40">
              <CTAbutton active={true} linkto={"/signup"}>
                <div className="flex items-center justify-center gap-3">
                  <p>Explore Full catalog</p>
                  <FaArrowRight></FaArrowRight>
                </div>
              </CTAbutton>
              <CTAbutton active={false} linkto={"/signup"}>
                Learn more
              </CTAbutton>
            </div>
          </div>
        </div>
        <div className=" w-11/12 max-w-maxContent mx-auto flex flex-col md:flex-row gap-3 md:gap-0 items-start justify-between mt-16">
          <div className=" w-full md:w-[50%] text-4xl font-semibold">
            Get the skills you need for a{" "}
            <span className="text-[#59bfe4]">job that is in demand.</span>
          </div>
          <div className=" w-full md:w-[50%] flex flex-col gap-5 items-start">
            <p className="text-sm font-bold">
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </p>

            <CTAbutton active={true} linkto={"/signup"}>
              Learn more
            </CTAbutton>
          </div>
        </div>
        <TimeLineSection></TimeLineSection>
        <LearningLanguageSection></LearningLanguageSection>
      </div>

      {/* Section - 3 */}
      <div className=" w-11/12 max-w-maxContent mx-auto flex-col items-center text-white mt-32 bg-richblack-900">
        <InstructorSection></InstructorSection>
        <div className=" text-4xl font-semibold text-center mt-20 mb-8">
          Reviews from other learners
        </div>
        {/* Review Slider */}
        <div className="w-full">
          <ReviewSlider></ReviewSlider>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
