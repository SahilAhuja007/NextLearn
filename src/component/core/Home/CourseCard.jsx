import React from "react";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div
      onClick={() => setCurrentCard(cardData.heading)}
      className={`w-[300px] h-[280px] p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-md 
      ${
        currentCard === cardData.heading
          ? "bg-white text-richblack-900 scale-105"
          : "bg-richblack-800 text-richblack-100 hover:scale-105 hover:shadow-lg"
      }`}
    >
      <h2 className="text-xl font-bold mb-2">{cardData.heading}</h2>
      <p className="text-sm mb-4">{cardData.description}</p>

      <div className="flex items-center justify-between mt-6">
        <span className="text-caribbeangreen-300 text-sm">
          {cardData.level}
        </span>
        <span className="text-richblack-400 text-sm">
          {cardData.lessionNumber} Lessons
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
