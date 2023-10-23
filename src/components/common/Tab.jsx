import React from 'react'
import { ACCOUNT_TYPE } from '../../utils/constants'

const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
]

function Tab({field, setField}) {
  return (
    <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max shadow-[0px_-1px_0px_rgba(255,255,255,0.18)_inset]'>

        {
            tabData.map( (tab) => (
                <button 
                key={tab.id}
                onClick={() => setField(tab.type)}
                className={`${field === tab.type ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                >{tab?.tabName}</button>
            ))
        }
      
    </div>
  )
}

export default Tab
