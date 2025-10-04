# LMS System Backend

This is the backend for a Learning Management System (LMS) built with Node.js, Express, and MongoDB. It provides RESTful APIs for user authentication, course management, payments, reviews, and AI-powered course search.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Core Components](#core-components)
  - [Controllers](#controllers)
  - [Database](#database)
  - [Middlewares](#middlewares)
  - [Models](#models)
  - [Routes](#routes)
  - [Utils](#utils)
  - [App Initialization](#app-initialization)
  - [Constants](#constants)
  - [Entry Point](#entry-point)
  - [Public Directory](#public-directory)
- [API Endpoints](#api-endpoints)
- [What does this app do?](#what-does-this-app-do)
- [License](#license)

---

## Project Structure

```
backend/
  ├── .env
  ├── .env.sample
  ├── package.json
  ├── public/
  │   └── temp/
  └── src/
      ├── app.js
      ├── constants.js
      ├── index.js
      ├── controllers/
      ├── db/
      ├── middlewares/
      ├── models/
      ├── routes/
      └── utils/
```

---

## Setup & Installation

1. **Clone the repository**
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.sample` to `.env` and fill in your credentials.
4. **Run the server**
   ```sh
   npm run dev
   ```
   The server runs on the port specified in `.env` (default: 8000).

---

## Environment Variables

See [`.env.sample`](.env.sample) for all required variables:

- `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `EMAIL`, `EMAIL_PASS`, `RAZORPAY_*`, `GEMINI_API_KEY`, etc.

---

## Core Components

### Controllers

Located in [`src/controllers/`](src/controllers):

- [`auth.controller.js`](src/controllers/auth.controller.js): Handles signup, login, logout, password reset (OTP), Google signup.
- [`course.controller.js`](src/controllers/course.controller.js): CRUD for courses and lectures, get published/creator courses, edit/remove courses/lectures.
- [`user.controller.js`](src/controllers/user.controller.js): Get current user, update profile (with Cloudinary upload).
- [`review.controller.js`](src/controllers/review.controller.js): Add review, get all reviews, get course reviews.
- [`order.controller.js`](src/controllers/order.controller.js): Create and verify Razorpay orders.
- [`ai.controller.js`](src/controllers/ai.controller.js): AI-powered course search using Google Gemini.

### Database

- [`db/index.js`](src/db/index.js): Connects to MongoDB using Mongoose and the database name from [`constants.js`](src/constants.js).

### Middlewares

Located in [`src/middlewares/`](src/middlewares):

- [`isAuth.js`](src/middlewares/isAuth.js): JWT authentication middleware.
- [`multer.js`](src/middlewares/multer.js): Handles file uploads for avatars, thumbnails, videos.

### Models

Located in [`src/models/`](src/models):

- [`user.model.js`](src/models/user.model.js): User schema (name, email, password, role, avatar, enrolled courses, OTP for password reset).
- [`course.model.js`](src/models/course.model.js): Course schema (title, category, description, price, lectures, reviews, creator, published status).
- [`lecture.model.js`](src/models/lecture.model.js): Lecture schema (title, video URL, preview status).
- [`review.model.js`](src/models/review.model.js): Review schema (course, user, rating, comment).
- [`order.model.js`](src/models/order.model.js): Order schema for payments.

### Routes

Located in [`src/routes/`](src/routes):

- [`auth.routes.js`](src/routes/auth.routes.js): `/api/auth` (signup, login, logout, OTP, Google signup).
- [`course.routes.js`](src/routes/course.routes.js): `/api/course` (course and lecture management).
- [`user.routes.js`](src/routes/user.routes.js): `/api/user` (profile management).
- [`payment.routes.js`](src/routes/payment.routes.js): `/api/payment` (Razorpay integration).
- [`ai.routes.js`](src/routes/ai.routes.js): `/api/ai` (AI search).
- [`review.route.js`](src/routes/review.route.js): `/api/review` (add/get reviews).

### Utils

Located in [`src/utils/`](src/utils):

- [`cloudinary.js`](src/utils/cloudinary.js): Uploads files to Cloudinary and returns URLs.
- [`Mail.js`](src/utils/Mail.js): Sends OTP emails via Nodemailer.

### App Initialization

- [`app.js`](src/app.js): Sets up Express app, CORS, cookie parser, JSON parsing, static files, and mounts all routers.

### Constants

- [`constants.js`](src/constants.js): Exports database name.

### Entry Point

- [`index.js`](src/index.js): Loads environment, connects to DB, starts the server.

### Public Directory

- [`public/`](public): Stores uploaded files (avatars, thumbnails, videos).

---

## API Endpoints

### Auth

- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `POST /api/auth/sendotp` - Send OTP for password reset
- `POST /api/auth/verifyotp` - Verify OTP
- `POST /api/auth/resetPassword` - Reset password
- `POST /api/auth/googlesignup` - Google signup/login

### User

- `GET /api/user/currentuser` - Get current user (auth required)
- `POST /api/user/updateprofile` - Update profile (auth required, avatar upload)

### Course

- `POST /api/course/create` - Create course (auth required)
- `GET /api/course/getpublishedcoures` - Get all published courses
- `GET /api/course/getcreatorcourses` - Get courses by creator (auth required)
- `POST /api/course/editcourse/:courseId` - Edit course (auth required, thumbnail upload)
- `GET /api/course/getcourse/:courseId` - Get course by ID (auth required)
- `DELETE /api/course/removecourse/:courseId` - Remove course (auth required)
- `POST /api/course/createlecture/:courseId` - Create lecture (auth required)
- `GET /api/course/getcourselecture/:courseId` - Get lectures for a course
- `POST /api/course/editlecture/:lectureId` - Edit lecture (auth required, video upload)
- `DELETE /api/course/removelecture/:lectureId` - Remove lecture (auth required)
- `POST /api/course/getcreator` - Get creator by ID (auth required)

### Payment

- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify-payment` - Verify payment and enroll user

### Review

- `POST /api/review/givereview` - Add review (auth required)
- `GET /api/review/allReview` - Get all reviews

### AI Search

- `POST /api/ai/search` - Search courses using AI (Google Gemini)

---

## What does this app do?

This backend powers a full-featured Learning Management System (LMS) where:

- **Users** can sign up, log in, reset passwords (with OTP), and update their profiles.
- **Educators** can create, edit, and manage courses and lectures, including uploading thumbnails and videos.
- **Students** can browse published courses, enroll via Razorpay payments, and access lectures.
- **Reviews** can be added to courses, and all reviews can be fetched for display.
- **AI Search** allows users to search for courses using natural language queries, leveraging Google Gemini AI to match user intent to course categories.
- **File uploads** (avatars, thumbnails, videos) are handled via Cloudinary.
- **Email notifications** (for password reset) are sent using Nodemailer.
- **All data** is stored in MongoDB, with relationships between users, courses, lectures, reviews, and orders.

This backend is designed to be consumed by a frontend (such as React), providing all necessary endpoints for a modern, scalable LMS platform.

---

## License

This project is for educational purposes. See [LICENSE](LICENSE) for details.
