import razorpay from "razorpay";
import Course from "../models/course.model.js";
import { User } from "../models/user.model.js";

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "Not Present Yet",
  key_secret: process.env.RAZORPAY_SECRET || "Not Present Yet",
});

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found." });

    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `${courseId}.toString()`,
    };

    const order = await razorpayInstance.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Order creation failed ${err}, Try again !` });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, courseId, userId } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const user = await User.findById(userId);
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }

      const course = await Course.findById(courseId).populate("lectures");
      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
        await course.save();
      }
      return res
        .status(200)
        .json({ message: "Payment Verified successfully..." });
    } else {
      return res.status(400).json({ message: "Payment Verification Failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Internal Server error." });
  }
};
