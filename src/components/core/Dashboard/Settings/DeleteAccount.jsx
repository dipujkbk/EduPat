import React, { useState } from 'react'
import {FiTrash2} from "react-icons/fi"
import { deleteProfile } from '../../../../services/operations/settingsAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../common/ConfirmationModal';

function DeleteAccount() {
  const {token} = useSelector( (state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalData, setModalData] = useState(null);

  const handleDeleteAccount = () => {
    dispatch(deleteProfile(token, navigate));
  }

  const modalInfo = {
    text1: "Are you sure?",
    text2: "Your Account will be deleted permanently!!",
    btn1Text: "Delete",
    btn2Text: "Cancel",
    btn1Handler: handleDeleteAccount,
    btn2Handler: () => setModalData(null),
  }



  return (

    <>
      <div className='my-10 flex gap-x-5 bg-pink-900 items-center justify-between rounded-md border border-pink-800 p-8 px-12'>


        {/* icon  */}

        <div className=' rounded-full bg-pink-700 w-14 h-14 aspect-square flex items-center justify-center cursor-pointer'
        onClick={ () => setModalData(modalInfo)}
        >

          <FiTrash2 className=' text-3xl text-pink-200 '/>

        </div>

        {/* content  */}

        <div className='flex flex-col space-y-2'>
          <h2 className='font-semibold text-lg text-richblack-5'>Delete Account</h2>
          
          <div className="w-3/5 text-pink-50">
              <p>Would you like to delete account?</p>
              <p>
                This account may contain Paid Courses. Deleting your account is
                permanent and will remove all the contain associated with it.
              </p>
          </div>

          <button
            type='button'
            className='w-fit cursor-pointer italic text-pink-300'
            onClick={() => setModalData(modalInfo)}
            >
            I want to delete my account.
          </button>


        </div>
        
      </div>

      {
        modalData && <ConfirmationModal modalData={modalData}/>
      }
    </>
    
  )
}

export default DeleteAccount
