<<<<<<< HEAD
import {
    signupUser,
    loginUser,
} from "../services/auth.service.js";

import {
    forgotPassword,
    resetPassword,
} from "../services/passwordReset.service.js";

import {
    cookieOptions,
} from "../utils/generateToken.js";
=======
<<<<<<< HEAD
import bcrypt from "bcryptjs";
>>>>>>> 8416ae6d542b288ab2814b8baa7059306ba9d540

import logger from "../config/logger.js";

<<<<<<< HEAD

=======
=======
import {
    signupUser,
    loginUser,
} from "../services/auth.service.js";

import {
    forgotPassword,
    resetPassword,
} from "../services/passwordReset.service.js";

import {
    cookieOptions,
} from "../utils/generateToken.js";

import logger from "../config/logger.js";


>>>>>>> d4aeda4 (feat: initialize server with Express, MongoDB, and JWT authentication)
>>>>>>> 8416ae6d542b288ab2814b8baa7059306ba9d540
// ==================== SIGNUP ====================

export const signup = async (req, res, next) => {
    try {
<<<<<<< HEAD
        const user = await signupUser(req.body);

        logger.info(
            { userId: user.id },
=======
<<<<<<< HEAD
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        // const token = generateToken(user._id.toString());

        // res.cookie("token", token, cookieOptions);

        logger.info(
            { userId: user._id },
=======
        const user = await signupUser(req.body);

        logger.info(
            { userId: user.id },
>>>>>>> d4aeda4 (feat: initialize server with Express, MongoDB, and JWT authentication)
>>>>>>> 8416ae6d542b288ab2814b8baa7059306ba9d540
            "User registered successfully"
        );

        return res.status(201).json({
            success: true,
            message: "Signup successful",
<<<<<<< HEAD
            user,
=======
<<<<<<< HEAD
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
=======
            user,
>>>>>>> d4aeda4 (feat: initialize server with Express, MongoDB, and JWT authentication)
>>>>>>> 8416ae6d542b288ab2814b8baa7059306ba9d540
        });

    } catch (error) {
        next(error);
    }
};

<<<<<<< HEAD
=======

>>>>>>> d4aeda4 (feat: initialize server with Express, MongoDB, and JWT authentication)
// ==================== LOGIN ====================

export const login = async (req, res, next) => {
    try {
<<<<<<< HEAD
        const { token, user } = await loginUser(req.body);
=======
<<<<<<< HEAD
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({
            email: normalizedEmail,
        }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user._id.toString());
=======
        const { token, user } = await loginUser(req.body);
>>>>>>> d4aeda4 (feat: initialize server with Express, MongoDB, and JWT authentication)
>>>>>>> 8416ae6d542b288ab2814b8baa7059306ba9d540

        res.cookie("token", token, cookieOptions);

        logger.info(
<<<<<<< HEAD
            { userId: user.id },
            "User logged in successfully"
=======
<<<<<<< HEAD
            `Logged in successfully. UserID: ${user._id}`
=======
            { userId: user.id },
            "User logged in successfully"
>>>>>>> d4aeda4 (feat: initialize server with Express, MongoDB, and JWT authentication)
>>>>>>> 8416ae6d542b288ab2814b8baa7059306ba9d540
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
<<<<<<< HEAD
            user,
=======
<<<<<<< HEAD
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
=======
            user,
>>>>>>> d4aeda4 (feat: initialize server with Express, MongoDB, and JWT authentication)
>>>>>>> 8416ae6d542b288ab2814b8baa7059306ba9d540
        });

    } catch (error) {
        next(error);
    }
};

<<<<<<< HEAD
=======

>>>>>>> d4aeda4 (feat: initialize server with Express, MongoDB, and JWT authentication)
// ==================== LOGOUT ====================

export const logout = async (req, res, next) => {
    try {
<<<<<<< HEAD
        res.clearCookie("token", cookieOptions);
=======
<<<<<<< HEAD
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"
                ? "none"
                : "lax",
        });
=======
        res.clearCookie("token", cookieOptions);
>>>>>>> d4aeda4 (feat: initialize server with Express, MongoDB, and JWT authentication)
>>>>>>> 8416ae6d542b288ab2814b8baa7059306ba9d540

        logger.info("User logged out successfully");

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });

    } catch (error) {
        next(error);
    }
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 8416ae6d542b288ab2814b8baa7059306ba9d540
};

// ==================== FORGOT PASSWORD ====================

export const forgotPasswordController = async (
    req,
    res,
    next
) => {
    try {
        const { email } = req.body;

        await forgotPassword(email); 

        return res.status(200).json({
            success: true,
            message:
                "If an account exists with this email, a password reset link has been sent.",
        });

    } catch (error) {
        next(error);
    }
};


// ==================== RESET PASSWORD ====================

export const resetPasswordController = async (
    req,
    res,
    next
) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        await resetPassword(token, password);
        
        

        return res.status(200).json({
            success: true,
            message: "Password reset successful",
        });

    } catch (error) {
        next(error);
    }
<<<<<<< HEAD
=======
>>>>>>> d4aeda4 (feat: initialize server with Express, MongoDB, and JWT authentication)
>>>>>>> 8416ae6d542b288ab2814b8baa7059306ba9d540
};