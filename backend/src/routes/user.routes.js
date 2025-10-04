import {Router} from 'express';
import isAuth from '../middlewares/isAuth.js';
import { getCurrentUser, updateProfile } from '../controllers/user.controller.js';
import upload from '../middlewares/multer.js';

let userRouter = Router();

userRouter.get("/currentuser", isAuth, getCurrentUser);
userRouter.post("/updateprofile", isAuth, upload.single("photoUrl"), updateProfile);

export default userRouter;