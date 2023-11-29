import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";

const {
    COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints


// fetching the available course categories
export const fetchCourseCategories = async () => {
    let result = [];

    try {
        
        const response  = await apiConnector("GET", COURSE_CATEGORIES_API);
        console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
        if(!response?.data?.success) {
            throw new Error("Could not fetch course categories")

        }
        result = response.data.allCategories;

    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
        
    }
    return result;

}

//add the course details
export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try {
        
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type" : "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("CREATE COURSE API RESPONSE........",response)

        if(!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }

        toast.success("Course Details Added Successfully")
        result = response?.data?.data 


    } catch (error) {

        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
        
    }

    toast.dismiss(toastId)
    return result

}

//edit the course Details
export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")

    try {

        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            contentType: "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        
        console.log("EDIT COURSE API RESPONSE............", response)

        if(!response?.data?.success) {
            throw new Error("Could Not Edit the Course Details")
        }
        toast.success("Course Edited Successfully")
        result = response?.data?.data;
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//create section 
export const createSection = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result=null;

    try {
        const response  = await apiConnector("POST", CREATE_SECTION_API, data, {
            contentType: "multipart/form-data",
            Authorization: `Bearer ${token}`}
            
        )

        console.log("CREATE SECTION API RESPONSE............", response)

        if(!response?.data?.success){
            throw new Error("Could not create the Section")
        }

        toast.success("Section Created Successfully")
        result= response?.data?.data
        

    } catch (error) {
        console.log("CREATE SECTION API ERROR............", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId);
    return result;
}

//create subsection
export const createSubSection = async (data, token) => {

    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })

        console.log("CREATE SUB-SECTION API RESPONSE............", response)

        if(!response?.data?.success){
            throw new Error("Could Not Add Lecture")
        }

        toast.success("Lecture Added")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;

}

//update a section
export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading");
    try {
        
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        })


        console.log("UPDATE SECTION API RESPONSE.....", response)

        if(!response?.data?.success) {
            throw new Error("Could not update the section")
        }

        toast.success("Section updated successfully");
        result = response?.data?.data
    } catch (error) {
        toast.error("Could not update the section")
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//update a subsection
export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE SUB-SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Update Lecture")
        }
        toast.success("Lecture Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}

// delete a section
export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", DELETE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Section")
      }
      toast.success("Course Section Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


//delete a subsection
export const deleteSubSection = async (data,token) => {

    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Lecture")
      }
      toast.success("Lecture Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result 
}
