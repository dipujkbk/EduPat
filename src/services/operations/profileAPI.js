import { profileEndpoints } from "../apis"
import { apiConnector } from "../apiConnector"
import { logout } from "./authAPI"
import toast from "react-hot-toast"


const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API,
} = profileEndpoints


export async function getUserEnrolledCourses(token) {

    const toastId = toast.loading("Loading....");
    let result = [];
    try {
        const response  = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        })

        console.log("GET_USER_ENROLLED_COURSES_API RESPONSE ", response)
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data;
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")   
    }

    toast.dismiss(toastId);
    return result;

}