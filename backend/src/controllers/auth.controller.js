import { User } from "../models/user.model.js";
import validator from "validator";
import sendMail from "../utils/Mail.js";

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const jwtToken = user.generateToken();

    return jwtToken;
  } catch (error) {
    console.log({message: "Something went wrong while generating referesh and access token"});
  }
};

export const signUp = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    let existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "email already exist" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter valid Email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Please enter a Strong Password" });
    }

    let user = await User.create({
      name,
      email,
      password,
      role,
    });

    if (!user) {
      return res.status(500).json({ message: "Internal server error !" });
    }

    let token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `signUp Error ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    let isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    let token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log("login error");
    return res.status(500).json({ message: `login Error ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `logout Error ${error}` });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    ((user.resetOtp = otp),
      (user.otpExpires = Date.now() + 5 * 60 * 1000),
      (user.isOtpVerifed = false));

    await user.save();
    await sendMail(email, otp);
    return res.status(200).json({ message: "Email Successfully send" });
  } catch (error) {
    return res.status(500).json({ message: `send otp error ${error}` });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isOtpVerifed = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "OTP verified " });
  } catch (error) {
    return res.status(500).json({ message: `Verify otp error ${error}` });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerifed) {
      return res.status(404).json({ message: "OTP verfication required" });
    }

    user.password = password;
    user.isOtpVerifed = false;
    await user.save();
    return res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Reset Password error ${error}` });
  }
};

export const googleSignup = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        role,
      });
    }

    let token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: `googleSignup  ${error}` });
  }
};
