import { useSelector } from "react-redux"
import RnderCartCourses from "./RnderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"



export default function  Cart(){

    const {totalItems} = useSelector( (state)=>state.cart)


    return (
        <div>
            <div className="mb-14 text-3xl font-medium text-richblack-5">My WishList</div>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Courses in your wishlist</p>

            {
                totalItems > 0 ? (
                    <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                        <RnderCartCourses/>
                        <RenderTotalAmount/>
                    </div>
                ) : (<p className="mt-14 text-center text-3xl text-richblack-100">Your Cart is Empty</p>)
            }
        </div>
    )

}