const Section=require('../models/Section');
const Course=require('../models/Course');

exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        // Check if required fields are provided
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        console.log("📌 Checking if course exists...");
        const course = await Course.findById(courseId);
        if (!course) {
            console.log("❌ Course not found.");
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        console.log("✅ Course found:", course.courseName);

        // Create the section (Fixed: Correct syntax)
        console.log("📌 Creating new section...");
        const section = await Section.create({ sectionName, course: courseId });

        console.log("✅ Section created:", section);

        // Add the section to the course
        console.log("📌 Adding section to course...");
        course.courseContent.push(section._id);
        await course.save();
        console.log("✅ Section added to course and saved.");

        // Fetch updated course with populated sections and sub-sections
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection',
                    model: 'SubSection'
                }
            });

        console.log("✅ Course updated with new section:", updatedCourse);

        res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Section created and course updated successfully",
        });

    } catch (e) {
        console.error("❌ Error creating section:", e.message);
        res.status(500).json({
            success: false,
            error: e.message,
            message: "Error while creating section",
        });
    }
};


exports.updateSection=async(req,res)=>{
    try{
        const {sectionName,sectionId}=req.body;
        if(!sectionName || !sectionId){
            return res.status(400)
            .json({
                success:false,
                data:"all fields required"
            })
        }
        const section =await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        res.status(200)
        .json({
            success:true,
            data:section,
            message:"section updated required"
        })
    }
    catch(e){
        res.status(500)
        .json({
            success:false,
            data:"issue while updating section",
            message:e.message
        })
    }
}

exports.deleteSection=async(req,res)=>{
    try{
        const {sectionId}=req.body;
        const section=await Section.findById(sectionId);
        if(!section){
            return res.status(400)
            .json({
                success:false,
                data:"section is not present"
            })
        }
        const courseId=section.course;
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(400)
            .json({
                success:false,
                data:"course is not present"
            })
        }
        course.courseContent.pull(sectionId);
        await course.save();
        const sectiondeleted=await Section.findByIdAndDelete(sectionId);
        if(!sectiondeleted){
            return res.status(400)
            .json({
                success:false,
                data:"issue while deleting section"
            })
        }
        res.status(200)
        .json({
            success:true,
            data:section,
            message:"section deleted successfully"
        })
    }
    catch(e){
        res.status(500)
        .json({
            success:false,
            data:"issue while deleting section",
            message:e.message
        })
    }
}