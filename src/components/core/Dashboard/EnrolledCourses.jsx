import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';

function EnrolledCourses() {

  const {token} = useSelector( (state)=> state.auth)
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response  = await getUserEnrolledCourses(token)
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch Enrolled courses")
    }
  }

  useEffect( () => {
    getEnrolledCourses();
  }, []);

  return (
    <div className='text-white'>
      
      <div>Enrolled Courses</div>
      {
        !enrolledCourses ? (<div className='spinner'></div>) : !enrolledCourses.length ? (<div>You have not enrolled in any courses</div>) : (
          <div>
            <div>
              <p>Course Name</p>
              <p>Duration</p>
              <p>Progress</p>
            </div>

            {/* cards  */}

            {
              enrolledCourses.map( (course, i) => (
                <div key={i}>

                  {/* image and name  */}

                  <div>
                    <img src={course.thumbnail} alt={`${course.courseName}'s thumbnail`} />

                    <div>
                      <p>{course.courseName}</p>
                      <p>{course.courseDescription}</p>
                    </div>
                  </div>

                  {/* duration  */}
                  <div>
                    {course?.totalDuration}
                  </div>

                  {/* progress  */}

                  <div>
                    <p>Progress: {course.progressPercentage || 0}%</p>
                    <ProgressBar completed={course.progressPercentage}/>
                  </div>



                </div>

              ))
            }
          </div>
        )
      }


    </div>
  )
}

export default EnrolledCourses
