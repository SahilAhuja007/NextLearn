import React from "react";
import CTAButton from "../../../component/core/Home/button";
import Instructor from "../../../assets/Images/Instructor.png";
import Highlighted from "./Highlighted";

const InstructionSection = () => {
  return (
    <div className="w-[50%">
      <div className="flex flex-row gap-20 items-center">
        <div className="w-[50%]">
          <img src={Instructor} alt="instructor" className="shadow-white" />
        </div>
        <div className="w-[50%] flex flex-col gap-10">
          <div className="text-4xl font-semibold w-[50%]">
            Become an
            <Highlighted text={"Instructor"} />
          </div>
          <p className="font-medium text-[16px] w-[80%] text-richblack-300">
            Instrutor from around the world teach millions of students on
            NextLearn . we provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit">
            <CTAButton
              active={true}
              linkto={"/signup"}
              text={"Start learning tiday"}
            ></CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionSection;
