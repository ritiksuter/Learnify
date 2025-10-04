import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   }),
// );

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173", credentials: true}));







// Routes of our application -->

import authRouter from "./routes/auth.routes.js";
import courseRouter from "./routes/course.routes.js";
import userRouter from "./routes/user.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import aiRouter from "./routes/ai.routes.js";
import reviewRouter from "./routes/review.route.js";

app.get("/", (req, res) => {
    res.send("This is for testing")
})

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/ai", aiRouter);
app.use("/api/review", reviewRouter);





export { app };