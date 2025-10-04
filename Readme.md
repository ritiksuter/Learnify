# LMS System

A full-stack Learning Management System (LMS) built with React (frontend) and Node.js/Express/MongoDB (backend). This platform enables educators to create and manage courses, students to enroll and learn, and provides features like payments, reviews, and AI-powered search.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Frontend Overview](#frontend-overview)
- [Backend Overview](#backend-overview)
- [API Endpoints](#api-endpoints)
- [What does this app do?](#what-does-this-app-do)
- [License](#license)

---

## Project Structure

```
lms-system/
  ├── backend/
  │   ├── src/
  │   ├── public/
  │   ├── .env
  │   ├── .env.sample
  │   └── package.json
  ├── frontend/
  │   ├── src/
  │   ├── public/
  │   ├── .env
  │   └── package.json
  └── Readme.md
```

---

## Setup & Installation

### 1. Clone the repository

```sh
git clone <repo-url>
cd lms-system
```

### 2. Install dependencies

#### Backend
```sh
cd backend
npm install
```

#### Frontend
```sh
cd ../frontend
npm install
```

### 3. Configure environment variables

- Copy `.env.sample` to `.env` in both `backend` and `frontend` folders and fill in your credentials.

### 4. Run the applications

#### Backend
```sh
cd backend
npm run dev
```

#### Frontend
```sh
cd ../frontend
npm start
```

---

## Environment Variables

### Backend

See `backend/.env.sample` for required variables:
- `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `EMAIL`, `EMAIL_PASS`, `RAZORPAY_*`, `GEMINI_API_KEY`, etc.

### Frontend

See `frontend/.env.sample` for required variables:
- `REACT_APP_API_URL`, `REACT_APP_RAZORPAY_KEY`, etc.

---

## Frontend Overview

Built with **React** and supporting libraries (Redux, React Router, Axios, etc.).

### Main Features

- **Authentication**: Signup, login, logout, Google OAuth, password reset (OTP).
- **Course Management**: Browse, search (AI-powered), enroll, view lectures, add reviews.
- **Educator Dashboard**: Create/edit courses, upload lectures, manage students.
- **Profile Management**: Update profile, avatar upload.
- **Payments**: Razorpay integration for course enrollment.
- **Responsive UI**: Modern design, mobile-friendly.
- **Notifications**: Success/error alerts, email notifications.

### Structure

```
frontend/
  ├── src/
  │   ├── components/      # Reusable UI components
  │   ├── pages/           # Main pages (Home, Courses, Profile, Dashboard, etc.)
  │   ├── redux/           # State management
  │   ├── api/             # API calls (Axios)
  │   ├── utils/           # Utility functions
  │   ├── App.js           # Main app component
  │   └── index.js         # Entry point
  ├── public/
  └── package.json
```

---

## Backend Overview

Built with **Node.js**, **Express**, **MongoDB**, and integrations (Cloudinary, Razorpay, Google Gemini AI).

### Main Features

- **Authentication**: JWT-based, Google OAuth, password reset (OTP).
- **Course Management**: CRUD for courses/lectures, file uploads (Cloudinary).
- **User Management**: Profile update, avatar upload.
- **Payments**: Razorpay order creation and verification.
- **Reviews**: Add and fetch course reviews.
- **AI Search**: Natural language course search (Google Gemini).
- **Email Notifications**: OTP for password reset (Nodemailer).
- **RESTful API**: All endpoints for frontend consumption.

### Structure

```
backend/
  ├── src/
  │   ├── controllers/
  │   ├── db/
  │   ├── middlewares/
  │   ├── models/
  │   ├── routes/
  │   ├── utils/
  │   ├── app.js
  │   ├── constants.js
  │   └── index.js
  ├── public/
  ├── .env
  ├── .env.sample
  └── package.json
```

---

## API Endpoints

See [Backend Readme](./backend/Readme.md) for full details.

- **Auth**: `/api/auth/*`
- **User**: `/api/user/*`
- **Course**: `/api/course/*`
- **Payment**: `/api/payment/*`
- **Review**: `/api/review/*`
- **AI Search**: `/api/ai/search`

---

## What does this app do?

This LMS platform enables:

- **Users** to sign up, log in, reset passwords, and manage their profiles.
- **Educators** to create, edit, and manage courses and lectures, including uploading thumbnails and videos.
- **Students** to browse published courses, enroll via Razorpay payments, and access lectures.
- **Reviews** to be added to courses and displayed for feedback.
- **AI Search** for courses using natural language queries.
- **File uploads** (avatars, thumbnails, videos) via Cloudinary.
- **Email notifications** for password reset via OTP.
- **All data** stored in MongoDB, with relationships between users, courses, lectures, reviews, and orders.

The frontend (React) consumes the backend APIs to provide a seamless, modern LMS experience.

---

## License

This project is for educational purposes. See [LICENSE](LICENSE) for details.