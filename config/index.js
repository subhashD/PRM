let config = {
    port : process.env.PORT || 3000,
    env    : process.env.NODE_ENV || 'development',
    logDir : process.env.LOGDIR || 'logs',
    viewEngine : process.env.VIEW_ENGINE || 'html',
    dbUrl: process.env.DBURL || "mongodb://localhost/test-db",
};

module.exports = config;