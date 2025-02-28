import { Router } from "express";
import {
    registerUser,
    login,
    logout,
    allUserExceptOnline,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/allUserExceptOnline").get(verifyJWT, allUserExceptOnline);

export default router;
