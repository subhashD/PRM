let config = {
    /**
     * Your favorite port for running express
     */
    
    port : process.env.PORT || 3000,
    
    /**
     * Application Environment
     */
    env    : process.env.NODE_ENV || 'development',
    
    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
        directory : process.env.LOGDIR || 'logs',
    },
    
    viewEngine : process.env.VIEW_ENGINE || 'html',
    
    /**
     * That long string from mlab
     */
    dbUrl: process.env.DBURL || "mongodb://localhost/test-db",
    
    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET || '',
    jwtAlgorithm: process.env.JWT_ALGO || '',

    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
};

module.exports = config;