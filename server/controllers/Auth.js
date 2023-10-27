const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile")
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();



// Send OTP For Email Verification
exports.sendOTP = async(req, res)=>{

    try {

        // fetch email from req ki body
        const {email} = req.body;

        //check if user already exist -->// to be used in case of signup
        const checkUserExist = await User.findOne({email});
        if(checkUserExist){
            // Return 401 Unauthorized status code with error message

            return res.status(401).json({
                success: false,
                message: "User is already registered"
            })
        }

        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false, 
            lowerCaseAlphabets: false, 
            specialChars: false
        });
        console.log("OTP generated from otpGenerator: ", otp);

        //check unique otp is not
        let result = await OTP.findOne({otp: otp});
		console.log("Result from OTP database ", result);

        while(result) {

            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false, 
                lowerCaseAlphabets: false, 
                specialChars: false
            });

            result = await OTP.findOne({otp: otp});

        }


        const otpPayload = {email, otp};
        
        //create an entry in DB for OTP-->prehook call jaithiba and otp send heithiba
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP inserted ", otpBody);

        //return response
        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        })
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.emssage
        })
        
    }

    
    

}

// Signup Controller for Registering USers

exports.signUp = async(req, res)=>{

    try {
        
        //data fetch from req ki body-->// Destructure fields from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
        } = req.body;
        //validate karo
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {

            return res.status(403).json({
                success: false,
                message: "All fields are required "
            })
        }

        // Check if password and confirm password match

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and ConfirmPassword  don't match, please try again "
            })
        }


        //check if user already exist or not

        const exsitingUser = await User.findOne({email});
        if(exsitingUser){
                //if user already exist , then return a response
    
            return res.status(400).json({
                    success: false,
                    message: "User is already registered"
            })
        }

        //find the most recent otp stored for the user in DB
        const response = await OTP.find({email}).sort({createdAt: -1}).limit(1); //it will sort in descending order of created time and limit(1) means gote document output re miliba
        console.log("Recent OTP response ", response);

        //validate OTP-->it will return an array
        if(response.length === 0) {
            //OTP Not found for the email
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            })
        } else if(otp !== response[0].otp) {
            //Invalid Otp
            return res.status(400).json({
                success:false,
                message: "The OTP is not valid",
            })
        }

        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        //entry create in DB

        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber:null
        })


        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`
        })

        //return res
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "User can't  be registered ,please try again ",
        })
        
    }
}

// Login controller for authenticating users
exports.login = async(req, res) =>{

    try {
        // Get email and password from request body
        const{email, password} = req.body;

        //validation data
        // Check if email or password is missing
        if(!email || !password){
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: 'All feilds are required, please try again',
            })
        }

        // Find user with provided email
        const user = await User.findOne({email}).populate("additionalDetails");
        
        if(!user){
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: 'User is not registered, please signUp'
            })
        }
        //generate JWT, after matching password
        if(await bcrypt.compare(password, user.password)){

            //creating payload for the token
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });
            // add token to user document in the fetched document
            //now insert token into the user and remove password 
            user.token = token;
            user.password = undefined;

            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }
            res.cookie("tokenCookie", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            })

        }

        else{
            return res.status(401).json({
                success: false,
                message: "Password is incorrect "
            })
        }
    } catch (error) {
        console.log(error);
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: "Login failure, please try again"
        })
        
    }

};


// Controller for Changing Password
exports.changePassword = async(req, res)=>{
    try {
        //fetch ,oldpassword, newPassword, confirmNewPassword from req ki body
        const { oldPassword, newPassword, confirmPassword} = req.body;
        
        //validation
        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Please fill all fields and try again"
            })
        }

        // Get user data from req.user
		const user = await User.findById(req.user.id);

        // Validate old password
        if(! await bcrypt.compare(oldPassword, user.password)){
            // If old password does not match, return a 401 (Unauthorized) error
            return res.status(401).json({
                success: false,
                message: "The password is incorrect"
            })
        }

        if(newPassword !== confirmPassword){
            // If new password and confirm new password do not match, return a 400 (Bad Request) error
            return res.status(400).json({
                success: false,
                message: "new password and current password don't match"
            })
        }

        //hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //update pwd in DB
        const updatedDetails = await User.findByIdAndUpdate(req.user.id, {password: hashedPassword}, {new: true});
        
        
		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedDetails.email,
                "Pasword Changed",
				passwordUpdated(
					updatedDetails.email,
					`Password updated successfully for ${updatedDetails.firstName} ${updatedDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}  




        //return response
        return res.status(200).json({
            success: true,
            // updatedDetails,
            message: "Password updated successfully"
        })
    } catch (error) {
        console.log(error);
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        return res.status(400).json({
            success: false,
            message: "Error occurred while updating password",
			error: error.message,
        })
        
    }
} 