import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails,editCourseDetails,fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import {setCourse, setStep} from "../../../../../slices/courseSlice"
import {COURSE_STATUS} from "../../../../../utils/constants"

import {HiOutlineCurrencyRupee} from "react-icons/hi"

import ChipInput from './ChipInput'
import Upload from '../Upload'
import RequirementsField from "./RequirementsField"
import IconBtn from "../../../../common/IconBtn"
import { MdNavigateNext } from 'react-icons/md';


function CourseInformationForm() {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm();

    const dispatch = useDispatch();
    const {token} = useSelector( (state) => state.auth)
    const {course, editCourse} = useSelector( (state) => state.course)
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect( ()=> {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0 ){
                setCourseCategories(categories);
            }
            setLoading(false);
        }


        //if form is in edit mode-->we need to set the fields to the existing values 
        if(editCourse) {

            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // check if the form is updated or not 
    const isFormUpdated = () => {

        const currentValues = getValues()
        console.log("changes after editing form values:", currentValues)

        if(
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() || 
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseCategory._id !== course.category._id
        ) {
            return true 
        }
        return false
    }

    //   handle next button click
    const onSubmit = async (data) => {
        console.log("Course form data--->",data)

        if(editCourse) {
            
            if(isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData()
                console.log("Form data: ", data);
                console.log("current form values: ", currentValues)

                formData.append("courseId", course._id);
                if(currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory)
                }
                if (
                    currentValues.courseRequirements.toString() !==
                    course.instructions.toString()
                  ) {
                    formData.append(
                      "instructions",
                      JSON.stringify(data.courseRequirements)
                    )
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }


                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);

                if(result) {
                    dispatch(setStep(2))
                    dispatch(setCourse(result));
                }

            }
            else{
                toast.error("No Changes made to the form")
            }
            return;
        }

        const formData = new FormData();
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)

        //now send the formdata to the addcoursedetails
        setLoading(true)
        const result = await addCourseDetails(formData, token)
        if(result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }

        setLoading(false)
    }




  return (
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className=' space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6'
    >

        {/* course title  */}
        <div className="flex flex-col space-y-2">

            <label className="text-sm text-richblack-5" htmlFor='courseTitle'>
                Course Title <sup className="text-pink-200">*</sup>
            </label>

            <input id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle", {required: true})}
                className='form-style w-full'
            />

            {errors.courseTitle && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course title is required
                </span>
            )}

        </div>

        {/* course short description  */}

        <div className='flex flex-col space-y-2'>

            <label className="text-sm text-richblack-5"    htmlFor="courseShortDesc">
             Course Short Description <sup className="text-pink-200">*</sup>
            </label>

            <textarea
            id='courseShortDesc'
            placeholder='Enter Description'

            {...register("courseShortDesc", {required: true})}
            className="form-style resize-x-none min-h-[130px] w-full"
            />

            {
                errors.courseShortDesc && (
                    <span className='ml-2 text-xs text-pink-200 tracking-wide'>
                        Course Description is required
                    </span>
                )
            }

        </div>

        {/* course price  */}

        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
        </div>


        {/* course category  */}

        <div className="flex flex-col space-y-2">

            <label className="text-sm text-richblack-5" htmlFor="courseCategory">
            Course Category <sup className="text-pink-200">*</sup>
            </label>

            <select 
            id="courseCategory"
            {...register("courseCategory", {required: true})}
            defaultValue=""
            className='form-style w-full'
            >

                <option value="" disabled>
                    Choose a Category
                </option>

                {
                    !loading && courseCategories.map( (category, indx) => (
                        <option key={indx} value={category?._id}>
                            {category?.name}
                        </option>
                    ))
                }

            </select>

            {errors.courseCategory && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course Category is required
                </span>
            )}
        </div>

        {/* course tags  */}
        <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter Tags and press Comma , or Enter ↵"
            register={register}
            errors={errors}
            setValue={setValue}
        />


        {/* Course Thumbnail Image  */}

        <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData = {editCourse ? course?.thumbnail : null}
        />

        {/* Benifits of the course  */}
        <div className='flex flex-col space-y-2'>

            <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
                Benefits of the course <sup className="text-pink-200">*</sup>
            </label>

            <textarea
                id="courseBenefits"
                placeholder="Enter benefits of the course"
                {...register("courseBenefits", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full"
            />

            {errors.courseBenefits && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Benefits of the course is required
                </span>
            )}

        </div>

        {/* Requirements / Instructions  */}
        <RequirementsField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            setValue={setValue}
            errors = {errors}
            placeholder="Add Course Instructions"
        />

        {/* Next button   */}
        <div className='flex justify-end space-x-2'>
                {
                    editCourse && (
                        <button 
                            onClick={ () => dispatch(setStep(2))}
                            disabled={loading}
                            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                        >
                            Continue Without Saving

                        </button>
                    )
                }

                <IconBtn 
                    text={!editCourse ? "Next":"Save Changes"}
                    disabled={loading}
                    type={"submit"}
                >
                    <MdNavigateNext/>

                </IconBtn>

        </div>

    </form>
  )
}

export default CourseInformationForm
