import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import generateAccessToken from "../utils/generateAccessToken.js";

const registerUser = async (req, res) => {
    try {
        const { fullname, email, password, confirmPassword } = req.body;
        if (
            [fullname, email, password, confirmPassword].some(
                (field) => !field || field.trim() === ""
            )
        ) {
            return res.status(400).json({
                message: "Provide email, name, password ,confirmPassword",
                error: true,
                success: false,
            });
        }
        if (confirmPassword !== password) {
            return res.status(400).json({
                message: "confirm password is not match",
                success: false,
                error: true,
            });
        }
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                message: "email is allready exist",
                error: true,
                success: false,
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullname,
            email,
            password: hashPassword,
        });

        const createUser = await User.findById(user._id).select("-password");
        if (!createUser) {
            return res.status(500).json({
                message: "something went wrong while registering the user",
                error: true,
                success: false,
            });
        }
        const accessToken = await generateAccessToken(user._id);
        const option = {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        };
        return res.status(201).cookie("accessToken", accessToken, option).json({
            message: "user registered successfully",
            user: createUser,
            accessToken: accessToken,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if ([email, password].some((field) => !field || field.trim() === "")) {
            return res.status(400).json({
                message: "Provide email and password",
                error: true,
                success: false,
            });
        }
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(400).json({
                message: "User not register",
                error: true,
                success: false,
            });
        }
        const checkPassword = await bcrypt.compare(
            password,
            existUser.password
        );
        if (!checkPassword) {
            return res.status(400).json({
                message: "check your password",
                error: true,
                success: false,
            });
        }
        const accessToken = await generateAccessToken(existUser._id);
        // console.log(accessToken);

        const option = {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        };
        return res.status(200).cookie("accessToken", accessToken, option).json({
            message: "login successfully",
            user: existUser,
            data: accessToken,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const logout = async (req, res) => {
    try {
        const option = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };
        return res.status(200).clearCookie("accessToken", option).json({
            message: "user logged out",
            success: true,
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const allUserExceptOnline = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const alluser = await User.find({ _id: { $ne: loggedInUser } }).select(
            "-password"
        );
        return res.status(201).json({
            data: alluser,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

export { registerUser, login, logout, allUserExceptOnline };
