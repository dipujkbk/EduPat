import React from 'react'
import { Link } from 'react-router-dom';
import { FooterLink2 } from "../../data/footer-links";

import logo from "../../assets/Logo/Logo-Full-Light.png"

import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";


const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
  ];

const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];



const Footer = () => {
  return (
    <div className='bg-richblack-800'>

        {/* upper footer  */}
        <div className='w-11/12 max-w-maxContent text-richblack-400 mx-auto pt-14'>

            <div className='border-b border-richblack-700 w-[100%] flex flex-col lg:flex-row pb-5'>

                {/* section 1 */}

                <div className='flex lg:w-[50%] flex-wrap justify-between gap-3 lg:border-r lg:border-richblack-700 pl-3 lg:pr-2'>

                    {/* company  */}
                    <div className='w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0'>
                    
                        <img src={logo} alt='' className=' object-contain'></img>

                        <h1 className='text-richblack-50 font-semibold text-[16px]'>Company</h1>

                        {/* links */}
                        <div className='flex flex-col gap-2'>
                            {
                                ["About", "Carrers", "Affiliates"].map( (ele, index)=> (
                                <div key={index} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                        <Link to={ele.toLowerCase()}>{ele}</Link>
                                </div>  
                                ))
                            }

                        </div>

                        {/* logos */}
                        <div className='flex gap-3 text-lg'>
                            <FaFacebook />
                            <FaGoogle />
                            <FaTwitter />
                            <FaYoutube />
                        </div>
                    </div>
                    
                    {/* Resources  */}
                    <div className='w-[48%] lg:w-[30%] flex flex-col gap-5 mb-7 lg:pl-0'>

                        {/* resources */}

                        <div>
                            
                            {/* heading  */}
                            <h1 className='text-richblack-50 font-semibold text-[16px]'>Resources</h1>

                            {/* links */}
                            <div className="flex flex-col gap-2 mt-2">
                                {
                                    Resources.map( (ele, i)=> (
                                        <div key={i} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                            <Link to={ele.split(" ").join("-").toLowerCase()}>
                                                {ele}
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>

                            
                            {/* support  */}

                        
                            <h1 className='text-richblack-50 font-semibold text-[16px] mt-7'>Support</h1>

                            <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                                    <Link to={"/help-center"}>Help Center</Link>
                            </div>

                        </div>
                        
                    </div>

                    {/* plans and community  */}
                    <div className='w-[48%] lg:w-[30%] flex flex-col gap-7 mb-7 lg:pl-0'>

                        {/* plans */}

                        <div>
                            
                            {/* heading  */}
                            <h1 className='text-richblack-50 font-semibold text-[16px]'>Plans</h1>

                            {/* links */}
                            <div className="flex flex-col gap-2 mt-2">
                                {
                                    Plans.map( (ele, i)=> (
                                        <div key={i} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                            <Link to={ele.split(" ").join("-").toLowerCase()}>
                                                {ele}
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>

                        {/* community  */}

                        <div>
                            <h1 className='text-richblack-50 font-semibold text-[16px]'>Community</h1>

                            <div className="flex flex-col gap-2 mt-2">

                                {
                                        Community.map( (ele, i)=> (
                                            <div key={i} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                                <Link to={ele.split(" ").join("-").toLowerCase()}>
                                                    {ele}
                                                </Link>
                                            </div>
                                        ))
                                    }
                                
                            </div>
                        </div>

                        
                    </div>

                </div>


                {/* section 2 */}

                <div className="lg:w-[50%] flex flex-wrap justify-between pl-3 lg:pl-9 gap-3">

                    {
                        FooterLink2.map( (ele, i)=> (
                            <div key={i} className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>

                                {/* headings */}
                                <div className='text-richblack-50 font-semibold text-[16px]'>
                                    {ele.title}
                                </div>

                                {/* links */}
                                <div className="flex flex-col gap-2 mt-2">
                                    {
                                        ele.links.map( (link, i)=> (
                                            <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                                <Link to={link.link}>{link.title}</Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                

                            </div>
                        ))
                    }

                </div>


            </div>



        </div>
        

        {/* lower footer  */}

        <div className='w-11/12 max-w-maxContent text-richblack-400 text-sm mx-auto pt-5 pb-14'>

            {/* section 1 */}
            <div className='flex items-center gap-3 text-richblack-400 font-semibold flex-col lg:flex-row w-full justify-between lg:items-start'>

                <div className='flex flex-row'>

                    {
                        BottomFooter.map((ele, i) => (
                            <div key={i} className= {`text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 ${i!==BottomFooter.length-1 ? "border-r border-richblack-700" : "border-none"} px-3`}>
                                <Link to={ele.split(" ").join("-").toLowerCase()}>
                                    {ele}
                                </Link>

                            </div>
                        ))
                    }

                </div>
          
                <div className='text-center'>
                    Made with 🤎 by Priyabrat © 2023 EduPat
                </div>
                
            </div>
                 
        </div>

        
      
    </div>
  )
}

export default Footer
