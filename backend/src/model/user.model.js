import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            require: [true, "password is required"],
        },
        confirmPassword: {
            type: String,
            require: [true, "password is required"],
        },
        token: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
export const User = mongoose.model("User", userSchema);
