import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md';
import {RiDeleteBin6Line} from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx";
import {AiFillCaretDown} from "react-icons/ai"
import {FaPlus} from "react-icons/fa"

import { useDispatch, useSelector } from 'react-redux'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from "../../../../common/ConfirmationModal"
import {setCourse} from "../../../../../slices/courseSlice"

function NestedView({handleChangeEditSectionName}) {

    const {course} = useSelector( (state) => state.course)
    const {token} = useSelector( (state)=>state.auth)

    const dispatch = useDispatch();

    // States to keep track of mode of modal [add, view, edit]
    const [addSubSection, setAddSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    // to keep track of confirmation modal
    const [confirmationModal, setConfirmationModal] = useState(null)

    const handleDeleteSection = async(sectionId) => {

        const result = await deleteSection({sectionId, courseId: course._id}, token)
        
        if(result){
            dispatch(setCourse(result));
        }

        //closing the confirmation modal
        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async(subSectionId, sectionId) => {

        const result = await deleteSubSection({subSectionId, sectionId}, token);

        if(result){
            //update the course structure
            const updatedCourseContent = course.courseContent.map( (section) => 
                section._id === sectionId ? result : section
            )

            const updatedCourse = {...course, courseContent: updatedCourseContent};

            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);

    }

  return (
    <>
      
        <div className='rounded-lg bg-richblack-700 p-6 px-8' id="nestedViewContainer">

            {
                course?.courseContent?.map( (section) => (

                    //section dropdown

                    <details key={section._id} open>
                        {/* Section Dropdown Content */}
                        <summary className='flex items-center justify-between cursor-pointer border-b-2 border-richblack-600 py-2'>
                            
                            {/* drop down menu  */}
                            
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu className='text-2xl text-richblack-50'/>
                                <p className='font-semibold text-richblack-50'>{section.sectionName}</p>
                            </div>

                            {/* edit & delete button  */}

                            <div className='flex items-center gap-x-3'>

                                <button 
                                onClick={() => handleChangeEditSectionName(
                                    section._id,
                                    section.sectionName
                                )}
                                >
                                    <MdEdit className='text-xl text-richblack-300'/>
                                </button>


                                <button
                                onClick={() =>setConfirmationModal({
                                    text1: "Delete this Section?",
                                    text2: "All the lectures in this section will be deleted",

                                    btn1Text: "Delete",
                                    btn2Text: "Cancel",

                                    btn1Handler: () => handleDeleteSection(section._id),

                                    btn2Handler: ()=> setConfirmationModal(null)
                                    
                                })}
                                >
                                    <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                                </button>

                                <span className='font-medium text-richblack-300'>|</span>
                                <AiFillCaretDown className="text-xl text-richblack-300"/>


                            </div>

                        </summary>

                        

                        <div className="px-6 pb-4">
                            {/* Render All Sub Sections Within a Section */}
                            {
                                section.subSection.map( (data) => (
                                    <div key={data?._id}
                                    onClick={()=> setViewSubSection(data)}
                                    className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'
                                    >

                                        <div className="flex items-center gap-x-3 py-2 ">
                                            <RxDropdownMenu className="text-2xl text-richblack-50" />
                                            <p className="font-semibold text-richblack-50">
                                                {data.title}
                                            </p>
                                        </div>

                                        <div className='flex items-center gap-x-3'>

                                            <button
                                                onClick={ (event) => {
                                                    setEditSubSection({...data, sectionId: section._id})
                                                    event.stopPropagation(); //actually when i clicked on this cross button also setViewSubsection also triggers, to prevent this  
                                                    }}
                                            >
                                                <MdEdit className="text-xl text-richblack-300"/>
                                            </button>

                                            <button
                                                onClick={(event) =>{
                                                    event.stopPropagation();
                                                    setConfirmationModal({
                                                    text1: "Delete this Subsection?",
                                                    text2: "Selected Lecture will be deleted",
                
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                
                                                    btn2Handler: ()=> setConfirmationModal(null)
                                                    
                                                })}}
                                            >
                                                <RiDeleteBin6Line className="text-xl text-richblack-300"/>

                                            </button>

                                        </div>

                                    </div>
                                ))
                            }

                            
                            {/* Add New Lecture to Section */}

                            <button
                            onClick={ ()=> setAddSubSection(section._id)}
                            className='mt-3 flex items-center gap-x-1 text-yellow-50'
                            >
                                <FaPlus className="text-lg" />
                                <p>Add Lecture</p>
                            </button>
                        </div>

                    </details>
                ))
            }
        </div>
        {/* Modal Display */}

        {
            addSubSection ? 
            (<SubSectionModal 
                modalData={addSubSection}
                setModalData = {setAddSubSection}
                add={true}
            />) : 
            editSubSection ? 
            (<SubSectionModal
                modalData={editSubSection}
                setModalData = {setEditSubSection}
                edit={true}
            />):
            viewSubSection ? 
            (<SubSectionModal
                modalData={viewSubSection}
                setModalData = {setViewSubSection}
                view={true}
            />):
            (<></>)
            
        }

        {
            confirmationModal &&  <ConfirmationModal modalData={confirmationModal}/>
        }

    </>
  )
}

export default NestedView
