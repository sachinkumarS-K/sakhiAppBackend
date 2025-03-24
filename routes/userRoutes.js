import express from "express";
import "dotenv/config.js";
import twilio from "twilio";
import {
  allUsers,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,resetPassword
} from "../controller/userController.js";


import { auth } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/login", loginUser);
router.post("/register",  registerUser);
router.get("/logout",  logoutUser);
router.route("/").get(auth, allUsers);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

const accountSid = process.env.TWILO_ACCOUNT_SID;
const authToken = process.env.TWILO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const whatsappNumber = "whatsapp:+14155238886"; // Twilio Sandbox Number

router.post("/send-message", async (req, res) => {
  const { phone, message } = req.body;
  try {
    await client.messages.create({
      from: whatsappNumber,
      to: `whatsapp:${phone}`,
      body: message,
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
