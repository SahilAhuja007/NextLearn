import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import Highlighted from "./Highlighted";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="w-11/12 mx-auto mt-10 mb-10 flex flex-col items-center">
      <div className="text-4xl font-semibold text-center">
        Unlock the <Highlighted text={"Power of Code"} />
      </div>
      <p className="text-center text-richblack-300 text-[16px] mt-3">
        Learn to build what you can imagine
      </p>

      <div className="text-[16px] flex flex-row rounded-full bg-richblack-800 mb-10 border border-richblack-100 px-1 py-1 mt-8">
        {tabsName.map((element, index) => (
          <div
            key={index}
            className={`text-[16px] flex items-center gap-2 px-6 py-3 cursor-pointer rounded-full transition-all duration-200 ${
              currentTab === element
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5"
            }`}
            onClick={() => setMyCards(element)}
          >
            {element}
          </div>
        ))}
      </div>

      <div className="relative w-full mt-6">
        <div className="flex flex-wrap justify-center gap-10">
          {courses.map((element, index) => (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
