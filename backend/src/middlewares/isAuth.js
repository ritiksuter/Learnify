import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuth = async (req, res, next) => {
  try {
    let token = req?.cookies?.token;

    if (!token) {
      return res.status(400).json({ message: "User doesn't have token" });
    }

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res.status(400).json({ message: "User doesn't have valid token" });
    }

    const user = await User.findById(verifyToken._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.user = user;
    next();
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: `is auth error ${error}` });
  }
};
export default isAuth;
