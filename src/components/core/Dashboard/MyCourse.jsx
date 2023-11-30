import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyCourse = () => {

    const {token} = useSelector( (state)=>state.auth)
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect( () => {
        
    }, [courses])
  return (
    <div>
      
    </div>
  )
}

export default MyCourse
