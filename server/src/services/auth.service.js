import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";


// ==================== SIGNUP ====================

export const signupUser = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        const error = new Error(
            "Name, email and password are required"
        );
        error.statusCode = 400;
        throw error;
    }

    if (password.length < 6) {
        const error = new Error(
            "Password must be at least 6 characters"
        );
        error.statusCode = 400;
        throw error;
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
        email: normalizedEmail,
    });

    if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
    };
};


// ==================== LOGIN ====================

export const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        const error = new Error(
            "Email and password are required"
        );
        error.statusCode = 400;
        throw error;
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
        email: normalizedEmail,
    }).select("+password");

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user._id.toString());

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};