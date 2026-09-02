import env from "../config/env.js";
import logger from "../config/logger.js";

const errorHandler = (error, req, res, next) => {
    logger.error(
        {
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },

            method: req.method,
            url: req.originalUrl,
        },
        "request error"
    );

    const statusCode = error.statusCode || error.status || 500;

    res.status(statusCode).json({
        success: false,

        message:
            env.NODE_ENV === "production"
                ? "Internal server error"
                : error.message,

        ...(env.NODE_ENV !== "production" && {
            stack: error.stack,
        }),
    });
};

export default errorHandler;