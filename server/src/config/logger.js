import pino from "pino";
<<<<<<< HEAD
import pretty from "pino-pretty";
=======
<<<<<<< HEAD
>>>>>>> 8416ae6d542b288ab2814b8baa7059306ba9d540

const prettyStream = pretty({
    colorize: true,
    translateTime: "HH:MM:ss.l",
    ignore: "hostname",
});

<<<<<<< HEAD
=======
=======
import pretty from "pino-pretty";

const prettyStream = pretty({
    colorize: true,
    translateTime: "HH:MM:ss.l",
    ignore: "hostname",
});

>>>>>>> 8416ae6d542b288ab2814b8baa7059306ba9d540
const logger = pino(
    {
        level: process.env.LOG_LEVEL || "info",
    },
    prettyStream
);

<<<<<<< HEAD
=======
>>>>>>> d4aeda4 (feat: initialize server with Express, MongoDB, and JWT authentication)
>>>>>>> 8416ae6d542b288ab2814b8baa7059306ba9d540
export default logger;