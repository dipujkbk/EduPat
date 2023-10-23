const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//create rating and review
exports.createRating = async (rew, res) =>{
    try {
        
        //get userid
        const userId = req.user.id; 
        //fetch data
        const {rating, review, courseId} = req.body;
        //validation check user has enrolled the course or not
        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: {$eleMatch: {$eq: userId}}
            }
        );
        /*
        if(!courseDetails.studentsEnrolled.includes(userId)){
            return res.status(400).json({
                success: false,
                message: "You are not allowed to review this course"
            })
        }
        */

        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "student is not enrolled in the course"
            })
        }
        //check if user has already reviewd this course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        });

        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: "Course is already reviewed by the user"
            })
        }

        //create rating and review

        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            user: userId,
            course: courseId
        })
        //update the course with this rating
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push: {
                    ratingAndReviews : ratingReview._id
                }
            }, 
            {new: true}
            )

        console.log(updatedCourseDetails);
        //return resopnse
        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully",
            ratingReview
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "something went wrong, while creating the rating and review"
        })
        
    }
}




//get average rating
exports.getAverageRating = async (req, res)=>{
    try {

        //get courseId
        const {courseId} = req.body;
        //calculate average rating


        const result  = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating"},
                }
            }
        ])
        //return rating
        if(result.length > 0 ){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        //if no rating/review exist
        return res.status(200).json({
            success: true,
            message: "Average rating is 0 , no ratings given till now",
            averageRating: 0,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}



//get all ratingsand reviews
exports.getAllRatings = async(req, res) => {
    try {

        const allReviews = await RatingAndReview.find({})
                                .sort({rating: "desc"})
                                .populate(
                                    {
                                        path: "user",
                                        select: "firstName lastName email image", 
                                    }
                                )
                                .populate(
                                    {
                                        path: "course",
                                        select: "courseName",
                                    }
                                )
                                .exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}