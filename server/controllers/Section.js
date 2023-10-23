const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async(req, res) =>{
    try {
        //data fetch
        const {sectionName, courseId} = req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        //create section
        const newSection = await Section.create({sectionName});
        // Add the new section to the course's content array

        //TODO---> use populate to replace both section and subsection in the updatedCourseDetails 
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId, 
            {$push: {courseContent: newSection._id}}, 
            {new: true}
            )
            .populate({
                path: "courseContent",
                populate: {
                    path:"subSection",
                }

            })
            .exec();
        //return response
        return res.status(200).json({
            success: true,
            message: "section created successfully",
            updatedCourseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create section, please try again",
            error: error
        })
        
    }
}

exports.updateSection = async (req, res)=>{

    try {
        //data input
        const {sectionName, sectionId} = req.body;
        //data validation

        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        //update in db
        const updatedSectionDetails = await Section.findByIdAndUpdate(sectionId, {sectionName},{new: true});
        //return response
        return res.status(200).json({
            success: true,
            message: "section updated successfully",
            updatedSectionDetails,
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update section, please try again",
            error: error
        })
        
    }
}

exports.deleteSection = async(req, res) => {

    try {
        //fetch sectionid-->assuming that we are sending Id in params
        const {sectionId,courseId} = req.body

        //TODO-->do we need to the delete the entry in courseContent array in course schema?
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {$pull : {courseContent: sectionId}}, {new: true})

        //delete the section
        await Section.findByIdAndDelete(sectionId);
        //return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            updatedCourse,
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete section, please try again",
            error: error
        })
        
    }
}