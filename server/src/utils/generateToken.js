import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        env.JWT_SECRET,
        {
            expiresIn: env.TOKEN_EXP_TIME,
        }
    );
};

export const cookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
