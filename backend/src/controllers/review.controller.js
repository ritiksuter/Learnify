import Course from "../models/course.model.js";
import Review from "../models/review.model.js";

export const addReview = async (req, res) => {
    try {
        const { rating, comment ,courseId} = req.body;
        const userId = req.user._id;
        const course = await Course.findById(courseId);

        if (!course) return res.status(404).json({ message: "Course not found" });

        const alreadyReviewed = await Review.findOne({ course: courseId, user: userId });

        if (alreadyReviewed) return res.status(400).json({ message: "You have already reviewed this course" });

        const review = new Review({
            course: courseId,
            user: userId,
            rating,
            comment,
        });

        await review.save();

        course.reviews.push(review._id);
        await course.save();

        return res.status(201).json(review);
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

export const getCourseReviews = async (req, res) => {
    try {
        const { courseId } = req.params;
        const reviews = await Review.find({ course: courseId });
        return res.status(200).json(reviews);
    } 
    catch (error) {
        return res.status(500).json({ message: "Error fetching reviews" });
    }
}

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({}).populate("user", "name photoUrl role").sort({reviewedAt: -1});

        return res.status(200).json(reviews);
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch reviews" });
    }
}