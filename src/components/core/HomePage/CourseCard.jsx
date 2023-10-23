import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div className={`w-[360px] h-[300px] lg:w-[30%] flex flex-col  text-richblack-25 ${currentCard === cardData?.heading ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50" : " bg-richblack-800"}  cursor-pointer box-border`}
    onClick={() => setCurrentCard(cardData?.heading)}
    >
      
      {/* upper heading  */}
      <div className="flex flex-col gap-3 border-b-[2px] border-dashed border-richblack-400 h-[80%] p-6"> 

        {/* heading  */}
        <div className={`${currentCard ===  cardData?.heading && "text-richblack-800"} font-semibold text-[20px]`}>
          {cardData.heading}
        </div>

        {/* subheading */}
        <div className="text-richblack-400">
          {cardData.description}
        </div>

      </div>


      {/* lower footer  */}

      <div className={`flex justify-between ${currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"} px-4 py-6`}>

        {/* level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers/>
          <div>
            {cardData.level}
          </div>
        </div>
        
        {/* lesson  */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree/>
          <div>
            {cardData.lessionNumber} Lessions
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default CourseCard;

