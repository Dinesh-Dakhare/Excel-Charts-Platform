import { User } from "../models/userSchema.js";
import { Charts } from "../models/chartSchema.js";

export const getUserData = async (req, res) => {
  try {
    const { page = 1 ,limit} = req.query;

    let limitData = parseInt(limit) || 5;
    const skip = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limitData);
    const totalUsers = await User.countDocuments();
    const totalDownloads = users.reduce((acc, user) => acc + user.downloads, 0);
    const chart = await Charts.find();

    const chartsTotal = chart.length;

    res
      .status(200)
      .json({ users, totalUsers, totalDownloads, chartsTotal, chart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUserData = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserCharts = async(req, res) => {
  try {
    const userId = req.params.id;
    const {page=1,limit} = req.query
    let limitData = parseInt(limit) || 5;


    const skip = (page - 1) * limitData;

    const user = await User.findById(userId).populate({
      path: "charts",
      options: {
        sort: { createdAt: -1 },
        skip,
        limit: limitData,
      },
    });
    res.status(200).json(user);
    
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUserCharts = async (req, res) => {
  try {
    const chartId = req.params.id;
    const chart = await Charts.findByIdAndDelete(chartId);
    if (!chart) return res.status(404).json({ message: "Chart not found" });
    res.status(200).json({ message: "Chart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAllUserCharts = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    user.charts = [];
    await user.save();
    res.status(200).json({ message: "All user charts deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getLatestChart = async (req, res) => {
  try {
    const latestChart = await Charts.findOne().sort({ createdAt: -1 });
    res.status(200).json(latestChart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
