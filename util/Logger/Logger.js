const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const config = require('../../config/index');

const logFile = "log_%DATE%.log";

const dailyRotateTransport = new DailyRotateFile({
    filename: config.logs.directory + '/' + logFile,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    prepend: true,
    level: config.logs.level,
   });

const transports = [
    dailyRotateTransport,
    new winston.transports.Console({level: "info",}),
];

const logger = winston.createLogger( {
    format: winston.format.json(),
    defaultMeta: {
        service: "personal-relationship-service",
        time: new Date().toISOString()
    },
    transports: transports
} );

module.exports = logger;