import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CountryCode from "../../../../data/countrycode.json"

import { updateProfile } from '../../../../services/operations/settingsAPI'
import IconBtn from '../../../common/IconBtn'

const genders = ["Male", "Female", "Non-Binary", "Other", "Prefer not to say"]

function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  const submitProfileForm = async (data) => {
    data.contactNumber = data.countrycode + data.contactNumber;
    delete data.countrycode
    console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>

        {/* profile information */}
        <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
          <h2 className="text-lg font-semibold text-richblack-5">Profile Information</h2>

          {/* first Name and last Name  */}

          <div className="flex flex-col gap-5 lg:flex-row">

            {/* first name  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">

              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>

              <input type="text"
                name='firstName'
                id='firstName'
                placeholder='Enter first name'
                className='form-style'
                defaultValue={user?.firstName}
                {...register("firstName", {required: true})}
              />

              {
                errors.firstName && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>Please enter your first name</span>
                )
              }
            </div>

            {/* last name  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">

              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>

              <input type="text"
                name='lastName'
                id='lastName'
                placeholder='Enter last name'
                className='form-style'
                defaultValue={user?.lastName}
                {...register("lastName", {required: true})}
              />

              {
                errors.lastName && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>Please enter your last name</span>
                )
              }
            </div>

          </div>

          {/* date of birth and gender */}

          <div className="flex flex-col gap-5 lg:flex-row">

              {/* dob  */}
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="dateOfBirth" className='lable-style'>
                  Date of Birth
                </label>

                <input type="date"
                name='dateOfBirth'
                id='dateOfBirth'
                className='form-style'
                {...register("dateOfBirth", {
                    required: {
                      value: true,
                      message: "Please enter your Date of Birth.",
                    },

                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Date of Birth cannot be in the future.",
                    },


                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
                />

                {
                  errors.dateOfBirth && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.dateOfBirth.message}
                    </span>
                  )
                }

              </div>

              {/* gender  */}
              <div className="flex flex-col gap-2 lg:w-[48%]">

                <label htmlFor="gender" className="lable-style">
                  Gender
                </label>

                <select 
                  name="gender" 
                  id="gender" 
                  type="text"
                  className='form-style'
                  {...register("gender", {required: true})}
                  defaultValue={user?.additionalDetails?.gender}
                >

                  {
                    genders.map( (ele, i) => {
                      return (
                        <option key={i} value={ele}>{ele}</option>
                      )
                    })
                  }
                </select>

                {errors.gender && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                  Please select your gender.
                </span>
                )}
              </div>

          </div>

          {/* contact number and about  */}

          <div className="flex flex-col gap-5 lg:flex-row">


            {/* contact number  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>

              <div className='flex gap-2'>
                <select name="dropdown" id="dropdown"
                className="form-style w-[81px]"
                {...register("countrycode", {required: true})}
                >
                    {
                        CountryCode.map( (ele, i) => (
                            <option key={i} value={ele.code}>
                                {ele.code} -{ele.country}
                            </option>
                        ))
                    }

                </select>

                <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                  <input
                      type='tel'
                      name='contactNumber'
                      id='contactNumber'
                      placeholder='12345 67890'
                      className="form-style"

                      {...register("contactNumber", {
                          required: {
                              value: true,
                              message: "Please enter your Phone number"
                          },
                          maxLength: { value: 12, message: "Invalid Phone Number" },
                          minLength: { value: 10, message: "Invalid Phone Number" },
                      })}
                    defaultValue={user?.additionalDetails?.contactNumber}
                  />

                  {errors.contactNumber && (
                      <span className="-mt-1 text-[12px] text-yellow-100">
                          {errors.contactNumber.message}
                      </span>
                  )}
                </div>
              </div>
              
            </div>

            {/* about  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>

          </div>

          {/* button  */}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                navigate("/dashboard/my-profile")
              }}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Cancel
            </button>
            <IconBtn type="submit" text="Save" />
          </div>

        </div>

      </form>

    
    </>
  )
}

export default EditProfile
