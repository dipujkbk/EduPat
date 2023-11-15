import React from 'react'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md"
import { useState } from 'react'
import { useEffect } from 'react'

function ChipInput({
    //props to be passed to the component
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    
}) {

    const {course, editCourse} = useSelector( (state)=> state.course)
    
    //setting up state for managing chips array
    const [chips, setChips] = useState([])


    useEffect( ()=> {
        if(editCourse) {
            setChips(course?.tag)
        }
        register(name, {required: true, validate: (value)=> value.length > 0})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect( ()=> {
        setValue(name, chips)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chips])


    //function to handle deletion of a chip
    const handleDeleteChip = (chipIndex) => {
        // Filter the chips array to remove the chip with the given index
        const newChips = chips.filter( (_, index) =>  index !== chipIndex)
        setChips(newChips);
    }

    // Function to handle user input when chips are added
    const handleKeyDown = (event) => {

        //check if user has pressed "Enter" or ","
        if(event.key === "Enter" || event.key === ",") {

            //Prevent the default behaviour of the event
            event.preventDefault();

            //get the input value and remove any leading/trailing spaces

            const chipValue = event.target.value.trim();

            //check if the input value exists and is not already in the chips array
            if(chipValue && !chips.includes(chipValue)){
                //Add the chip to the array and clear the input
                const newChips = [...chips, chipValue];
                setChips(newChips);
                event.target.value ="";
            }
        }
    }

   
  return (

    <div>

        {/* render the label for the input  */}
        <label className='text-sm text-richblack-5' htmlFor={name}>
            {label} <sup className="text-pink-200">*</sup>
        </label>

        {/* render the chips and input */}

        <div className='flex w-full flex-wrap gap-y-2'>
            {/* map over the chips array and render each chip  */}
            {
                chips.map( (chip, index) => (
                    <div key={index} className='m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'>

                        {/* Render the chip value */}
                        {chip}

                        {/* Render the button to delete the chip */}
                        <button type='button'
                            className='ml-2 focus:outline-none'
                            onClick={ ()=> handleDeleteChip(index)}
                        >
                            <MdClose className="text-sm"/>

                        </button>

                    </div>
                ))
            }

            {/* render the input for adding new chips  */}
            <input
            id={name}
            name={name}
            type='text'
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className='form-style w-full'
            />

        </div>

        {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
        )}
      
    </div>

  )
}

export default ChipInput
