import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import env from "../config/env.js";
import logger from "../config/logger.js";

export default function GoogleMiddleware() {
    /*
    |--------------------------------------------------------------------------
    | Validate Environment Variables
    |--------------------------------------------------------------------------
    */

    if (!env.GOOGLE_CLIENT_ID) {
        logger.warn("GOOGLE_CLIENT_ID is not configured");
        return;
    }

    if (!env.GOOGLE_CLIENT_SECRET) {
        logger.warn("GOOGLE_CLIENT_SECRET is not configured");
        return;
    }

    if (!env.GOOGLE_CALLBACK_URL) {
        logger.warn("GOOGLE_CALLBACK_URL is not configured");
        return;
    }

    /*
    |--------------------------------------------------------------------------
    | Google OAuth Strategy
    |--------------------------------------------------------------------------
    */

    passport.use(
        new GoogleStrategy(
            {
                clientID: env.GOOGLE_CLIENT_ID,
                clientSecret: env.GOOGLE_CLIENT_SECRET,
                callbackURL: env.GOOGLE_CALLBACK_URL,
            },

            async (accessToken, refreshToken, profile, done) => {
                try {
                    /*
                     * Google profile:
                     *
                     * profile.id
                     * profile.displayName
                     * profile.name
                     * profile.emails
                     * profile.photos
                     */

                    const googleUser = {
                        googleId: profile.id,
                        name: profile.displayName,
                        firstName: profile.name?.givenName || "",
                        lastName: profile.name?.familyName || "",
                        email: profile.emails?.[0]?.value || null,
                        profileImage: profile.photos?.[0]?.value || null,
                    };

                    /*
                     * TODO:
                     *
                     * Find the user in MongoDB.
                     *
                     * If user exists:
                     *   return existing user
                     *
                     * If user doesn't exist:
                     *   create user
                     *
                     * Example:
                     *
                     * const user = await User.findOne({
                     *   googleId: profile.id
                     * });
                     *
                     * if (!user) {
                     *   const newUser = await User.create(googleUser);
                     *   return done(null, newUser);
                     * }
                     *
                     * return done(null, user);
                     */

                    return done(null, googleUser);
                } catch (error) {
                    logger.error(
                        {
                            error,
                            message: error.message,
                        },
                        "Google OAuth authentication failed"
                    );

                    return done(error, null);
                }
            }
        )
    );

    /*
    |--------------------------------------------------------------------------
    | Passport Serialization
    |--------------------------------------------------------------------------
    */

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    /*
    |--------------------------------------------------------------------------
    | Initialize Passport
    |--------------------------------------------------------------------------
    */

    return passport;
}