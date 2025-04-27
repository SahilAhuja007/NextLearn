const User=require('../models/User');
const mailSender=require('../utils/mailSender');
const bcrypt=require('bcrypt');


exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const token = crypto.randomUUID();

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Issue while generating token"
            });
        }

        const updateUser = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            },
            { new: true } // Ensure it returns the updated user
        );

        if (!updateUser) {
            return res.status(500).json({
                success: false,
                message: "Error updating user token"
            });
        }

        const url = `http://localhost:3000/update-password/${token}`;
        const mail=await mailSender(email, "Reset Password", `Click on the link to reset your password: <a href="${url}">${url}</a>`);

        if(!mail){
            return res.status(400)
            .json({
                success:false,
                data:"issue while sending email"
            })
        }
        res.status(200).json({
            success: true,
            message: "Email sent successfully, please check your email and reset your password"
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: e.message
        });
    }
};



exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // ✅ Fix: Use `await` when fetching the user
        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist, please sign up first",
            });
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token has expired!",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.token = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully!",
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: e.message,
        });
    }
};
