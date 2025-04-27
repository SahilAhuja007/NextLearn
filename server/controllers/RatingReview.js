const RatingAndReviews=require('../models/RatingAndRevies');
const Course=require('../models/Course');

exports.createRating=async(req,res)=>{
    try {
        const userId=req.user.id;
        const{reviews,rating,courseId}=req.body;
        const courseDetails=await Course.findOne({
            _id:courseId,
            studentEnrolled:{$eleMatch:{$eq:userId}}
        })
        if(!courseDetails){
            return res.status(400)
            .json({
                success:false,
                data:"course is not available"
            })
        }
        const alreadyreview=await RatingAndReviews.findOne({
            user:userId,
            course:courseId
        });
        if(review){
            return res.status(400)
            .json({
                success:false,
                data:"review is captured prevously"
            })
        }

        const review=await RatingAndReviews.create({
            rating,reviews,course:courseId,user:userId
        })

        await Course.findByIdAndUpdate(courseId,{
            $push:{
                ratingAndReviews:review
            }
        },{new :true})
        res.status(200)
        .json({
            success:true,
            data:review,
            message:"rating nd review is posted successfully!"
        })
    } catch (error) {
        res.status(500)
        .json({
            success:false,
            data:error.message,
            message:"issue while creating rating"
        })
    }
}

exports.getAverageRating=async(req,res)=>{
    try {
        const courseId=req.body;
        const course=await Course.findById(courseId).populate('ratingAndReviews');

        if(!course || course.ratingAndReviews.length===0){
            return res.status(400)
            .json({
                success:false,
                data:"course is not present || rating is review is not present"
            })
        }
        
        let totalrating;
        course.ratingAndReviews.forEach((review)=>{
            totalrating +=review.rating;
        })

        const averagerating=totalrating/course.ratingAndReviews.length;
        res.status(200)
        .json({
            success:true,
            data:averagerating,
            message:"averagerating calculate successfully!"
        })
    } catch (error) {
        res.status(500)
        .json({
            success:false,
            data:error.message,
            message:"issue while calculating average rating"
        })
    }
}

exports.getAllRatings=async(req,res)=>{
    try {
        const rating =await RatingAndReviews.find({})
        .populate({
            path:course,
            select:"courseName"
        })
        .sort({rating:"desc"})
        .populate({
            path:user,
            select:"firstName lastName email"
        });
        res.status(200)
        .json({
            success:true,
            data:rating,
            message:"all ratings are fetched"
        })
    } catch (error) {
        res.status(500)
        .json({
            success:false,
            data:error.message,
            message:"issue while fetching ratings"
        })
    }
}