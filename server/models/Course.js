const mongoose=require('mongoose');

const Course=new mongoose.Schema({
    courseName:{
        type:String
    },
    courseDescription:{
        type:String
    },
    instructor:{
        type:String
    },
    whatYouWillLearn:{
        type:String
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReviews"
    }],
    price:{
        type:String
    },
    thumbnail:{
        type:String
    },
    tag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    },
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
},{timestamps:true})

module.exports=mongoose.model("Course",Course);