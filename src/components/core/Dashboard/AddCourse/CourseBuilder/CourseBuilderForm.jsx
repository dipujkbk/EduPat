import React from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { useState } from 'react';
import {IoAddCircleOutline} from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux';
import {MdNavigateNext} from "react-icons/md"
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse,setStep,setEditCourse } from '../../../../../slices/courseSlice';
import NestedView from "./NestedView"

function CourseBuilderForm() {

    const {register, setValue, handleSubmit, formState: {errors}} = useForm();

    const [editSectionName, setEditSectionName] = useState(null) //it will contain sectionId

    const [loading, setLoading] = useState(false)

    const{token} = useSelector( (state) => state.auth)

    const {course} = useSelector( (state) => state.course)

    const dispatch = useDispatch();
    

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");//if some name is written , as it uses form hook , so that name would be stored in that variable, so clear it
    }

    const goBack = () => {
        //step 1 ku jiba darkar-->jehetu course add karisariche ebe edit hiin karipariba course ku-->so editcourse flag ku true mark karibaku padiba
        dispatch(setStep(1));
        dispatch(setEditCourse(true));

    }

    const goToNext = () => {

        if(course.courseContent.length === 0) {
            toast.error("Please add atleast one Section")
            return;
        }
        if(course.courseContent.some( (section)=> section.subSection.length === 0)){
            toast.error("Please add atleast one lecture in each section.")
            return;
        }
        //if every thing is good
        dispatch(setStep(3));

    }

    const onSubmit = async (data) => {

        setLoading(true)
        let result;
        

        if(editSectionName) {
            //we are editing the section name
            result = await updateSection({
                sectionName : data.sectionName,
                sectionId : editSectionName,
                courseId: course._id,
            }, token)

        }
        else{
            //we are creating the section

            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            }, token)
        }


        //update the values
        if(result) {
            // section ra value change heichi so need to update the course
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }

        //loading false
        setLoading(false);

    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {

        //beahve as toggle
        if(editSectionName === sectionId) {
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

        <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>


        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

            <div className="flex flex-col space-y-2">
                <label htmlFor='sectionName' className='label-style text-sm text-richblack-5'>Section name <sup className="text-pink-200">*</sup></label>
                <input
                    id='sectionName'
                    disabled={loading}
                    placeholder='Add a section to build your course'
                    {...register("sectionName", {required: true})}
                    className='w-full form-style'

                />

                {
                    errors.sectionName && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Section Name is required</span>
                    )
                }
            </div>


            <div className='flex gap-x-4 items-end'>
                <IconBtn
                type="submit"
                disabled={loading}
                text={editSectionName ? "Edit Section Name" : "Create Section"}
                outline={true}
                customClasses={" text-yellow-50"}
                >
                    <IoAddCircleOutline className='text-yellow-50' size={20}/>

                </IconBtn>

                {
                    editSectionName && 
                    <button className='text-richblack-300 underline text-sm'
                     type='button'
                     onClick={cancelEdit}
                    >
                        Cancel Edit
                    </button>
                }
            </div>
        </form>
        
        {/* see course has sections or not , if not no need to render the nested view  */}

        {
            course.courseContent.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
            )
        }

        {/* Next Prev Button */}

        <div className='flex justify-end gap-x-3'>
            <button
            onClick={goBack}
            className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
            >
                Back
            </button>

            <IconBtn 
            text="Next"
            disabled={loading}
            onclick={goToNext}
            >
                <MdNavigateNext />

            </IconBtn>
        </div>

      
    </div>
  )
}

export default CourseBuilderForm