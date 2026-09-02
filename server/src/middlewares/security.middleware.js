import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import env from "../config/env.js";

export default function securityMiddleware(app) {
    /*
    |--------------------------------------------------------------------------
    | Hide Express Information
    |--------------------------------------------------------------------------
    */

    app.disable("x-powered-by");

    /*
    |--------------------------------------------------------------------------
    | Helmet
    |--------------------------------------------------------------------------
    */

    app.use(
        helmet({
            crossOriginResourcePolicy: {
                policy: "cross-origin",
            },

            contentSecurityPolicy:
                env.NODE_ENV === "production"
                    ? undefined
                    : false,
        })
    );

    /*
    |--------------------------------------------------------------------------
    | CORS
    |--------------------------------------------------------------------------
    */

    const allowedOrigins = env.CLIENT_URL
        ? env.CLIENT_URL
            .split(",")
            .map((origin) => origin.trim())
            .filter(Boolean)
        : [];

    app.use(
        cors({
            origin: (origin, callback) => {
                // Allow requests without an Origin header
                // (Postman, server-to-server requests, etc.)
                if (!origin) {
                    return callback(null, true);
                }

                if (allowedOrigins.includes(origin)) {
                    return callback(null, true);
                }

                return callback(
                    new Error(`CORS blocked origin: ${origin}`)
                );
            },

            credentials: true,

            methods: [
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS",
            ],

            allowedHeaders: [
                "Content-Type",
                "Authorization",
                "Accept",
                "Origin",
                "X-Requested-With",
            ],

            exposedHeaders: [],

            maxAge: 86400,
        })
    );

    /*
    |--------------------------------------------------------------------------
    | Compression
    |--------------------------------------------------------------------------
    */

    app.use(
        compression({
            threshold: 1024,
        })
    );
}