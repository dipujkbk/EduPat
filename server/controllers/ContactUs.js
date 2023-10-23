const mailSender = require("../utils/mailSender")
const {contactUsEmail} = require("../mail/templates/contactFormRes")


exports.contactUsController = async(req, res) => {

    const {email, firstName, lastName, message, phoneNo, countrycode } = req.body
    console.log(req.body)

    try {
        const emailRes = await mailSender(
            email,
            "Your Data has been sent Successfully",
            contactUsEmail(email, firstName, lastName, message, phoneNo, countrycode)
        )
        console.log("Email Res ", emailRes)
        return res.json({
            success: true,
            message: "Email send successfully",
    })
    } catch (error) {
        console.log("Error", error)
        console.log("Error message :", error.message)
        return res.json({
        success: false,
        message: "Something went wrong...",
        }) 
        
    }

}