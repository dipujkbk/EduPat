import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function RequirementsField({
    name,
    label,
    register,
    setValue,
    errors,
    placeholder
}) {

    const {editCourse, course} = useSelector( (state)=>state.course)
    const [requirement, setRequirement] = useState('')
    const [requirementsList, setRequirementsList] = useState([])

    const handleAddRequirement = () => {

        if(requirement) {
            setRequirementsList([...requirementsList, requirement])
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirements = [...requirementsList]
        updatedRequirements.splice(index, 1)
        setRequirementsList(updatedRequirements)
    }

    useEffect( ()=> {
        if(editCourse) {
            setRequirementsList(course?.instructions)
        }

        register(name, {required: true, validate: (value) => value.length > 0 })
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect( () => {

        setValue(name, requirementsList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[requirementsList])

  return (
    <div className='flex flex-col space-y-2'>

        <label className='text-sm text-richblack-5' htmlFor={name}>

            {label} <sup className="text-pink-200">*</sup>

        </label>

        <div>
            <input 
                type='text'
                id={name}  
                value={requirement}
                placeholder={placeholder}
                onChange={(e) => setRequirement(e.target.value)}
                className='form-style w-full'  
            />
            <button 
                type='button'
                onClick={handleAddRequirement}
                className='font-semibold text-yellow-50'
            >
                Add

            </button>
        </div>


        {
            requirementsList.length > 0 && (
                <ul className='mt-2 list-disc list-inside'>
                    {
                        requirementsList.map( (requirement, index) => (
                            <li key={index} className='text-richblack-5 list-item'>
                                <span>{requirement}</span>
                                <button
                                    type="button"
                                    className="ml-2 text-xs text-pure-greys-300 "
                                    onClick={() => handleRemoveRequirement(index)}
                                >
                                    clear
                                </button>
                            </li>
                        ))
                    }

                </ul>
            ) 
        }


        {errors[name] && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
            </span>
        )}

    </div>
  )
}

export default RequirementsField
