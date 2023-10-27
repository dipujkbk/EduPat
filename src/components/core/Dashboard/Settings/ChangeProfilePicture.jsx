import React, { useEffect, useRef, useState } from 'react'
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

    /**const fileInputRef = useRef(null): This line declares a fileInputRef using the useRef hook. This ref will be used to reference a file input element in the component. Initially, it's set to null.

    const handleClick = () => { fileInputRef.current.click() }: This code defines a function called handleClick. When this function is called, it programmatically clicks (or triggers a click event on) the file input element referred to by fileInputRef. This is a common technique used when you want to trigger a file input dialog to open when some other element, like a button, is clicked. 

    when the button is clicked, it triggers a click event on the hidden file input element, effectively opening the file selection dialog. This allows users to select a file from their device when they click the button without needing to interact directly with the file input element.
    */

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("image file ", file)

        if(file) {
            setImageFile(file);
            previewFile(file);
        }
    }


    /**it creates a new FileReader object named reader. The FileReader object is used to read the contents of a file asynchronously.

    It then uses the readAsDataURL method of the reader object to read the content of the file as a data URL. This will convert the file's contents into a Base64-encoded string that can be used to display the image.

    After initiating the reading of the file, the code sets up an onloadend event handler for the reader object. This event handler will be called when the reading operation is completed.

    Inside the onloadend event handler, it sets the result of the reader (the data URL) to a state variable called previewSource using the setPreviewSource function.

    The onloadend event handler is set for the FileReader object reader. When the reading operation of the file (specified by the reader.readAsDataURL(file) line) is completed, this event handler is called.

    Inside the event handler, setPreviewSource(reader.result) is called. This line updates a state variable (likely in a React component) with the result of the reading operation. In this case, reader.result contains the data URL of the file, which is the result of reading the file's contents.

    So, onloadend is used in this context to ensure that the state is updated with the data URL of the file after the file has been successfully read by the FileReader object.
    */
    
    const previewFile = (file) => {

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }


    const handleFileUpload = () => {

        if(imageFile) {

            try {
                console.log("Uploading");
                setLoading(true);
                const formData = new FormData();
                formData.append("displayPicture", imageFile);
                console.log("Formdata -->", formData)
                dispatch(updateDisplayPicture(token, formData));
    
                setLoading(false)
                setImageFile(null);
    
            } catch (error) {
    
                console.log("Error message in handlefileupload --> ", error.message)
                
            }

        }
        
    }

    useEffect( ()=> {
        if(imageFile) {
            previewFile(imageFile)
        }
    }, [imageFile]);



  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        
        <div className='flex gap-x-5 items-center'>

            {/* image  */}
            <img src={ previewSource || user?.image} alt={`profile-pic-of-${user?.firstName}`}
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
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />

                    <button
                        className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
                        disabled={loading}
                        onClick={handleClick}
                        
                        >
                        Select 
                    </button>

                    <IconBtn 
                        text={loading ? "Uploading" : "Upload"}
                        onclick={handleFileUpload}
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
