const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// Send OTP
// exports.sendOTP = async (req, res) => {
//   try {
//     // Fetch email from request body
//     const { email } = req.body;

//     // Check if user already exist
//     const checkUserPresent = await User.findOne({ email });

//     // If user already exists, then return response
//     if (checkUserPresent) {
//       return res.status(401).json({
//         success: false,
//         message: "User already registered",
//       });
//     }

//     // Else Generate OTP   -> need modification from 22 - 40
//     var otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });

//     let result = await OTP.findOne({ otp: otp });

//     while (result) {
//       otp = otpGenerator.generate(6, {
//         upperCaseAlphabets: false,
//         lowerCaseAlphabets: false,
//         specialChars: false,
//       });
//       result = await OTP.findOne({ otp: otp });
//     }

//     // create db entry
//     const otpPayload = { email, otp };

//     const otpBody = await OTP.create(otpPayload);
//     console.log(otpBody);

//     res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//       otp,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body

    // Check if user is already present
    // Find user with provided email
    const checkUserPresent = await User.findOne({ email })
    // to be used in case of signup

    // If user found with provided email
    if (checkUserPresent) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      })
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
    const result = await OTP.findOne({ otp: otp })
    console.log("Result is Generate OTP Func")
    console.log("OTP", otp)
    console.log("Result", result)
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      })
    }
    const otpPayload = { email, otp }
    const otpBody = await OTP.create(otpPayload)
    console.log("OTP Body", otpBody)
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, error: error.message })
  }
}

// SignUp
exports.signUp = async (req, res) => {
  try {
    // Data fetch from request body
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

    //Validate the data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Match password and confirmPassword
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and ConfirmPassword value does not match",
      });
    }

    // Check user already exists or not
    const existingUser = await User.findOne({ email });
    // console.log("User:", existingUser);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    // Find most recent otp stored for the user
    const resentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    // Validate OTP
    // console.log("sentOTP: ", resentOTP[0].otp);
    if (resentOTP.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== resentOTP[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "Invalide OTP",
      });
    }

    // Hash Password
    const hasedPassword = await bcrypt.hash(password, 10);

    // Entry ceate in db
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contuctNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hasedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // Return response
    return res.status(200).json({
      success: true,
      message: "User is registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again",
    });
  }
};

// Login
exports.logIn = async (req, res) => {
  try {
    // Fetch data ffrom request body
    const { email, password } = req.body;

    // Data Validation
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check user exists or not
    const user = await User.findOne({ email })
      .populate("additionalDetails")
      .exec();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exists",
      });
    }

    // Generate jwt token after matching password
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      user.token = token;
      user.password = undefined;

      // Create cookies and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "user logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Login failure, please try again later",
    });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    // Get user details from from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password newpassword and confirmNewPassword from req.body
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "The Password is incorrect",
      });
    }

    // Match new password and confirm new password
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "The new password and confirm new password does not match",
      });
    }

    // Update Password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updateUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send Ntification email
    try {
      const emailResponse = await mailSender(
        updateUserDetails.email,
        `Password updated successfully for ${updateUserDetails.firstName} ${updateUserDetails.lastName}`,
        passwordUpdated(
          updateUserDetails.email,
          updateUserDetails.firstName,
          updateUserDetails.lastName
        )
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error occured while sending mail",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while updating password",
    });
  }
};
