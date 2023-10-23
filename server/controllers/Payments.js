const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender")
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");

const crypto = require("crypto");


//capture the payment and initiate the Razorpay order

exports.capturePayment = async (req, res)=>{
    //fetch courseId and userId
    const {course_id} = req.body;
    const userId = req.user.id; //auth middleware lagithiba naa, sethipaiin req.user ru id milijiba
    //validation
    //valid courseId
    if(!course_id){
        return res.json({
            success: false,
            message: "please provide valid course id"
        })
    };

    //valid courseDetail
    let course;
    try {
        course = await Course.findById(course_id);
        if(!course) {
            return res.json({
                success: false,
                message: "Could not find the course"
            })
        }
        //check user already pay for the same course or not

        //userid is in string format-->convert this into objectid for seacrhinh in enrolled students of course
        const uid = new mongoose.Schema.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success: false,
                message: 'Student is already enrolled'
            });
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount*100,
        currency,
        receipt: (Math.random()+Date.now()).toString(), //to get the unique number
        notes:{
            courseId: course_id,
            userId,
        }
    }

    try {
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        //return response
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Could not initiate the order"
        });

        
    }
    

}

//verify Signature of Razorpay and server
exports.verifySignature = async(req, res)=>{
    
    //this is the secret key of my server
    const webhookSecret = "12345678";

    //razorpay raa signature req raa header re input asithiba with the key "x-razorpay-signature"
    const signature = req.headers("x-razorpay-signature"); //razorpay deithiba security key is in kind of hashed form

    //we can't decrypt the hashed form to the original form, that's why we can do the same procees with my webhooksceret to get the hashed form and then compare
    
    //createHmac-->(hashingAlgorthim used, secret key)
    const shasum = crypto.createHmac('sha256', webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    //now match the digest and signature
    if(signature === digest){
        console.log("Payment is authorized ");

        //Always do action after verfying the signature
        //now we will do action-->enroll the student into the course ,add the course to students course aray
        //we will need userid, courseid,-->where can we get?---->from the notes-->as this api hit is done by razorpay, so we can get it from the req by razorpay

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try {
            //fulfil the action

            //find the course and enroll the student in it
            const enrolledCourse = await Course.findByIdAndUpdate(courseId, 
                                                                  {$push: {studentsEnrolled: userId}},
                                                                  {new: true});

            if(!enrolledCourse){
                return res.status(500).jon({
                    success : false,
                    message: "course not found",
                })
            }
            console.log(enrolledCourse);

            //find the student and add the course to their listof enrolled course
            const enrolledStudent = await User.findByIdAndUpdate(userId, {$push: {courses: courseId}}, {new: true});
            console.log(enrolledStudent);


            //send confirmation mail
            const emailResponse = await mailSender(
                                                    enrolledStudent.email,
                                                    "Congratulations From EduPat",
                                                    "You are onboarded into new EduPat Course",

            )

            console.log(emailResponse);
             
            return res.status(200).json({
                success: true,
                message: "Signature verified and course added"
            });


        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            });
            
        }

    }
    else{
        return res.status(400).json({
            success: false,
            message: "Invalid signature"
        });

    }


}

