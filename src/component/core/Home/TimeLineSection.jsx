import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    description: "Fully committed to the success of the company",
  },
  {
    Logo: Logo2,
    heading: "Leadership",
    description: "Fully committed to the success of the company",
  },
  {
    Logo: Logo3,
    heading: "Leadership",
    description: "Fully committed to the success of the company",
  },
  {
    Logo: Logo4,
    heading: "Leadership",
    description: "Fully committed to the success of the company",
  },
];

const TimeLineSection = () => {
  return (
    <div className="w-11/12 mx-auto mt-10">
      <div className="flex flex-row gap-20 items-center">
        {/* Left timeline list */}
        <div className="w-[45%] flex flex-col gap-10">
          {timeline.map((element, index) => (
            <div className="flex flex-row gap-6 items-start" key={index}>
              <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full shadow-md">
                <img
                  src={element.Logo}
                  alt={`logo-${index}`}
                  className="w-6 h-6"
                />
              </div>

              <div>
                <h2 className="font-semibold text-lg">{element.heading}</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {element.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right timeline image */}
        <div className="relative w-[50%]">
          <img
            src={timelineImage}
            alt="timelineImage"
            className="object-cover w-full h-auto rounded-md shadow-lg"
          />

          {/* Stats Box */}
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;
