import pino from "pino";
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

export default logger;