import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"


import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from '../../common/Tab'
import { setSignupData } from '../../../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { sendOtp } from '../../../services/operations/authAPI'



function SignupForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  //student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName : "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {firstName, lastName, email, password, confirmPassword } = formData


  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData( (prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value,
      }
    ))

  }

  // Handle Form submission
  const handleOnSubmit = (event) => {

    event.preventDefault();

    if(password !== confirmPassword) {
      toast.error("Passwords Do Not Match!!")
      return;
    }

    const signupData = {...formData, accountType,}

    //setting signup data to state 
    //To be used after OTP verification

    dispatch(setSignupData(signupData));

    //send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    //reset the formdata
    setFormData({
      firstName:"",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT);
    
  }

  return (
    <div>
      
      {/* Tab  */}
      <Tab setField={setAccountType} field={accountType}/>

      {/* form  */}

      <form className='flex flex-col w-full gap-y-4'
        onSubmit={handleOnSubmit}
        >

        {/* firstname and lastname */}
        <div className='flex gap-x-4'>

          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name <sup className="text-pink-200">*</sup></p>
            
            <input
            required
            type='text'
            name='firstName'
            value={firstName}
            placeholder='Enter first name'
            onChange={handleOnChange}
            className='w-full rounded-lg bg-richblack-800 p-[12px] text-richblack-5 shadow-[0px_-1px_0px_rgba(255,255,255,0.18)_inset]'
            />

          </label>


          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name <sup className="text-pink-200">*</sup></p>
            
            <input
            required
            type='text'
            name='lastName'
            value={lastName}
            placeholder='Enter last name'
            onChange={handleOnChange}
            className='w-full rounded-lg bg-richblack-800 p-[12px] text-richblack-5 shadow-[0px_-1px_0px_rgba(255,255,255,0.18)_inset]'
            />
            
          </label>


        </div>

        {/* email address  */}
        <div>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className='text-pink-200'>*</sup>
            </p>

            <input
            required
            name='email'
            value={email}
            placeholder='Enter email address'
            onChange={handleOnChange}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
          </label>
        </div>


        {/* create password and confirm password  */}
        <div className="flex gap-x-4">

          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className='relative'>

            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password <sup className='text-pink-200'>*</sup></p>
            <input
            required
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleOnChange}
            type={`${showConfirmPassword ? "text" : "password"}`}
            placeholder='Enter Password'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />

            <span onClick={()=> setShowConfirmPassword((prev) => !prev)}
            className='absolute right-3 top-[38px] cursor-pointer'>
              {
                showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                ) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
              }
            </span>


          </label>

        </div>

        
        <button type='submit'
          className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset] transition-all duration-200 hover:scale-95 hover:shadow-none'
          >
          Create Account
        </button>

      </form>



      
    </div>
  )
}

export default SignupForm
