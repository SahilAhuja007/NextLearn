const Profile=require('../models/Profile');
const User =require('../models/User');
const Course=require('../models/Course');
const corn=require('node-cron');

exports.updateProfile = async (req, res) => {
    try {
        const { gender, dateOfBirth = "", about = "", contactNumber } = req.body;
        const id = req.user.id;

        if (!gender || !contactNumber || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Fetch user and populate profile details
        const user = await User.findById(id).populate("additionalDetails");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profile = user.additionalDetails;
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile details not found",
            });
        }

        // Update profile details
        profile.gender = gender;
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
        await profile.save();

        return res.status(200).json({
            success: true,
            data: profile,
            message: "Profile updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Issue while updating user profile",
            error: error.message,
        });
    }
};



exports.deleteAcount=async(req,res)=>{
    try {
        const dateToDelete=Date.now()+5;
        const id=req.user.id;
        if(!id){
            return res.status(400)
            .json({
                success:true,
                data:"id is missing"
            })
        }
        const user=await User.findById(id);
        if(!user){
            return res.status(400)
            .json({
                success:false,
                data:"user is not their"
            })
        }
        const profile_id=user.additionalDetails;
        const profile=await Profile.findByIdAndDelete(profile_id);
        const courses=user.courses|| [];
        for(let courseId  of courses){
            const course=await Course.findById(courseId);
            if(course){
                course.studentEnrolled.pull(id);
                await course.save();
            }
        }
        const us=await User.findByIdAndDelete(id);
        if(!us){
            return res.status(400)
            .json({
                success:false,
                data:"user is not present ,please provide correct user id"
            })
        }
        res.status(200)
        .json({
            success:true,
            data:user,
            message:"user deleted successfully"
        })
    } catch (error) {
        res.status(500)
        .json({
            success:false,
            data:error.message,
            message:"issue while deleting user"
        })
    }
}

exports.getAllUsers=async(req,res)=>{
    try {
        const user=await User.find({});
        if(!user){
            return res.status(400)
            .json({
                success:false,
                data:"user is not their"
            })
        }
        res.status(200)
        .json({
            success:true,
            data:user,
            message:"user fetched successfully"
        })
    } catch (error) {
        res.status(500)
        .json({
            success:false,
            data:error.message,
            message:"issue while fetching users"
        })
    }
}

exports.getAllUserDetails=async(req,res)=>{
    try {
        const id=req.user.id;
        if(!id){
            return res.status(400)
            .json({
                success:false,
                data:"id is required"
            })
        }
        const user =await User.findById(id).populate(
            {path:'additionalDetails',
            //  ref:"Profile"   
            }

        ).exec();
        res.status(200)
        .json({
            success:true,
            data:user,
            message:"user detail fetched successfully"
        })
    } catch (error) {
        res.status(500)
        .json({
            success:false,
            data:error.message,
            message:"issue while fetching  user detail"
        })
    }
}