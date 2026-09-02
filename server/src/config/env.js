import "dotenv/config";

const env = {
    NODE_ENV: process.env.NODE_ENV || "development",

    PORT: Number(process.env.PORT) || 3000,

    MONGO_URI: process.env.MONGO_URI,

    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

    JWT_SECRET: process.env.JWT_SECRET,
    TOKEN_EXP_TIME: process.env.TOKEN_EXP_TIME,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,

    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    GOOGLE_CALLBACK_URL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:3000/api/user/google/callback",

    LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

export default env;