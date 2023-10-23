import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';

function Sidebar() {

    const {user, loading: profileLoading} = useSelector( (state)=> state.profile);
    const {loading: authLoading} = useSelector( (state) => state.auth); 

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // to keep track of confirmation modal
    const [confirmationModal, setConfirmationModal] = useState(null);

    if( authLoading || profileLoading) {
        return (
        <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
            <div className="spinner"></div>
        </div>
        )
    }

    return (
        <>
            <div className='flex flex-col h-[calc(100vh-3.5rem)] min-w-[220px] border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>

                {/* tab links  */}

                <div className='flex flex-col'>
                    {
                        sidebarLinks.map( (link) => {
                            if(link.type && link.type !== user?.accountType) return null;

                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                            )
                        })
                    }

                </div>

                {/* horizonatl line */}

                <div className='my-4 h-[1px] w-10/12 bg-richblack-700 mx-auto'></div>


                {/* seetings and logout  */}

                <div className='flex flex-col'>

                    {/* settings  */}
                    <SidebarLink
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />

                    {/* log out  */}
                    <button
                        onClick={() =>
                        setConfirmationModal({
                            text1: "Are you sure?",
                            text2: "You will be logged out of your account.",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                        })
                        }
                        className="px-8 py-2 text-sm font-medium text-richblack-300"
                        >
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>
                    </button>

                </div>
            </div>

            {/* adding modal  */}

            {

                confirmationModal && <ConfirmationModal modalData={confirmationModal} />

            }

        </>
    )




}

export default Sidebar
