import React from "react";
import Highlighted from "./Highlighted";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "../../../component/core/Home/button";
const LearningLanguageSection = () => {
  return (
    <div className="mt-[130px] mb-10">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-4xl font-semibold text-center">
          Your Swiss knife for
          <Highlighted text={"learning any langauge"} />
        </div>
        <div className="text-center text-richblack-600 mx-auto  text-base font-medium w-[70%]">
          using{" "}
        </div>

        <div className="flex flex-row items-center justify-center mt-5">
          <img
            src={know_your_progress}
            alt="knowYourProgress"
            className="object-contain -mr-32"
          ></img>
          <img
            src={compare_with_others}
            alt="comparewithother"
            className="object-contain"
          ></img>
          <img
            src={plan_your_lesson}
            alt="planyoutlesson"
            className="object-contain -ml-36"
          ></img>
        </div>
        <div className="w-fit">
          <CTAButton
            active={true}
            linkto={"/signup"}
            text={"learn more"}
          ></CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
