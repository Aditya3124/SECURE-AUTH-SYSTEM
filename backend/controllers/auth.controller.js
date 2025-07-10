import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { genrateverificationToken } from "../utils/genrateverificationToken.js";
import { genrateTokenAndSetCookie } from "../utils/genrateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../utils/emailService.js";


export const signup = async (req, res) => {
  const {email ,password,name} = req.body;
    try {
      if(!email || !password || !name) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const userAlreadyExists = await User.findOne({ email });
       
      

      if (userAlreadyExists) {
        return res.status(400).json({success:false, message: "User already exists" });
      }
        
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = genrateverificationToken();  
      const newUser = new User({ 
        email,
        password:hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 
        // Token expires in 24 hours
      });

      await newUser.save();

      genrateTokenAndSetCookie(res, newUser._id);

      await sendVerificationEmail(newUser.email, newUser.verificationToken);


       res.status(201).json({ success: true, message: "User created successfully", newUser: {
        ...newUser._doc,
        password: undefined, 
      } });

    } catch (error) {
      console.error("Error during signup:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
}

export const verifyEmail = async (req, res) => {
   const {code} = req.body;
   try {
    const newUser = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() } // Check if token is still valid
    });
    if (!newUser) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }
    newUser.isVerified = true;
    newUser.verificationToken = undefined; // Clear the token after verification
    newUser.verificationTokenExpiresAt = undefined; // Clear the expiration time
    await newUser.save();
    
    await sendWelcomeEmail(newUser.email, newUser.name);
    res.status(200).json({ message: "Email verified successfully", user: {
      ...newUser._doc,
      password: undefined, // Exclude password from response
    } });



   } catch (error) {
     console.error("Error during email verification:", error);
     return res.status(500).json({ message: "Internal server error" });
    
   }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const newUser = await User.findOne({ email });

    if (!newUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, newUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!newUser.isVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in" });
    }

    genrateTokenAndSetCookie(res, newUser._id);

    res.status(200).json({ success: true, message: "Login successful", user: {
      ...newUser._doc,
      password: undefined, // Exclude password from response
    } });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
}

export const forgotPassword = async (req, res) => {
  console.log("Forgot password request received");
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    const newUser = await User.findOne({ email });
    if (!newUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1* 60 * 60 * 1000; 
    newUser.resetPasswordToken = resetToken;
    newUser.resetPasswordExpiresAt = resetTokenExpiresAt;
    await newUser.save();

    await sendPasswordResetEmail(newUser.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({ message: "Password reset email sent successfully" });

}

catch (error) {
    console.error("Error during forgot password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!token || !password) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    const newUser = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() } // Check if token is still valid
    });

    if (!newUser) {
      return res.status(400).json({ message: "Invalid or expired password reset token" });
    }

    newUser.password = await bcrypt.hash(password, 10);
    newUser.resetPasswordToken = undefined; // Clear the token after resetting password
    newUser.resetPasswordExpiresAt = undefined; // Clear the expiration time
    await newUser.save();

    await sendResetSuccessEmail(newUser.email);

    res.status(200).json({ message: "Password reset successfully" });

  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const checkAuth = async (req, res) => {
  try {
    const userId = req.userId; // From verifyToken middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const newUser = await User.findById(userId).select("-password");
    if (!newUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, user: newUser });

  } catch (error) {
    console.error("Error during authentication check:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}