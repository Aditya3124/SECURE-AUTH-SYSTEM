import nodemailer from "nodemailer";

export const sendVerificationEmail = async (to, token ,name="") => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `"aditya" <${process.env.EMAIL}>`,
      to,
      subject: "Your Email Verification Code",
      html: `
     
 <div style="
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  background: #ffffff;
  border: 4px solid #000;
  box-shadow: 8px 8px 0 #000;
  font-family: Arial, sans-serif;
  color: #000;
">
  <h2 style="
    font-size: 32px;
    font-weight: 900;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 30px;
    background: #facc15;
    display: inline-block;
    padding: 10px 20px;
    border: 2px solid #000;
    box-shadow: 4px 4px 0 #000;
  ">
    Verify Your Email
  </h2>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Hi${name ? ` ${name}` : ""},<br>
    Thanks for signing up! Use the code below to verify your email and complete your registration.
  </p>

  <div style="
    text-align: center;
    margin: 30px 0;
  ">
    <span style="
      display: inline-block;
      font-size: 32px;
      letter-spacing: 4px;
      padding: 16px 32px;
      background: #facc15;
      color: #000;
      border: 4px solid #000;
      box-shadow: 4px 4px 0 #000;
      font-weight: 900;
    ">
      ${token}
    </span>
  </div>

  <p style="font-size: 14px; margin-bottom: 20px;">
    This code expires in 24 hours.
  </p>

  <hr style="border: none; border-top: 2px solid #000; margin: 30px 0;">

  <p style="font-size: 12px; text-align: center;">
    ⚡ If you didn’t create this account, you can safely ignore this email.
  </p>
</div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent: ", info.messageId);
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw error;
  }
};

export const sendWelcomeEmail = async (to, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `"aditya" <${process.env.EMAIL}>`,
      to,
      subject: "Welcome to Our Service!",
      html: `
       <div style="
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  background: #ffffff;
  border: 4px solid #000;
  box-shadow: 8px 8px 0 #000;
  font-family: Arial, sans-serif;
  color: #000;
">
  <h2 style="
    font-size: 32px;
    font-weight: 900;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 30px;
    background: #facc15;
    display: inline-block;
    padding: 10px 20px;
    border: 2px solid #000;
    box-shadow: 4px 4px 0 #000;
  ">
    Welcome, ${name}!
  </h2>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Thank you for verifying your email. We’re excited to have you on board!
  </p>

  <p style="font-size: 14px; margin-bottom: 20px;">
    If you have any questions, feel free to reach out.
  </p>

  <hr style="border: none; border-top: 2px solid #000; margin: 30px 0;">

  <p style="font-size: 12px; text-align: center;">
     This is an automated message, please do not reply.
  </p>
</div>


      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.messageId);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    throw error;
  }
}


export const sendPasswordResetEmail = async (to, resetURL) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `"aditya" <${process.env.EMAIL}>`,
      to,
      subject: "Password Reset Request",
      html: `
      <div style="
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  background: #ffffff;
  border: 4px solid #000;
  box-shadow: 8px 8px 0 #000;
  font-family: Arial, sans-serif;
  color: #000;
">
  <h2 style="
    font-size: 32px;
    font-weight: 900;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 30px;
    background: #facc15;
    display: inline-block;
    padding: 10px 20px;
    border: 2px solid #000;
    box-shadow: 4px 4px 0 #000;
  ">
    Password Reset
  </h2>

  <p style="font-size: 16px; margin-bottom: 20px;">
    We received a request to reset your password. Click the button below to proceed:
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${resetURL}" style="
      display: inline-block;
      padding: 16px 32px;
      background: #facc15;
      color: #000;
      text-decoration: none;
      font-size: 16px;
      font-weight: 900;
      border: 4px solid #000;
      box-shadow: 4px 4px 0 #000;
    ">
      Reset Password
    </a>
  </div>

  <p style="font-size: 14px; margin-bottom: 20px;">
    This link will expire in 24 hours.
  </p>

  <hr style="border: none; border-top: 2px solid #000; margin: 30px 0;">

  <p style="font-size: 12px; text-align: center;">
    ⚡ If you didn’t request this, you can safely ignore this email.
  </p>
</div>

      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.messageId);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw error;
  }
};


export const sendResetSuccessEmail = async (to) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `"aditya" <${process.env.EMAIL}>`,
      to,
      subject: "Password Reset Successful",
      html: `
     <div style="
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  background: #ffffff;
  border: 4px solid #000;
  box-shadow: 8px 8px 0 #000;
  font-family: Arial, sans-serif;
  color: #000;
">
  <h2 style="
    font-size: 32px;
    font-weight: 900;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 30px;
    background: #facc15;
    display: inline-block;
    padding: 10px 20px;
    border: 2px solid #000;
    box-shadow: 4px 4px 0 #000;
  ">
    Password Reset Successful
  </h2>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Your password has been successfully reset. You can now log in with your new password.
  </p>

  <hr style="border: none; border-top: 2px solid #000; margin: 30px 0;">

  <p style="font-size: 12px; text-align: center;">
    ⚠️ If you didn’t request this change, please contact support immediately.
  </p>
</div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset success email sent:", info.messageId);
  } catch (error) {
    console.error("Failed to send password reset success email:", error);
    throw error;
  }
}

