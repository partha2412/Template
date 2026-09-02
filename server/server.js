import createApp from "./src/app.js";
import connectDB from "./src/database/db.js";
import logger from "./src/config/logger.js";
import env from "./src/config/env.js";

const startServer = async () => {
    try {
        await connectDB();

        const app = createApp();

        app.listen(env.PORT, () => {
            logger.info(
                { port: env.PORT },
                "Server is running"
            );
        });
    } catch (error) {
        logger.error(
            { error },
            "Failed to start server"
        );
        process.exit(1);
    }
};

startServer();