const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.nodeMailer_User,
    pass: process.env.nodeMailer_Pass,
  },
});
function sendMail(toEmail, subject, content) {
  const mailOptions = {
    from: process.env.nodeMailer_User,
    to: toEmail,
    subject: subject,
    html: content,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error occured", error);
    } else {
      console.log("email sent for subject:", subject);
    }
  });
}

module.exports = { sendMail };
