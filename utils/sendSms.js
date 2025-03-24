import "dotenv/config.js";
import twilio from "twilio"

const client = twilio(
  process.env.TWILO_ACCOUNT_SID,
  process.env.TWILO_AUTH_TOKEN
);

const sendSms = async (body) => {
        const msgOption = {
                // from :
        }
}

