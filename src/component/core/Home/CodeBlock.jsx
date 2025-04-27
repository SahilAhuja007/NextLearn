import React from "react";
import CTAButton from "./button";
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
const CodeBlock = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  console.log("ctabtn1:-", ctabtn1.text);
  console.log("ctabtn2:-", ctabtn2.text);
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      <div className="flex flex-col w-[50%]  gap-8">
        {heading}
        <div className="text-richblack-300 font-bold">{subheading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton
            active={ctabtn1.active}
            linkto={ctabtn1.linkto}
            text={ctabtn1.text}
          ></CTAButton>
          <CTAButton
            active={ctabtn2.active}
            linkto={ctabtn2.linkto}
            text={ctabtn2.text}
          ></CTAButton>
        </div>
      </div>
      <div className=" h-fit flex flex-row text-[17px] w-[100%] py-4 lg:w-[500px]">
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 10000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{ whiteSpace: "pre-line", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
