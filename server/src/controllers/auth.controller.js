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


// ==================== SIGNUP ====================

export const signup = async (req, res, next) => {
    try {
        const user = await signupUser(req.body);

        logger.info(
            { userId: user.id },
            "User registered successfully"
        );

        return res.status(201).json({
            success: true,
            message: "Signup successful",
            user,
        });

    } catch (error) {
        next(error);
    }
};

// ==================== LOGIN ====================

export const login = async (req, res, next) => {
    try {
        const { token, user } = await loginUser(req.body);

        res.cookie("token", token, cookieOptions);

        logger.info(
            { userId: user.id },
            "User logged in successfully"
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user,
        });

    } catch (error) {
        next(error);
    }
};

// ==================== LOGOUT ====================

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("token", cookieOptions);

        logger.info("User logged out successfully");

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });

    } catch (error) {
        next(error);
    }
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
};