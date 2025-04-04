import "dotenv/config";
import twilio from "twilio";

const accountSid = "AC3a1bb9140977e5536864783373bf7aea";
const authToken = "fbfb3d6dee00173b512b2439fe03265f";
const twilioNumber = "+12513124829";

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
