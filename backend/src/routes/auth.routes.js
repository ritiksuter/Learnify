import { Router } from "express";
import { googleSignup, login, logout, resetPassword, sendOtp, signUp, verifyOtp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/sendotp", sendOtp);
authRouter.post("/verifyotp", verifyOtp);
authRouter.post("/resetPassword", resetPassword);
authRouter.post("/googlesignup", googleSignup);

export default authRouter;