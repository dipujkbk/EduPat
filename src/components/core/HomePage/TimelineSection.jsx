import React from 'react';

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"


const timeline = [
    {
        logo: Logo1,
        heading: "Leadership",
        description: "Fully committed to the success of company",
    },
    {
        logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority",
    },
    {
        logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills",
    },
    {
        logo: Logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution",
    },
]

const TimelineSection = () => {
  return (
    <div>
      
      <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">

        {/* left part */}
        <div className='lg:w-[45%] flex flex-col gap-3'>
            {
                timeline.map( (item, index) => (

                    <div key={index} className='flex flex-col gap-2'>

                        {/* icon and description box */}

                        <div className='flex gap-6' key={index}>

                            <div className='w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center  shadow-[#219C90] shadow-[0_0_62px_5px]'>
                                <img src= {item.logo} alt='timeline-logo'/>
                            </div>

                            <div>
                                <h2 className='font-semibold text-[18px]'>{item.heading}</h2>
                                <p className=' text-base'>{item.description}</p>
                            </div>

                        </div>


                        {/* dotted border  */}

                        <div className={`${
                                timeline.length - 1 === index ? "hidden" : "lg:block"
                            }  h-14 border-dotted border-r-[2px] border-richblack-100  w-[26px]`}
                            >
                        </div>

                    </div>
                    
                )) 
            }

        </div>

        {/* Right Part  */}
        <div className='relative shadow-blue-200 shadow-[0px_0px_40px_0px] w-fit h-fit '>
            <img src={timelineImage} alt='TimeLinepic' className="shadow-richblack-800 shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit" />

            <div className="absolute left-[50%] bottom-0 translate-x-[-50%] translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
                
                {/* section 1 */}
                <div className='flex gap-5 items-center lg:border-r lg:border-b-0 border-b mx-3 lg:mx-0 pb-3 border-caribbeangreen-300 px-14  lg:px-7'>
                    <p className='text-3xl font-bold'>10</p>
                    <p className=' text-caribbeangreen-300 text-sm '>Years Of Experience</p>
                </div>

                {/* section 2 */}
                <div className='flex gap-5 items-center px-14 lg:px-7'>
                    <p className='text-3xl font-bold'>250</p>
                    <p className=' text-caribbeangreen-300 text-sm '>Types of Courses</p>
                </div>

            </div>
        </div>

      </div>
    </div>
  )
}

export default TimelineSection
