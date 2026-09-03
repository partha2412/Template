import express from "express";

import {
    signup,
    login,
    logout,
    forgotPasswordController,
    resetPasswordController,
} from "../controllers/auth.controller.js";

import { isAuth } from "../middlewares/auth.middleware.js";

import {
    validateLogin,
    validateSignup,
    validateForgotPassword,
} from "../middlewares/auth.validation.middleware.js";

const router = express.Router();


// ==================== AUTH ====================

// Signup
router.post(
    "/signup",
    validateSignup,
    signup
);

// Login
router.post(
    "/login",
    validateLogin,
    login
);

// Logout
router.post(
    "/logout",
    isAuth,
    logout
);


// ==================== PASSWORD RESET ====================

// Request password reset
router.post(
    "/forgot-password",
    validateForgotPassword,
    forgotPasswordController
);

// Reset password
router.post(
    "/reset-password/:token",
    resetPasswordController
);


export default router;
