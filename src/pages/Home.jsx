import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa";

import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer';

function Home() {
  return (
    <div>
      {/* section 1 */}
      <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
        

        {/* Become a Instructor Button */}

        <Link to={"/signup"}>

            <div className='group mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none'>
                <div className='flex items-center gap-2 rounded-full px-5 py-1 transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Become an Instructor</p>
                    <FaArrowRight/>
                </div>
            </div>

        </Link>
        
        {/* Heading */}
        <div className='text-center text-4xl font-semibold mt-7'>
            Empower Your Future With
            <HighlightText  text={"Coding Skills"}/>
        </div>

        {/* Sub Heading */}
        <div className='text-center text-richblack-300 text-lg mt-4 font-medium max-w-[900px] w-[90%]'>
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        {/* CTA Buttons */}
        <div className='flex flex-row gap-7 mt-8'>

          <CTAButton active={true} linkto={"/signup"}>
              Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>

        </div>

        {/* Video */}
        <div className='mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
          <video muted loop autoPlay
          className="shadow-[20px_20px_rgba(255,255,255,1)]"
          >
            <source src={Banner} type='video/mp4'/>
          </video>
        </div>


        {/*code section 1 */}
        <div className='w-11/12'>
          <CodeBlocks 
          position={"lg:flex-row"}
          heading={
            <div className='text-4xl font-semibold'>
              Unlock your <HighlightText text={"coding potential"}/> with our online courses
            </div>
          }
          subHeading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
          } 
          ctabtn1={
            {
              btnText: "Try it Yourself",
              active: true,
              linkto: "/signup",
            }
          }

          ctabtn2={
            {
              btnText: "Learn More",
              active: false,
              linkto: "/login",
            }
          }

          codeblock={
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <title>You are On EduPat</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
              <h2>Hello Deep!!WelCome to EduPat</h2>
              <p>You are awsome,</p>
            </body>
            </html>`
          }
          codeColor={"text-yellow-25"}
          backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>


         {/*code section 2 */}
         <div className='w-11/12'>
          <CodeBlocks 
          position={"lg:flex-row-reverse"}
          heading={
            <div className='text-4xl font-semibold'>
              Start <HighlightText text={"coding in seconds"}/>
            </div>
          }
          subHeading={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson"
          } 
          ctabtn1={
            {
              btnText: "Continue Lesson",
              active: true,
              linkto: "/signup",
            }
          }

          ctabtn2={
            {
              btnText: "Learn More",
              active: false,
              linkto: "/login",
            }
          }

          codeblock={
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <title>You are On EduPat</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
              <h2>We are happy to see you here!!</h2>
              <p>Start your Journey with us!</p>
            </body>
            </html>`
          }
          codeColor={"text-white"}
          backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* Explore more section  */}
        <ExploreMore/>

      </div>

      {/* section 2 */}

      <div className='bg-pure-greys-5 text-richblack-700'>

        <div className='homepage_bg h-[320px]'>

          {/* Explore Full Catagory Section */}

          <div className='w-11/12 h-[100%] max-w-maxContent flex flex-col items-center  gap-8'>

            <div className="lg:h-[150px]"></div>

            <div className="flex flex-row gap-7 text-white lg:mt-8" >

              <CTAButton active={true} linkto={"/signup"}>
                <div className='flex gap-2 items-center'>
                  Explore Full Catalog
                  <FaArrowRight/>
                </div>
                
              </CTAButton>

              <CTAButton active={false} linkto={"/login"}>
                  Learn More
              </CTAButton>

            </div>

          </div>

        </div>

        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 '>

          {/* Job that is in Demand - Section 1 */}
          <div className='mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0'>

            <div className='font-semibold text-4xl lg:w-[45%]'>
              Get the skills you need for a <HighlightText text={"job that is in demand"}/>
            </div>

            <div className='flex flex-col gap-10 lg:w-[40%] items-start'>
              <div className=' font-medium text-richblack-700'>
                The modern EduPat is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              
              <CTAButton active={true} linkto={"/signup"}>
                   Learn More
              </CTAButton>
              
            </div>

          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
        
      </div>

      {/* section 3 */}

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">


        {/* Become a instructor section */}
        <InstructorSection/>
        
        {/* Reviws from Other Learner */}
        <h2 className="text-center text-4xl font-semibold mt-8">Reviews from other learners</h2>

        {/* Review slidere here */}

      </div>


      {/* footer */}
      <Footer/>


    </div>
  )
}

export default Home
