const Course = require("../models/Course");
const Category =  require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");




//createCourse handler function
exports.createCourse = async (req, res)=>{

    try {
        //fetch data
        let {courseName, courseDescription, whatYouWillLearn, price, category,status,tag:_tag,
			instructions:_instructions,} = req.body;

        //get thumbnail
        const thumbnail  = req.files.thumbnailImage;

        // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        console.log("tag", tag)
        console.log("instructions", instructions)

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tag.length || !instructions.length){
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            })
        }

        if (!status || status === undefined) {
			status = "Draft";
		}

        //Db call for instructor becz we need to insert intructor object id in course schema
        //me auth middleware lageithibi agaru, so sethire req re mu user details add karithibi, so sethu mote user ra id milijiba
        const userId = req.user.id; 
        console.log("user id-->", userId)
        const instructorDetails = await User.findById(userId, {accountType: "Instructor"});

        //TODO--> check userID and instructorDetails._id are same or different? 

        console.log("Instructor Details ", instructorDetails);

        //TODO--->eita darkar ki nahi check kara becz-->user loged in thiba mane , instructor details miliba sure
        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "instructor details not found"
            })
        }

        //check Category is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category details not found"
            })
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            price,
            whatYouWillLearn,
            instructor: instructorDetails._id,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status,
            tag,
            instructions,

        })

        //add the new course to the User(instructor) Schema courselists
        await User.findByIdAndUpdate({_id: instructorDetails._id}, 
            {$push : {courses: newCourse._id}}, 
            {new: true}
        );

        //update the CategorySchema
        await Category.findByIdAndUpdate({_id:categoryDetails._id}, {$push: {courses: newCourse._id}}, {new: true});

        //return repsonse
        return res.status(200).json({
            success: true,
            message:"New Course Created Successfully",
            data: newCourse
        })




    } catch (error) {
        // Handle any errors that occur during the creation of the course
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create new course",
            error: error.message
        })
    }
}


//Edit Course Details
exports.editCourse = async (req, res) => {

    try {
        const {courseId} = req.body 
        const updates = req.body

        const course = await Course.findById(courseId)


        if(!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        //If Thumbnail Image is found, update it
        if (req.files) {
            console.log("Thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

            course.thumbnail = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if(updates.hasOwnProperty(key)) {

                if(key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                }
                else{
                    course[key] = updates[key]
                }
            }

        }

        await course.save();

        const updatedCourse = await Course.findOne({_id: courseId})
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                }
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subsection",
                },
            })
            .exec()

            res.json({
                success: true,
                message: "Course updated successfully",
                data: updatedCourse,
            })

    } catch (error) {
        
    }
}



//getAllCourses handler function
exports.getAllCourses = async (req, res)=>{
    try {

        const allCourses = await Course.find({}, {courseName: true,
                                                price: true,
                                                instructor: true,
                                                ratingAndReviews: true,
                                                studentsEnrolled: true,
                                                thumbnail: true,}).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully ",
            data: allCourses
        })
        
    } catch (error) {
        console.log(error);
        return res.status.json({
            success: true,
            message: "Cannot fetch course Data",
            error: error.message
        })
        
    }
}

//getCourseDetails

exports.getCourseDetails = async(req, res)=>{

    try {
        //fetch course id
        const {courseId} = req.body;

        //find course detail
        const courseDetails = await Course.findById(courseId,).populate(
                                                                        {
                                                                            path: "instructor",
                                                                            populate: {
                                                                                path: "additionalDetails",
                                                                            }
                                                                        }
                                                                    )
                                                                .populate(
                                                                    {
                                                                        path: "category"
                                                                    }
                                                                )
                                                                .populate("ratingAndReviews")
                                                                .populate(
                                                                    {
                                                                        path: "courseContent",
                                                                        // Find a course and populate the "subSection" field, excluding the "videoUrl" field
                                                                        populate: {
                                                                            path: "subSection",
                                                                            select:"-videoUrl",
                                                                        }
                                                                    }
                                                                )
                                                                .exec();

        //validation
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: `Could not find the course with ${courseId}`
            })
        }

        //return response
        return res.status(200).json({
            success: true,
            message: `Course details fetched successfully`, 
            data: courseDetails
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}


//ToDo:DeleteCourse

//Get a list of Course for a given Instructor