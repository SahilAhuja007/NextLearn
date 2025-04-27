const Course = require("../models/Course");
const Tags = require("../models/Catogory");
const User = require("../models/User");
const { uploadImage } = require("../utils/imageUpload");

exports.createCourse = async (req, res) => {
  try {
    console.log("📌 Received request to create course");
    const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body;
    const thumbnail = req.files?.thumbnailImage;

    console.log("📌 Extracted request body:", { courseName, courseDescription, whatYouWillLearn, price, tag });

    // Check for missing fields
    if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Get instructor details
    const userId = req.user.id;
    console.log("📌 Fetching instructor details for userId:", userId);
    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      console.log("❌ Instructor details not found");
      return res.status(400).json({
        success: false,
        message: "Instructor details not found",
      });
    }
    console.log("✅ Instructor details found:", instructorDetails);

    // Get tag details
    console.log("📌 Fetching tag details for tagId:", tag);
    const tags = await Tags.findById(tag);
    if (!tags) {
      console.log("❌ Tag not found");
      return res.status(400).json({
        success: false,
        message: "Tag not found",
      });
    }
    console.log("✅ Tag details found:", tags);

    // Upload the thumbnail image
    console.log("📌 Uploading thumbnail image...");
    const thumbnailImage = await uploadImage(thumbnail, process.env.FOLDER);
    if (!thumbnailImage) {
      console.log("❌ Error uploading image to Cloudinary");
      return res.status(400).json({
        success: false,
        message: "Error uploading image to Cloudinary",
      });
    }
    console.log("✅ Image uploaded successfully:", thumbnailImage.secure_url);

    // Create the course
    console.log("📌 Creating course in database...");
    const course = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: tags._id,
      thumbnail: thumbnailImage.secure_url,
    });

    console.log("✅ Course created successfully:", course);

    // Add course to instructor details
    console.log("📌 Adding course to instructor's profile...");
    instructorDetails.courses.push(course._id);
    await instructorDetails.save();
    console.log("✅ Instructor details updated");

    // Add course to tag details
    console.log("📌 Adding course to tag details...");
    tags.courses.push(course._id);
    await tags.save();
    console.log("✅ Tag details updated");

    // Send success response
    res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      data: course,
    });

  } catch (e) {
    console.log("❌ Error occurred:", e.message);
    res.status(500).json({
      success: false,
      message: "Error creating course",
      error: e.message,
    });
  }
};



exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    // Find course details
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("tag")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        data: "issue while fetching courses",
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
      message: "courses fetched successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      data: e.message,
      message: "issue while fetching courses",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    if (!courses) {
      return res.status(400).json({
        success: false,
        data: "issue while fetching courses",
      });
    }

    res.status(200).json({
      success: true,
      data: courses,
      message: "courses fetched successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      data: e.message,
      message: "issue while fetching courses",
    });
  }
};
