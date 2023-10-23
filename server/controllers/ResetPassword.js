const User = require("../models/User")
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const bcrypt = require("bcrypt")


//resetPasswordToken 
exports.resetPasswordToken = async(req, res)=>{

    try {

        //get email from req ki body
        const email = req.body.email;

        //check user exist or not, eamil verifaction
        const user = await User.findOne({email:email});
        console.log("printing user ", user)
        
        if(!user){
            return res.json({
                success: false,
                message: 'Your Email is not registered with us'
            })
        }

        //generate token

        // const token = crypto.randomBytes(20).toString("hex");


        const token = crypto.randomUUID();
        //update User by adding token and expiration time
        
        const updatedDetails = await User.findOneAndUpdate({email: email}, {
                                                                                token: token,
                                                                                resetPasswordExpires: Date.now() + 5*60*1000,
                                                                        },
                                                                        {new: true}
                                                        );
        console.log("DETAILS", updatedDetails);

        //create Url

        const url = `http://localhost:3000/update-password/${token}`;
        //send mail containg the Url
        await mailSender(email, "Password Reset Link ", `Password reset Link: ${url} `);
        //return response
        return res.json({
            success: true,
            message: "Email sent successfully, please check email and change password "
        })
        
    } catch (error) {
        console.log("Error while reseting the password ",error);

        return res.json({
            success: false,
            message: "Something went wrong while sending  pwd reset link "
        })
        
    }
    
}

//resetPassword 

exports.resetPassword = async (req, res) =>{

    try {

        //data fetch
        const {password, confirmPassword, token} = req.body;
        //validation
        if(password !== confirmPassword){
            return res.json({
                success: false,
                message: "Password do not match "
            })
        }
        //get userdetails from db using token
        const userDetails = await User.findOne({token: token});
        //if no entry-->invalid token
        if(!userDetails){
            return res.json({
                success: false,
                message: "Token is Invalid"
            })
        }
        
        //token time check
        if(userDetails.resetPasswordExpires < Date.now() ){
            return res.json({
                success: false,
                message: "Token is expired , please regenrate new link"
            })

        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //password upadte in db
        await User.findOneAndUpdate({token}, {password: hashedPassword}, {new: true});
        //return response
        return res.status(200).json({
            success: true,
            message: "Password reset successfull."
        })
        
    } catch (error) {
        console.log("error while resetting pwd ",error)
        return res.json({
            success: false,
            message: "Something went wrong while reseting  pasword "
        })
        
        
    }

}