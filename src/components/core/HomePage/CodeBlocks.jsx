import React from 'react'
import {FaArrowRight} from "react-icons/fa";
import CTAButton from "./Button";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position, 
    heading, 
    subHeading, 
    ctabtn1, 
    ctabtn2, 
    codeblock, 
    backgroundGradient, 
    codeColor}) => {
  return (
    <div className={`flex ${position} my-20  gap-8 justify-between`}>
        {/* section 1 */}

        <div className='flex lg:w-[50%] w-[100%] flex-col gap-8'>
            {heading}

            {/* Sub Heading */}
            <div className='text-richblack-300 font-medium w-[85%]'>
                {subHeading}
            </div>
            
            {/* Button Group */}
            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
                    {ctabtn2.btnText}
                </CTAButton>

            </div>


        </div>

        {/* section 2 */}
        <div className=' relative h-fit flex py-3 text-[10px] sm:text-sm sm:leading-6  code-border ml-14 w-[100%] lg:w-[470px]'>
            {/*TODO--> BG gradient */}
            {backgroundGradient}

            {/* Numbering  */}
            <div className='text-center w-[10%] text-richblack-400 font-bold font-inter gap-[2px] text-[14px]'>
                {
                    Array.from({length:11},(unusedValue, index) => ( //read Arry.from(object, mapfunction)
                        <p key={index+1}>{index+1}</p>
                    ))
                }
            </div>
            
            {/* code  */}
            <div className={`w-[90%] flex  gap-[2px] font-bold font-mono ${codeColor} pr-2 text-[14px]`}>
                <TypeAnimation 
                style={{ whiteSpace: 'pre-line', display: "block" }}
                sequence={[codeblock, 1000, ""]} 
                repeat={Infinity}
                omitDeletionAnimation={true}
                />
            </div>
            
        </div>
      
    </div>
  )
}

export default CodeBlocks
