import pretty from "pino-pretty";

export default (opts) =>
    pretty({
        ...opts,

        messageFormat: (log, messageKey, levelLabel, { colors }) => {
            const statusCode = log.res?.statusCode;

            let coloredStatus = statusCode;

            if (statusCode >= 200 && statusCode < 300) {
                coloredStatus = colors.green(statusCode);
            } else if (statusCode >= 300 && statusCode < 400) {
                coloredStatus = colors.cyan(statusCode);
            } else if (statusCode >= 400 && statusCode < 500) {
                coloredStatus = colors.yellow(statusCode);
            } else if (statusCode >= 500) {
                coloredStatus = colors.red(statusCode);
            }

            return `${log[messageKey]} | ${coloredStatus}`;
        },
    });