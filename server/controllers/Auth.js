const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mailSender = require("../utils/mailSender");

require("dotenv").config();
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Email is required",
      });
    }
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP generated: ", otp);
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };

    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);
    const mailResponse = await mailSender(
      email,
      "your OTP code: ",
      `<h2>Your Otp is :<strong> ${otp}</strong></h2>
             <p> This is valid for 5 minutes.</p>`
    );
    if (!mailResponse) {
      return res.status(400).json({
        success: false,
        data: "issue while sending mail ",
      });
    }
    console.log("Email sent: ", mailResponse.messageId);

    res.status(200).json({
      success: true,
      message: "Otp Sent Successfully",
      otp,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password and confirm password do not match, please try again",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    const recentOtp = await OTP.findOne({ email: email });

    console.log("recentOtp: ", recentOtp);

    if (!recentOtp) {
      // Fix: Check if recentOtp is null
      return res.status(400).json({
        success: false,
        message: "(Recent Otp Not Found) Otp not found",
      });
    } else if (recentOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid Otp",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    console.log("profile:", profileDetails);
    if (!accountType) {
      accountType = "student";
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      accountType,
      password: hashPassword,
      additionalDetails: profileDetails._id,
      image: `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User is registered successfully",
      user,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error while user signup",
      data: e.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields required",
      });
    }
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRETE, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "password not matched",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Login failed, please try again",
    });
  }
};

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
exports.changePassword = async (req, res) => {
  try {
    const { newPassword, oldPassword, confirmPassword, id } = req.body;
    if (!newPassword || !oldPassword || !confirmPassword || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    const checkpassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkpassword) {
      return res.status(400).json({
        success: false,
        message: "old password is not correct",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "new password and confirm password do not match",
      });
    }

    const hashedpassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedpassword;
    await user.save();

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "password changed Successfully",
      text: `Hello ${user.firstName} ${user.lastName} your password has been successfully 
            your new password is ${newPassword}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    return res.status(200).json({
      success: true,
      message: "password changed successfully",
      user,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "issue while changeing password ",
      error: e.message,
    });
  }
};
