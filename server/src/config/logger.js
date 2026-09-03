import pino from "pino";
<<<<<<< HEAD

const logger = pino({
    level: process.env.LOG_LEVEL || "info",

    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "HH:MM:ss.l",
            ignore: "hostname",
        },
    },
});

=======
import pretty from "pino-pretty";

const prettyStream = pretty({
    colorize: true,
    translateTime: "HH:MM:ss.l",
    ignore: "hostname",
});

const logger = pino(
    {
        level: process.env.LOG_LEVEL || "info",
    },
    prettyStream
);

>>>>>>> d4aeda4 (feat: initialize server with Express, MongoDB, and JWT authentication)
export default logger;