const {instance}=require('../config/razorpay');
const Course=require('../models/Course');
const User=require('../models/User');
const mailSender=require('../utils/mailSender');
const {courseEnrollmentEmail}=require('../mail/courseEnrollmentEmail');
const { default: mongoose } = require('mongoose');


exports.capturePayment =async(req,res)=>{
    const {course_id}=req.body;
    const userId=req.user.id;

    if(!course_id){
        return res.status(400)
        .json({
            success:false,
            data:"courseId is not present"
        })
    }

    try {
        const  course=await Course.findById(course_id);
        if(!course){
            return res.status(400)
            .json({
                success:false,
                data:course,
                message:"course is created successfully"
            })
        }
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentEnrolled.includes(uid)){
            return res.status(400)
            .json({
                success:false,
                data:"Student  is already enrolled"
            })
        } 

    } catch (error) {
        res.status(500)
        .json({
            success:false,
            data:error.message
        })
    }

    const amount=course.price;
    const currency="INR";
    
    const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId
        }
    }

    try {
        const PaymentResponse=await instance.orders.create(options);
        console.log("PaymentRespons: ",PaymentResponse);

        return res.status(200)
        .json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:PaymentResponse.id,
            currency:PaymentResponse.currency,
            amount:PaymentResponse.amount
        })
    } catch (error) {
        res.status(400)
        .json({
            success:false,
            data:error.message,
            message:"could not initialize the order"
        })
    }
}

// verify signature of razorpay and server
exports.verifySignature=async(req,res)=>{
    const webhookSecret ="12345678";
    const signature=req.headers['x-razorpay-signature'];
    const shasum=crypto.createHmac('sha256',webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest('hex');

    if(signature==digest){
        console.log("Payment is Authorized");
        const {courseId,userId}=req.body.payload.payment.entity.notes;

        try {
            const enrolledCourse=await Course.findByIdAndUpdate(
                {_id:courseId},
                {$push:{studentEnrolled:userId}},
                {new:true}
            );

            console.log("enrolledCourse",enrolledCourse);

            if(!enrolledCourse){
                return res.status(400)
                .json({
                    success:false,
                    message:"Course not found "
                })
            }

            const enrolledStudent=await User.findByIdAndUpdate(
                {_id:userId},
                {$push:{courses:courseId}},
                {new:true}
            )

            console.log("enrolledStuent",enrolledCourse);

            const emailResponse=await mailSender(enrolledStudent.email,"Congratulations from StudyNotion","Congratulations,you are onBoard into new StudyNotion Course");
            console.log("emailResponse: ",emailResponse);
            return res.status(200)
            .json({
                success:true,
                data:"Signature verified and course added"
            })
        } catch (error) {
            console.log(error);
            return res.status(500)
            .json({
                success:false,
                message:error.message
            })
        }
    }
    else{
        return res.status(500)
        .json({
            success:false,
            message:"Invalid request"
        })
    }
}