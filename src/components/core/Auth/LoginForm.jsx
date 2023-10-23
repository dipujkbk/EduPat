import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import { useDispatch } from 'react-redux'
import { login } from '../../../services/operations/authAPI'


function LoginForm() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false);


  //handle function on change
  const handleOnChange = (e) => {
    
    setFormData( (prev) => {
      return {...prev, 
      [e.target.name] : e.target.value,
      }
    })
  }

  //handle function on submit
  const handleOnSubmit = (e) => {

    e.preventDefault();
    dispatch(login(formData.email, formData.password, navigate))
  }

  return (
    <div>

      {/* form  */}
      <form className='mt-6 flex w-full flex-col gap-y-4'
        onSubmit={handleOnSubmit}>
        
        <label className='w-full'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className="text-pink-200">*</sup></p>
            
            <input
              required
              type='email'
              name='email'
              value={formData.email}
              placeholder='Enter your email'
              onChange={handleOnChange}
              className='w-full rounded-lg bg-richblack-800 p-[12px] text-richblack-5 shadow-[0px_-1px_0px_rgba(255,255,255,0.18)_inset]'
            />
        </label>

        <label className='relative'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Password <sup className="text-pink-200">*</sup></p>
            
            <input
              required
              type= {`${showPassword ? "text": "password"}`}
              name='password'
              value={formData.password}
              placeholder='Enter your password'
              onChange={handleOnChange}
              className='w-full rounded-lg bg-richblack-800 p-[12px] text-richblack-5 shadow-[0px_-1px_0px_rgba(255,255,255,0.18)_inset]'
            />

            <span className='absolute right-3 top-[38px] cursor-pointer' onClick={ () => setShowPassword( (prev) => !prev)}>
              {
                showPassword ? (
                  <AiOutlineEyeInvisible size={24} fill="#AFB2BF" />
                ) : (<AiOutlineEye size={24} fill="#AFB2BF"/>)
              }
            </span>

            <Link to="/forgot-password">
              <p className='mt-1 ml-auto text-blue-100 text-xs max-w-max'>
                Forgot Password
              </p>
            </Link>
        </label>

        <button type='submit'
          className='mt-6 rounded-lg bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900'
          >
          Sign In
        </button>

      </form>
      
    </div>
  )
}

export default LoginForm
