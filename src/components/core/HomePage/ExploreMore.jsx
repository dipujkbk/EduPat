import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    'Career paths',
]
function ExploreMore() {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value) => {
        setCurrentTab(value);
        
        const courseObjectArray = HomePageExplore.filter((courseObject)=> courseObject.tag === value);
        setCourses(courseObjectArray[0].courses);

        setCurrentCard(courseObjectArray[0].courses[0].heading);
    }
  return (
    <div>
        {/* heading  */}
        <div className='text-4xl font-semibold text-center'>
            Unlock the <HighlightText text={"Power of Code"}/>
        </div>

        {/* subheading  */}
        <p className='text-richblack-300 text-center text-lg font-medium mt-3'>
            Learn to Build Anything You Can Imagine
        </p>
        
        {/* tabs */}
        <div className='hidden lg:flex gap-3 bg-richblack-800  text-richblack-200 font-medium rounded-full p-1 my-5 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
            {
                tabsName.map((tab, index)=> 
                    <div key={index}
                    className={`${currentTab === tab ? "bg-richblack-900 text-richblack-5" : "text-richblack-200"} rounded-full transition-all duration-200 hover:bg-richblack-700 hover:text-richblack-25 py-2 px-5 cursor-pointer`} 
                    onClick={ ()=> setMyCard(tab)}
                    
                    >
                        {tab}
                    </div>)
            }
            
        </div>

        {/* Adding a margin in differnt way */}
        <div className='hidden lg:block lg:h-[200px]'></div>

        {/* cards  */}

        <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:-translate-x-[50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
            {
                courses.map( (element, index) => {

                    return (
                        <CourseCard
                        key={index}
                        cardData = {element}
                        currentCard = {currentCard}
                        setCurrentCard ={setCurrentCard}
                        />
                    )
                })
            }
        </div>
      
    </div>
  )
}

export default ExploreMore
