import React from 'react'
import { Link } from 'react-router-dom'

function Button({children, active, linkto}) {
  return (
  <Link to={linkto}>
    <div className= {`text-center text-[16px] px-6 py-3 rounded-md font-semibold
     ${active ? "bg-yellow-50 text-black shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset]" : "bg-richblack-800 shadow-[-2px_-2px_0px_0px_#FFFFFF2E_inset]"} transition-all duration-200 hover:scale-95 hover:shadow-none`}>
        {children}
    </div>
  </Link>
  )
}

export default Button
