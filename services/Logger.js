const winston = require('winston');

const logger = winston.createLogger( {
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: "personal-relationship-service",
        time: new Date().toISOString()
    },
    transports: [
        new winston.transports.File( { filename: "logs/error.log", level: 'error'} ),
        new winston.transports.File( { filename: "logs/combined.log"} ),
    ]
} );

module.exports = logger;