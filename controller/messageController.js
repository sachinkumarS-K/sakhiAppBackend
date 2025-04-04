import "dotenv/config";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

console.log(accountSid , authToken,twilioNumber)
if (!accountSid || !authToken) {
  console.error(" Twilio credentials are missing!");
  // process.exit(1);
}


const client = twilio(accountSid, authToken);

const sendMessage = async (req, res) => {

  const { to, message } = req.body;

  try {
    const response = await client.messages.create({
      body: message,
      from: twilioNumber,
      to: to,
    });

    res.status(200).json({ success: true, messageSid: response.sid });
  } catch (error) {

    res.status(500).json({ success: false, error: error });
  }
};

export { sendMessage };
