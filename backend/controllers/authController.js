
import {  sendMailNodemailer } from "../middleware/nodemailer.js";
import { User } from "../models/userSchema.js";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ username, email, password });
    await user.save();

    const token = await user.generateToken();
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await user.generateToken();
    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImageUrl: user.profileImageUrl,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
   
    res.status(500).json({ message: "Server error" });
  }
};

export const passwordChange = async (req, res) => {
  try {
    // const { passwordData } = req.body
    const { currentPassword, newPassword } = req.body;

    
    const userId = req.user.id;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
   
    res.status(500).json({ message: "Server error" });
  }
};

export const uploadImg = async (req, res) => {
  try {
    const userId = req.user.id;
    const baseUrl = process.env.BASE_URL || "http://localhost:5000"; // set in .env in prod
    const profileImage = req.file ? req.file.filename : null;
    const profileImageUrl = `${baseUrl}/uploads/${profileImage}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: profileImage, profileImageUrl },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: "Image uploaded", profileImageUrl: profileImageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.generatePasswordResetToken();
    await user.save();
    await sendMailNodemailer(user)
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {


    
    const { password, confirmPassword, passwordResetToken } = req.body;
    if(password !== confirmPassword){
      return res.status(400).json({ message: "Password does not match" });
    }
    const user = await User.findOne({ passwordResetToken });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = password

    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
