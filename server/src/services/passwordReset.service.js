import crypto from "crypto";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import env from "../config/env.js";

import { sendPasswordResetEmail } from "./email.service.js";


// ==================== FORGOT PASSWORD ====================

export const forgotPassword = async (email) => {
    if (!email) {
        const error = new Error("Email is required");
        error.statusCode = 400;
        throw error;
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
        email: normalizedEmail,
    });

    if (!user) {
        const error = new Error("User with this email does not exist");
        error.statusCode = 404;
        throw error;
    }

    // Generate raw reset token
    const resetToken = crypto
        .randomBytes(32)
        .toString("hex");

    // Store only hashed token
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.resetPasswordToken = hashedToken;

    // 15-minute expiration
    user.resetPasswordExpires =
        Date.now() + 15 * 60 * 1000;

    await user.save();

    // Link sent to user's email
    const resetUrl =
        `${env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendPasswordResetEmail(
        user.email,
        resetUrl
    );
    
    return resetUrl;
};


// ==================== RESET PASSWORD ====================

export const resetPassword = async (
    resetToken,
    newPassword
) => {
    if (!resetToken || !newPassword) {
        const error = new Error(
            "Reset token and new password are required"
        );

        error.statusCode = 400;
        throw error;
    }

    if (newPassword.length < 6) {
        const error = new Error(
            "Password must be at least 6 characters"
        );

        error.statusCode = 400;
        throw error;
    }

    // Hash token from reset URL
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: {
            $gt: Date.now(),
        },
    });

    if (!user) {
        const error = new Error(
            "Invalid or expired reset token"
        );

        error.statusCode = 400;
        throw error;
    }

    // Hash new password
    user.password = await bcrypt.hash(
        newPassword,
        12
    );

    // Invalidate reset token
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();
};