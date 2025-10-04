import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("enrolledCourses");

    if (!user) {
      return res.status(400).json({ message: "User does not found" });
    }
    return res.status(200).json(user);
  } 
  catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Get current user error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, description } = req.body;
    let photoUrl;
    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }
    const user = await User.findByIdAndUpdate(userId, {
      name,
      description,
      photoUrl,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.save();
    return res.status(200).json(user);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Update Profile Error  ${error}` });
  }
};