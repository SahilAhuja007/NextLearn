import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Highlighted from "../component/core/Home/Highlighted";
import CTAButton from "../component/core/Home/button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlock from "../component/core/Home/CodeBlock";
import TimeLineSection from "../component/core/Home/TimeLineSection";
import LearningLanguageSection from "../component/core/Home/LearningLanguageSection";
import InstructionSection from "../component/core/Home/InstructionSection";
import Footer from "../component/common/Footer";
import ExploreMore from "../component/core/Home/ExploreMore";
import Navbar from "../component/common/Navbar";

const Home = () => {
  return (
    <div className="relative flex flex-col w-11/12 max-w-[1200px] mx-auto items-center text-white min-h-screen">
      <div className="flex flex-col items-center mt-16 gap-8">
        <Link to="/signup">
          <div className="group p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95">
            <div className="flex items-center gap-2 rounded-full px-6 py-2 transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <h1 className="text-center text-4xl font-semibold">
          Empower Your Future with
          <Highlighted text="Coding Skills" />
        </h1>

        <p className="w-4/5 text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world.
        </p>

        <div className="flex flex-row gap-6 mt-6">
          <CTAButton text="Learn More" active={true} linkto="/signup" />
          <CTAButton text="Book a Demo" active={false} linkto="/login" />
        </div>
      </div>

      <div className="mt-16 mb-16 w-full">
        <div className="shadow-blue-200">
          <video
            muted
            loop
            autoPlay
            className="w-full h-[400px] object-cover rounded-md"
          >
            <source src={Banner} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div>
        <CodeBlock
          position={"lg:flex-row"}
          heading={
            <div className="text-4xl font-semibold">
              Unlock Your
              <Highlighted text={"coding potential"} />
              with our online courses
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry professionals with years of experience."
          }
          ctabtn1={{
            text: "Try it Yourself",
            active: true,
            linkto: "/signup",
          }}
          ctabtn2={{
            text: "Learn More",
            active: false,
            linkto: "/login",
          }}
          codeblock={`<<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Sample Page</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
          }
            `}
          codeColor={"text-yellow-500"} // Yellow color for code block
        />
      </div>
      <div>
        <CodeBlock
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-4xl font-semibold">
              Unlock Your
              <Highlighted text={"coding potential"} />
              with our online courses
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry professionals with years of experience."
          }
          ctabtn1={{
            text: "Try it Yourself",
            active: true,
            linkto: "/signup",
          }}
          ctabtn2={{
            text: "Learn More",
            active: false,
            linkto: "/login",
          }}
          codeblock={`<<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Sample Page</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
          }
            `}
          codeColor={"text-yellow-500"} // Yellow color for code block
        />
        <ExploreMore />
      </div>
      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[333px] w-[1200px] bg-cover bg-center flex items-center justify-center">
          <div className="w-11/12 max-w-maxContent flex justify-center gap-6">
            <CTAButton
              active={true}
              linkto="/signup"
              text="Explore Full Catalog"
            />
            <CTAButton active={false} linkto="/signup" text="Learn More" />
          </div>
        </div>
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between">
          <div className="flex flex-row gap-5 mb-10 mt-10">
            <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for a
              <Highlighted text={"job that is in demand"} />
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills
              </div>
              <CTAButton
                active={true}
                linkto={"/signup"}
                text={"Learn more"}
              ></CTAButton>
            </div>
          </div>
          <TimeLineSection />
          <LearningLanguageSection />
        </div>
      </div>
      {/* section 3 */}
      <div
        className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 
      bg-richblack-900 text-white mt-10 mb-10"
      >
        <InstructionSection />
        <h2 className="text-center text-4xl font-semobold mt-10">
          review from other learner
        </h2>
      </div>
    </div>
  );
};

export default Home;
