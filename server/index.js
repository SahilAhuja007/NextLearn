const express = require('express');
const app = express();
require('dotenv').config();
const cors=require('cors');
const fileUpload=require('express-fileupload')
const cookieParser=require('cookie-parser')
const PORT = process.env.PORT|| 3000;

const userRoute=require('./routes/User');
const profileRoute=require('./routes/Profile');
// const paymentRoutes=require('./routes/Payments');
const courseRoutes=require('./routes/Course');

require('./config/database').dbconnect();
require('./config/cloudinary').connectCloudinary();


// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp'
}))

app.use('/api/v1/auth',userRoute);
app.use('/api/v1/profile',profileRoute);
app.use('/api/v1/course',courseRoutes);
// app.use('/api/v1/payment',paymentRoutes);

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to StudyNotion!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});