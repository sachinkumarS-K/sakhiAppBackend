import nodemailer from "nodemailer"


const mailSender = async (email, title, body) => {
  try {
    const { MAIL_USER, MAIL_PASSWORD } = process.env;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: `"Women Support Team" <${MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
      text: body.replace(/<[^>]+>/g, ""),
    });

  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export default mailSender;
