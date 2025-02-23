import nodemailer from "nodemailer";
import logger from "./config/logger.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (email, resetLink) => {
  if (!email || !resetLink) {
    logger.error("Error: Missing email or reset link", 400);
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Password Reset Request",
    html: `<p>Click the link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
    text: `Click the link to reset your password: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Password reset email sent -- ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
