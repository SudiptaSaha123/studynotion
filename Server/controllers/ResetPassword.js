const User = require("../models/User");
const { mailSender } = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Reset Password Token
exports.resetPasswordToken = async (req, res) => {
  try {
    // Get email from request body
    const email = req.body.email;

    //check user for this email
    const user = User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: true,
        message: "Your email is not register with us",
      });
    }

    // Generate token
    const token = crypto.randomUUID();

    // Update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    // Create Url
    // const url = `http://localhost:3000/update-password/${token}`;
    
    const url = `https://studynotion-puce.vercel.app/update-password/${token}`


    // Send mail containing the url
    await mailSender(email, "Password reset link", `Link: ${url}`);

    return res.status(200).json({
      success: true,
      message: "Email send successfully, please check mail and change password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wromg while sending password reset mail",
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    // Data fetch
    const { password, confirmPassword, token } = req.body;

    // Validation
    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Password not matching",
      });
    }

    // Get user datails from db using token
    const userDetails = await User.findOne({ token: token });

    // If no enrty - token invalid
    if (!userDetails) {
      return res.status(403).json({
        success: false,
        message: "Token Invalid",
      });
    }

    // Check token time
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "Token is expired, please regenerate your token",
      });
    }

    // Hash Password
    console.log("Password: ", password);
    console.log("Confirm Password: ", confirmPassword);
    console.log("Token: ", token);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Updated Password: ", hashedPassword);

    // Update Password
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    // Return response
    return res.status(200).json({
      success: true,
      message: "Password Updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Issue in updating password",
    });
  }
};
