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

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetURL = `http://localhost:8000/api/v1/user/reset-password?token=${resetToken}`;

    await mailSender(
      user.email,
      "Password Reset",
      resetPasswordFormat(user.name, user.email, resetURL)
    );

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check expiry
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = newPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
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
};
