import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import {FiUpload} from "react-icons/fi"

import { updateDisplayPicture } from '../../../../services/operations/settingsAPI'

function ChangeProfilePicture() {

    const {user} = useSelector( (state)=>state.profile)
    const {token} = useSelector( (state)  => state.auth)
    const dispatch = useDispatch()


    const [loading, setLoading] =useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);


    const handleFileUpload = () => {
        
    }









  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        
        <div className='flex gap-x-5 items-center'>

            {/* image  */}
            <img src={user?.image} alt={`profile-pic-of-${user?.firstName}`}
                className=' aspect-square w-[78px] rounded-full object-cover'
            />

            {/* buttons  */}
            <div className='flex flex-col gap-3'>
                <p className='text-richblack-25'>Change Profile Picture</p>

                <div className='flex gap-3'>
                    {/* <IconBtn text={"Change"}/>

                    <button className={`flex items-center cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-50 bg-richblack-700 border border-yellow-50 hover:scale-95 transition-all duration-200`}>
                        Remove
                    </button> */}

                    <input
                        type='file'
                        className='hidden'
                        accept='image/png, image/gif, image/jpeg, image/jpg'
                    />

                    <button
                        className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
                        >
                        Select 
                    </button>

                    <IconBtn 
                        text={loading ? "Uploading" : "Upload"}
                        >
                            {!loading && (<FiUpload className="text-lg text-richblack-900"/>)}
                    </IconBtn>

                </div>
            </div>
            

        </div>
      
    </div>
  )
}

export default ChangeProfilePicture
