const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course")
const { uploadImageToCloudinary } = require("../utils/imageUploader");


// Method for updating a profile
exports.updateProfile = async (req, res) =>{
    try {
        
        //fetch data
        const {dateOfBirth="", about="", contactNumber="", gender="", firstName ="",lastName =""} = req.body;
        //user_id fetch from req due to the middleware authentiction
        const id = req.user.id;
        //validation

        // if(!contactNumber || !gender){
        //     return res.status(400).json({
        //         success: false,
        //         message: "All fields are required"
        //     })
        // }

        //find profileid
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        //update profile

        // const updatedProfile = await Profile.findByIdAndUpdate(profileId, {gender, dateOfBirth, about, contactNumber}, {new: true})

        const profileDetails = await Profile.findById(profileId);
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;

        // Save the updated profile
        await profileDetails.save();

        //update the firstName and lastName if it is not empty
        if(firstName && lastName){
          userDetails.firstName = firstName;
          userDetails.lastName = lastName;

          //save the updated user
          await userDetails.save();
        }
        
        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();

        //return response
        return res.status(200).json({
            success: true,
            message: "Profile Updated successfully",
            updatedUserDetails
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong, profile can't be updated , plz try again",
            error: error.message  
        })
        
    }
}

//DeleteAccount handler
//Exlore-->how can we schedule this deletion operation
// const job = schedule.scheduleJob("10 * * * * *", function () {
// 	console.log("The answer to life, the universe, and everything!");
// });
// console.log(job);
exports.deleteAccount = async(req, res)=>{
    try {
        //get id
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        // Delete Assosiated Profile with the User
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});

        //unenroll user from enrolled students
        for( const courseId of userDetails.courses) {

          await Course.findByIdAndUpdate(courseId, { $pull: {studentsEnrolled: id} }, {new: true})
        }

        //delete user
        await User.findByIdAndDelete({_id: id});

        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
            
        })

        // await CourseProgress.deleteMany({ userId: id })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "User can't be Deleted",
            error: error.message   
        })
        
    }
}


exports.getUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
      .populate("courses")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

//TODO-->updateDisplayPicture,getEnrolledCourses
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      //remove password from the fetched document becz we are sending this document in the response
      updatedProfile.password = undefined;
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
      .populate({
        path: "courses", 
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userId}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

//instructor dashboard
exports.instructorDashboard = async (req, res) => {

  try {
    
    const allCoursesArray = await Course.find({instructor: req.user.id}); //finding all courses that has a particular instructor

    const courseData = allCoursesArray.map( (course)=> {
      
      const totalStudentsEnrolled = course.studentsEnrolled.length();

      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats;
    })


    res.status(200).json({ 
      success: true,
      courses: courseData 
    })
  } catch (error) {

    console.error(error)
    res.status(500).json({ message: "Server Error" })
  
  }
}