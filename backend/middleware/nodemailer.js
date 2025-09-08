

import nodemailer from "nodemailer";

export const sendMailNodemailer = async (user) => {
    try {
        // Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST|| sandbox.smtp.mailtrap.io,
  port: process.env.MAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME ||'dde92f6a068b11',
    pass: process.env.MAIL_PASSWORD || "fb199f7f017599",
  },
   tls: {
    rejectUnauthorized: false // sometimes needed for dev/test
  }
});

// Wrap in an async IIFE so we can use await.
const mailOptions = await transporter.sendMail( {
    from: 'demomailtrap.co',
    to: user.email,
    subject: "Password Reset",
    text:`Hello, ${user.username}! You can reset your password by clicking on this link: http://localhost:5173/reset-password/${user.passwordResetToken}`, // plain‑text body
})

 
    } catch (error) {
        console.log(error);
        
    }
}


