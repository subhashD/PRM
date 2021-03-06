const express = require("express");
const dotenv = require('dotenv');
const passport = require('passport');
const routes = require("../routes");
const logger = require("../util/Logger/Logger");
const config = require("../config");
const path = require("path");
const middlewares = require("../middlewares/index");
const globals = require('../config/globals');
const ErrorHandler = require('../util/errors/ErrorHandler');

class ExpressLoader {
  constructor() {
    const app = express();

    // Exporting globals to node environment
    global['App'] = globals;

    // Serve static content
    app.use(express.static(path.join(__dirname, "uploads")));

    // Passport Initialisation
    require('../config/auth/jwt');
    app.use(passport.initialize());
    
    //pass app to middlewares
    middlewares(app);
    
    //pass app to routes
    app.use(config.api.prefix, routes());
    // handle 404 errors here
    app.use(function (req, res, next) {
      res.error([], 'Unable to find the requested resource!', 404);
    });

    // Handling Errors (Global Handler)
    app.use(ErrorHandler);

    // start application
    this.server = app.listen(config.port, () => {
      logger.info(`Express running, Now listening on port ${config.port}`);
    });
  }

  get Server() {
    return this.server;
  }

}

module.exports = ExpressLoader;
