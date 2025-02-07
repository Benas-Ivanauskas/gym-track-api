import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (email, resetLink) => {
  if (!email || !resetLink) {
    console.error("Error: Missing email or reset link");
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
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
