import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String
    },
    role: {
      type: String,
      enum: ["educator", "student"],
      required: true
    },
    photoUrl: {
      type: String,
      default: ""
    },
    enrolledCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
    resetOtp:{
      type:String
    },
    otpExpires:{
      type:Date
    },
    isOtpVerifed:{
      type:Boolean,
      default:false
    }
  },{ timestamps: true });


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function() {
    return jwt.sign (
        {
            _id: this._id,
            email: this.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);