const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const helmet = require('helmet');
const path = require("path");
const compression = require("compression");
const routes = require("../routes");
const logger = require("../services/Logger");
const config = require("../config");
const middlewares = require("../middlewares/index");
// const auth = require('../middlewares/auth');

class ExpressLoader {
  constructor() {
    const app = express();

    // adding Helmet to enhance your API's security
    app.use(helmet());
    
    // using bodyParser to parse JSON bodies into JS objects
    app.use(
      bodyParser.urlencoded({
        extended: false,
        limit: "20mb",
      })
    );

    app.use(bodyParser.json({ limit: "20mb" }));

    // enabling CORS for all requests
    app.use(cors());
      
    // adding morgan to log HTTP requests
    app.use(morgan(config.env));

    app.use(compression());

    //Setup error handling

    // Serve static content
    app.use(express.static(path.join(__dirname, "uploads")));
    
    
    //pass app to middlewares
    middlewares(app);
    
    //pass app to routes
    app.use(config.api.prefix, routes());

    // start application
    this.server = app.listen(config.port, () => {
      logger.info(`Express running, Now listening on port ${config.port}`);
    });
  }

  get Server() {
    return this.server;
  }

  /**
   * @description Default error handler to be used with express
   * @param error Error object
   * @param req {object} Express req object
   * @param res {object} Express res object
   * @param next {function} Express next object
   * @returns {*}
   */
  static errorHandler(error, req, res, next) {
    let parsedError;

    // Attempt to gracefully parse error object
    try {
      if (error && typeof error === "object") {
        parsedError = JSON.stringify(error);
      } else {
        parsedError = error;
      }
    } catch (e) {
      logger.error(e);
    }

    // Log the original error
    logger.error(parsedError);

    // If response is already sent, don't attempt to respond to client
    if (res.headersSent) {
      return next(error);
    }

    res.status(400).json({
      success: false,
      error,
    });
  }
}

module.exports = ExpressLoader;
