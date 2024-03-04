import React from "react";
import aboutImg1 from "../assets/Images/aboutus1.webp";
import aboutImg2 from "../assets/Images/aboutus2.webp";
import aboutImg3 from "../assets/Images/aboutus3.webp";
import foundingStory from "../assets/Images/FoundingStory.png";
import LearningGrid from "../components/core/aboutPage/LearningGrid";
import ContactForm from "../components/core/aboutPage/ContactForm";
import Footer from "../components/common/Footer";

const About = () => {
  return (
    <div className="w-full">
      {/* Section 1  */}
      <div className=" bg-richblack-800 w-full pt-28 pb-9 xl:pb-44 mb-0 xl:mb-48">
        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center relative">
          <div className="flex flex-col items-center w-full md:w-[65%]">
            <p className="text-4xl font-semibold text-richblack-5 text-center">
              Driving Innovation in Online Education for a{" "}
              <span className="text-blue-100">Brighter Future</span>
            </p>
            <p className=" mt-3 text-sm text-richblack-300 text-center">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>

          <div className="w-full mt-10 xl:absolute top-40 flex justify-between items-center">
            <img src={aboutImg1} alt="" className="w-[30%]"></img>
            <img src={aboutImg2} alt="" className="w-[30%]"></img>
            <img src={aboutImg3} alt="" className="w-[30%]"></img>
          </div>
        </div>
      </div>

      {/* Settion 2 */}
      <div className="w-full pb-12 border-b border-richblack-600 mb-8">
        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center mt-20 pt-14">
          <p className="text-lg md:text-3xl font-semibold text-center w-full md:w-[80%] text-richblack-200">
            We are passionate about revolutionizing the way we learn. Our
            innovative platform{" "}
            <span className=" text-blue-50">combines technology</span>,{" "}
            <span className="text-red-500">expertise</span>, and community to
            create an{" "}
            <span className="text-amber">
              unparalleled educational experience.
            </span>
          </p>
        </div>
      </div>

      {/* section 3 */}
      <div className="w-full mt-28">
        <div className=" w-11/12 max-w-maxContent mx-auto my-12">
          <div className="flex items-center flex-col md:flex-row gap-3 justify-between">
            <div className="flex flex-col text-richblack-5 w-full md:w-[40%]">
              <h1 className="text-3xl font-semibold text-pink-500 mb-5">
                Our Founding Story
              </h1>
              <p className="text-sm text-richblack-300 mb-2">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-sm text-richblack-300">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <img src={foundingStory} alt="" className="w-full md:w-[40%]"></img>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-center justify-between text-richblack-5 mt-[150px]">
            <div className="w-full md:w-[40%]">
              <h1 className="text-3xl font-semibold text-brown-200 mb-5">
                Our Vision
              </h1>
              <p className="text-sm text-richblack-300">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="w-full md:w-[40%]">
              <h1 className="text-3xl font-semibold text-blue-100 mb-5">
                Our Mission
              </h1>
              <p className="text-sm text-richblack-300">
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* section 4 */}
      <div className="w-full py-14 bg-richblack-800 my-28">
        <div className=" w-11/12 max-w-maxContent mx-auto flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-col items-center gap-3">
            <p className="text-3xl font-bold text-richblack-5">5K</p>
            <p className="text-sm text-richblack-300">Active Students</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-3xl font-bold text-richblack-5">10+</p>
            <p className="text-sm text-richblack-300">Mentors</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-3xl font-bold text-richblack-5">200+</p>
            <p className="text-sm text-richblack-300">Courses</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-3xl font-bold text-richblack-5">50+</p>
            <p className="text-sm text-richblack-300">Awards</p>
          </div>
        </div>
      </div>

      <LearningGrid></LearningGrid>

      <ContactForm></ContactForm>

      <Footer></Footer>
    </div>
  );
};

export default About;
