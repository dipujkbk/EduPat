import React, { useState } from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import IconBtn from '../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';

import { changePassword } from '../../../../services/operations/settingsAPI';
import { useSelector } from 'react-redux';

function UpdatePassword() {

  const [currentPasswordEye, setCurrentPasswordEye] = useState(false);
  const [newPasswordEye, setNewPasswordEye] = useState(false);

  const navigate = useNavigate();
  const {token} = useSelector( (state) => state.auth)

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword:"",
    confirmPassword:"",
  })

  const handleOnChange = (event) => {

    setFormData( (prevData) => {
      return ({
        ...prevData,
        [event.target.name]: event.target.value,
      })
    })

  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log("FormData, -->",formData);
    try {
      await changePassword(token, formData);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
    

    //reset formData
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword:"",
    })

  }


  return (
    <div className='my-10 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12'>

      <h1 className="text-lg font-semibold text-richblack-5">Password</h1>

      <form className='flex flex-col gap-y-5' onSubmit={handleOnSubmit}>

        <div className='flex flex-col gap-5 lg:flex-row'>
          <label className='relative flex flex-col gap-2 lg:w-[33%]'>
            <p className='lable-style'>Current Password <sup className=' text-pink-300'>*</sup></p>
            <input
            name='oldPassword'
            value={formData.oldPassword}
            onChange={handleOnChange}
            required
            type={`${currentPasswordEye ? "text" : "password"}`}
            placeholder='Enter Your Currrent Password'
            className='form-style'
            />

            <span className='absolute right-2 top-10 cursor-pointer' onClick={()=> setCurrentPasswordEye( (prev) => !prev)}>
              {
                !currentPasswordEye ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )
              }
            </span>
          </label>


          <label className="relative flex flex-col gap-2 lg:w-[33%]">
            <p className='lable-style'>New Password <sup className=' text-pink-300'>*</sup></p>
            <input
            name='newPassword'
            value={formData.newPassword}
            onChange={handleOnChange}
            required
            type={`${newPasswordEye ? "text" : "password"}`}
            placeholder='Enter Your New Password'
            className='form-style'
            />


            <span className='absolute right-2 top-10 cursor-pointer' onClick={()=> setNewPasswordEye( (prev) => !prev)}>
              {
                !newPasswordEye ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )
              }
            </span>
          </label>

          <label className='relative flex flex-col gap-2 lg:w-[33%]'>
            <p className='lable-style'>Confirm New Password<sup className=' text-pink-300'>*</sup></p>
            <input
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleOnChange}
            required
            type="password"
            placeholder='Enter new password again'
            className='form-style'
            />
          </label>

        </div>

        <div className="flex lg:justify-end gap-2 lg:mr-5">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>


      </form>
      
    </div>
  )
}

export default UpdatePassword
