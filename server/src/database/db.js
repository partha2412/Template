import mongoose from "mongoose";

import env from "../config/env.js";
import logger from "../config/logger.js";

const connectDB = async () => {
    if (!env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in .env");
    }

    try {
        await mongoose.connect(env.MONGO_URI);

        logger.info("your database is connected successfully");

        mongoose.connection.on("disconnected", () => {
            logger.warn("database disconnected");
        });

        mongoose.connection.on("reconnected", () => {
            logger.info("database reconnected");
        });

        mongoose.connection.on("error", (error) => {
            logger.error({ error }, "database connection error");
        });

    } catch (error) {
        logger.error(
            { error },
            "there is an error while connecting to database"
        );

        throw error;
    }
};

export default connectDB;