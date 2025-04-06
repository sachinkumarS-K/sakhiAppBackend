import crypto from "crypto"
import { resetPasswordFormat } from "../mail/email.js";
import User from "../models/userModel.js";


import mailSender from "../utils/mailSender.js";
import { contactUsResponseFormat } from "../mail/feedback.js";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields except pic are required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let pic = `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
      name
    )}%20K`;

    const user = await User.create({
      name,
      email,
      password,
      img: pic,
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unable to register user, please try again",
      });
    }

    await user.save();

    const token = user.generateToken();

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
      })
      .status(200)
      .json({
        success: true,
        message: "User registered successfully",
        user,
        token,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    // console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    if (password !== user.password) {
      return res.status(400).json({
        success: false,
        message: "Password not matched",
      });
    }

    const token = user.generateToken();

    user.password = undefined;
    res
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({
        success: true,
        message: "User log in successfully",
        user,
        token,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const allUsers = async (req, res) => {
  try {
    const searchKeyword = req.query.search;

    if (!searchKeyword) {
      return res
        .status(400)
        .json({ success: false, message: "Search keyword is required" });
    }
    const query = {
      $and: [
        {
          $or: [
            { name: { $regex: searchKeyword, $options: "i" } },
            { email: { $regex: searchKeyword, $options: "i" } },
          ],
        },
        { _id: { $ne: req.user.id } },
      ],
    };

    const users = await User.find(query);
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  return res
    .cookie("token", null, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    })
    .status(200)
    .json({
      success: true,
      message: "User logged out successfully",
    });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email)

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = Math.floor(1000 + Math.random() * 9000);

    user.otp = resetToken;

    await user.save();


    await mailSender(
      user.email,
      "Password Reset OTP",
      resetPasswordFormat(user.name, user.email, resetToken)
    );

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ sucess : true , message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({sucess : false, message: "Server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and new password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    user.password = password;

    user.otp = undefined;


    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const sendEmail = async (req, res) => {
  try {
    const { name, email } = req.body;
     await mailSender(
        email,
       "Feedback Response",
       contactUsResponseFormat(name)
     );

     res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export {
  registerUser,
  loginUser,
  allUsers,
  logoutUser,
  forgotPassword,
resetPassword,
  sendEmail,
  verifyOtp,
};
