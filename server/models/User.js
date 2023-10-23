const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    },
    // Define the role field with type String and enum values of "Admin", "Student", or "Instructor"
    accountType:{
        type: String,
        enum: ["Admin", "Student", "Instructor"],
        required:true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    image: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    coursePogress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress",
        }
    ],
    // Add timestamps for when the document is created and last modified
},

{ timestamps: true }); 
//Mongoose will automatically add createdAt and updatedAt fields to each document. These fields will store timestamps representing when the document was created and last updated.

module.exports = mongoose.model("User", userSchema); 