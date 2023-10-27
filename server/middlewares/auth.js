const jwt = require("jsonwebtoken");
// Configuring dotenv to load environment variables from .env file
require("dotenv").config();
const User = require("../models/User")

//auth-->Authentication verify
exports.auth = async(req, res, next) =>{

    try { 
        
        // Extracting JWT from request cookies, body or header
        const token = req.cookies.tokenCookie || req.body.token || req.header("Authorization").replace("Bearer ", "");
        //if token missing
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }
        //verify the token

        try{
            // Verifying the JWT using the secret key stored in environment variables
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("token payload   ---> ", decode);
            // Storing the decoded JWT payload in the request object for further use
            req.user = decode;
        }catch(err){
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            })
        }
        // If JWT is valid, move on to the next middleware or request handler
        next();
    } catch (error) {
        
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token"
        })
    }
}

//isStudent

exports.isStudent = async(req, res, next)=>{
    try {

       if( req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Student Only ",
            })
       }

       next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified ",
        })
    }
}


//isInstructor
exports.isInstructor = async(req, res, next)=>{
    try {

       if( req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor Only ",
            })
       }

       next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified ",
        })
    }
}


//isAdmin
exports.isAdmin = async(req, res, next)=>{
    try {

       if( req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin Only ",
            })
       }

       next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified ",
        })
    }
}