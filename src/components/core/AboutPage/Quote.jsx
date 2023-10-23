import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className=" text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white italic">
        <span className=' text-richblack-600'>" </span>We are passionate about revolutionizing the way we learn. Our
        innovative platform <HighlightText text={"combines technology"} />,{" "}
        <span className="bg-gradient-to-b from-[#33ee04] to-[#61d0ec] text-transparent bg-clip-text font-bold">
            {" "}
            expertise
        </span>
        , and community to create an
        <span className="bg-gradient-to-b from-[#0905f0] to-[#ebecf0] text-transparent bg-clip-text font-bold">
            {" "}
            unparalleled educational
        experience. 
        </span> 
        <span className=' text-richblack-600'>"</span>
    </div>
  )
}

export default Quote