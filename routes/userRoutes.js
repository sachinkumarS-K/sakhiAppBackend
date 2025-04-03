import express from "express";
import "dotenv/config.js";
import twilio from "twilio";
import {
  allUsers,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,resetPassword,
  sendEmail
} from "../controller/userController.js";


import { auth } from "../middleware/authMiddleware.js";
import { sendMessage } from "../controller/messageController.js";


const router = express.Router();

router.post("/login", loginUser);
router.post("/register",  registerUser);
router.get("/logout",  logoutUser);
router.route("/").get(auth, allUsers);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/send-message", sendMessage);
router.post("/sendEmail" ,sendEmail )

export default router;
