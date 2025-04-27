const SubSection=require('../models/subSection');
const Section=require('../models/Section');
const {uploadImage}=require('../utils/imageUpload');

exports.createSubSection=async(req,res)=>{
    try{
        const {section_id,title,timeDuration,description}=req.body;
        const video=req.files.vidoeUrl;

        if(!section_id || !title || !timeDuration || !description || !video){
            return  res.status(400)
            .json({
                success:false,
                data:"all fields are required"
            })
        }

        const videodetail= await uploadImage(video,process.env.FOLDER);

        const subsection=await SubSection.create({
            title,timeDuration,description,videoUrl:videodetail.secure_url,section:section_id
        })

        const section = await Section.findByIdAndUpdate(
            section_id,
            { $push: { subSection: subsection._id } },
            { new: true }
        ).populate('subSection');    
        if(!section){
            return res.status(400)
            .json({
                success:false,
                data:"section is not present ,provide correct section id "
            })
        }    
        res.status(200)
        .json({
            success:true,
            data:subsection,
            message:"subsection created successfully "
        })
    }
    catch(e){
        res.status(500)
        .json({
            success:false,
            data:e.message,
            message:"issue while creating subsection"
        })
    }
}


exports.updateSubSection = async (req, res) => {
    try {
        const { subsection_id, title, timeDuration, description } = req.body;
        let videoUrl;

        if (!subsection_id || !title || !timeDuration || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields except video are required",
            });
        }

        // Check if a new video is uploaded
        if (req.files && req.files.videoUrl) {
            const videoDetail = await uploadImage(req.files.videoUrl, process.env.FOLDER);
            videoUrl = videoDetail.secure_url;
        }

        // Update subsection
        const updatedSubsection = await SubSection.findByIdAndUpdate(
            subsection_id,
            { 
                title, 
                timeDuration, 
                description, 
                ...(videoUrl && { videoUrl })
            },
            { new: true } // Return the updated document
        );

        if (!updatedSubsection) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found",
            });
        }

        res.status(200).json({
            success: true,
            data: updatedSubsection,
            message: "Subsection updated successfully",
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message,
            message: "Issue while updating subsection",
        });
    }
};

exports.deletesubsection = async (req, res) => {
    try {
        const { subsection_id } = req.body;
        
        if (!subsection_id) {
            return res.status(400).json({
                success: false,
                message: "Subsection ID is required"
            });
        }

        // Find subsection
        const subsection = await SubSection.findById(subsection_id);
        if (!subsection) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found"
            });
        }

        // Find the parent section
        const section = await Section.findById(subsection.section);
        if (section) {
            section.subSection.pull(subsection_id);
            await section.save();
        }

        // Delete the subsection
        await SubSection.findByIdAndDelete(subsection_id);

        res.status(200).json({
            success: true,
            message: "Subsection deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Issue while deleting subsection",
            error: error.message
        });
    }
};
