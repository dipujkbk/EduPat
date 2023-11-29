import React from 'react'
import { FaCheck } from "react-icons/fa"
import { useSelector } from 'react-redux'

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse/Publish"

function RenderSteps() {

    const {step} = useSelector( (state) => state.course);

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },

        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        },
    ]


  return (
    <>

        {/* form progressbar  */}
        <div className='relative mb-2 flex w-full justify-center'>
            

            {steps.map( (item,index) => (
                <>
                {/* button  */}

                <div className="flex flex-col items-center "  key={item.id}>

                    <div className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}>

                        {
                            step > item.id ? (
                                <FaCheck className="font-bold text-richblack-900"/>
                            ) : (
                                item.id
                            )
                        }
                         
                    </div>



                </div>

                {/* dashed  */}

                {
                    item.id !== steps.length && (
                        <div className={`h-[17px] w-[33%] border-b-2 border-dashed ${ step > item.id ? "border-yellow-50" : "border-richblack-500"}`} key={index}></div>
                    )
                }
                
                </>
            ))
            }

        </div>

        {/* title of progress bar */}

        <div className='relative mb-16 flex w-full select-none justify-between'>
            {
                steps.map( (item) => (
                    <div key={item.id} className='flex min-w-[130px] flex-col items-center gap-y-2'>
                        
                        <p className={`text-sm ${step >= item.id ? "text-richblack-5": "text-richblack-500"}`}>
                            {item.title}
                        </p>
                        
                    </div>
                ))
            }

        </div>

        {/* Render Specific component based on the curren step  */}
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}


    </>
  )
}

export default RenderSteps
