const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
    },
    otp :
        {
            type: String,
            required:true,
        },

    createdAt:{
        type: Date,
        default: Date.now,
        expires: 5*60,// The document will be automatically deleted after 5 minutes of its creation time
    }
    
});

//pre hook-->Define a function to send emails
async function sendVerificationEmail(email, otp){
    // Create a transporter to send emails

	// Define the email options

	// Send the email
    try {
        const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);        
        console.log("Email sent successfully: ", mailResponse.response);

    } catch (error) {

        console.log("Error occurrred while sending email ", error);
        throw(error); 
    }
}

//TODO--> doubt try with post hook-->it is ok to do with post hook

/*
OTPSchema.post("save", async function(doc, next)
{

    
    // console.log("New document saved to database");

	// // Only send an email when a new document is created
	// if (this.isNew) {
	// 	await sendVerificationEmail(this.email, this.otp);
	// } 
    
    
    await sendVerificationEmail(doc.email, doc.otp);
    next();
})
*/

OTPSchema.pre("save", async function(next){

    
    console.log("New OTP document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
    next();
})


const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;





/*Notes-->
In the context of Mongoose and MongoDB (as used in the code snippets you provided), "newness" refers to whether a document being saved is a newly created document that hasn't been saved to the database before.

In Mongoose, there is a built-in property called isNew that is true for a document when it's created but hasn't been saved to the database yet. When you create a new document using a Mongoose model, it is initially marked as "new." Once you save it to the database for the first time, isNew becomes false for that document.

Here's an example:


const otpDocument = new OTPModel({
    email: 'example@example.com',
    otp: '123456'
});

console.log(otpDocument.isNew); // true, because it's a new, unsaved document

otpDocument.save(function (error, savedDocument) {
    console.log(savedDocument.isNew); // false, after saving to the database
});



In the context of the code snippets you provided, the condition if (this.isNew) is used to check if the document is new (i.e., it hasn't been saved to the database yet) before sending a verification email. This is often used to trigger certain actions, like sending a welcome email or performing additional setup, when a new document is created and saved for the first time.

*/
