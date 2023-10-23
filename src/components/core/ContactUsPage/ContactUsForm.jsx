import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {apiConnector} from "../../../services/apiConnector"
import { contactusEndpoint } from '../../../services/apis';
import CountryCode from "../../../data/countrycode.json"

function ContactUsForm() {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState : {errors, isSubmitSuccessful}
    } = useForm();


    const submitContactForm = async(data) => {
        console.log("Logging form data in contact us: ", data);

        try {
            setLoading(true);
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
            console.log("Response from contact us api ", response);
            setLoading(false)
        } catch (error) {
            console.log("Error: ", error.message);
            setLoading(false);
        }

    }

    useEffect( ()=> {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
            })
        }
    }, [reset, isSubmitSuccessful])


  return (
   <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-7'>

    <div className='flex flex-col gap-5 lg:flex-row'>
        {/* first name  */}
        <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label htmlFor="firstName" className="lable-style">First Name</label>
            
            <input type="text"
                name='firstName'
                id='firstName'
                placeholder='Enter FirstName'
                className="form-style"
                {...register("firstName", {required: true})}
            />

            {/* handeling error for firstname  */}
            {
                errors.firstName && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please Enter Your First Name 
                    </span>
                )
            }
        </div>

        {/* last name  */}
        <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label htmlFor="lastName" className="lable-style">Last Name</label>
            <input 
                type="text"
                placeholder='Enter LastName'
                id='lastName'
                name='lastName'
                className="form-style"
                {...register("lastName")}

            />
        </div>
    </div>

    {/* email  */}

    <div className='flex flex-col gap-2'>
        <label htmlFor="email" className="lable-style">Email Address</label>
        <input 
            type="email"
            name='email'
            id='email'
            placeholder='Enter email Address'
            className="form-style"
            {...register("email", {required:true})}
         />

         {
            errors.email && (
                <span className="-mt-1 text-[12px] text-yellow-100">Please Enter Your Address</span>
            )
         }

    </div>

    {/* phone no  */}
    <div className='flex flex-col gap-2'>

        <label htmlFor="phonenumber" className="lable-style">Phone Number</label>


        <div className='flex gap-5 w-full'>

            {/* drop down */}
        

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
            

            {/* phone number input  */}
            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                <input
                    type='number'
                    name='phonenumber'
                    id='phonenumber'
                    placeholder='12345 67890'
                    className="form-style"

                    {...register("phoneNo", {
                        required: {
                            value: true,
                            message: "Please enter your Phone number"
                        },
                        maxLength: { value: 12, message: "Invalid Phone Number" },
                        minLength: { value: 10, message: "Invalid Phone Number" },
                    })}
                />

                {errors.phoneNo && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.phoneNo.message}
                    </span>
                )}
            </div>

         



        </div>

    </div>

    {/* meassage  */}
    <div className='flex flex-col gap-2'>
        <label htmlFor="message" className="lable-style">Message</label>
        <textarea
            name='message'
            id='message'
            cols="30"
            rows="7"
            placeholder='Enter your message here!!'
            className="form-style"
            {...register("message", {required: true})}
        />

        {
            errors.message && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                    Please Enter Your Message
                </span>
            )
        }
    </div>


    {/* button  */}
    <button type='submit'
        disabled={loading}
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
        >
        Send Message
    </button>



   </form>
  )
}

export default ContactUsForm
