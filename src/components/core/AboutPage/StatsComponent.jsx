import React from 'react'


const Stats = [
    {
        count: "4K",
        label: "Active Students",
    },
    {
        count: "10+",
        label: "Mentors",
    },
    {
        count: "150+",
        label: "Courses",
    },
    {
        count: "40+",
        label: "Awards ",
    },
]

const StatsComponent = () => {
  return (
    <section className="bg-richblack-700">

        <div className='w-11/12 max-w-maxContent text-white mx-auto '>
            <div className='grid grid-cols-2 md:grid-cols-4 text-center'>
                {
                    Stats.map( (stat,index) => (
                        <div key={index} className='flex flex-col py-10'>
                            <h1 className="text-[30px] font-bold text-richblack-5">{stat.count}</h1>
                            <p className="font-semibold text-[16px] text-richblack-500">{stat.label}</p>
                        </div>
                    ))
                }

            </div>
        </div>

      
      
    </section>
  )
}

export default StatsComponent
