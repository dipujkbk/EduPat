import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

function Dashboard() {

    const {loading : authLoading} = useSelector( (state) => state.auth); /**is a destructuring assignment. It's extracting the loading property from the state.auth object and assigning it to a new variable named authLoading. */
    const {loading : profileLoading} = useSelector( (state) => state.profile);


    if( authLoading || profileLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }


  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        {/* <Sidebar/> */}
        <Sidebar/> 

        <div className='h-[calc(100vh-3.5rem)] overflow-auto flex-1'>

            <div className='mx-auto w-11/12 py-10 max-w-[1000px]'>
                <Outlet/>
            </div>
            
        </div>


      
    </div>
  )
}

export default Dashboard
