import {Router} from "express";
import { addReview, getAllReviews } from "../controllers/review.controller.js";
import isAuth from "../middlewares/isAuth.js";

let reviewRouter = Router();

reviewRouter.post("/givereview",isAuth,addReview);
reviewRouter.get("/allReview",getAllReviews);


export default reviewRouter;