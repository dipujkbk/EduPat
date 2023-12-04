import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setEditCourse, setCourse } from '../../../../slices/courseSlice';

function EditCourse() {

    const dispatch = useDispatch();
    const {courseId} = useParams();

    const {course} = useSelector( (state)=>state.course);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector(( (state)=>state.auth))

    useEffect(()=>{

        const populateCourseDetails = async() => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            if(result){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result));
            }

            setLoading(false);
            console.log("printing result", result)
            console.log("printing course, ", course)
        }

        populateCourseDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(loading){
        return (
            <div className='grid flex-1 place-items-center'>
                <div className='spinner'></div>
            </div>
        )
        
    }




  return (
    <div>

        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Course</h1>
        <div className="mx-auto max-w-[600px]">
            {
               course ? (<RenderSteps/>): (<p className="mt-14 text-center text-3xl font-semibold text-richblack-100">Course Not Found</p>)
            }
        </div>
    </div>
  )
}

export default EditCourse
