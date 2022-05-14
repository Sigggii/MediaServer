import winston, { LoggerOptions, format, transports } from 'winston'
import 'winston-daily-rotate-file'

const logFormat: winston.Logform.Format = winston.format.combine(
    format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json()
)

const logConfiguration: LoggerOptions = {
    transports: [
        new transports.Console({
            format: logFormat,
        }),
        new transports.DailyRotateFile({
            filename: 'logs/media-server_%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            maxFiles: '14d',
            format: logFormat,
            silent: process.env.NODE_ENV?.trim() === 'test',
        }),
    ],
}

const logger = winston.createLogger(logConfiguration)

export default logger
