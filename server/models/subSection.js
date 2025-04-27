const mongoose=require('mongoose');

const subSectionSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    timeDuration:{
        type:String
    },
    description:{
        type:String
    },
    videoUrl:{
        type:String
    },
    section:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }
},{timestamps:true})

module.exports=mongoose.model("SubSection",subSectionSchema);