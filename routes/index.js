const express = require('express');
const asyncHandler = require('express-async-handler');
const middlewares = require('../middlewares/configurator');

//validator
const {checkSchema} = require('express-validator');
const validateRules = require('../requests/validateRules');

// routes
const authRoutes = require('./auth-routes/index');
const userRoutes = require('./user-routes/index');
const genderRoutes = require('./gender-routes/index');
const contactRoutes = require('./contact-routes/index');

let routes = () => {

    const ApiRoutes = {
        // [`GET config`]: {
        //     action: HomeController.config,
        //     name: "api.config",
        //     middlewares: [
        //         // 'apiSecret',
        //         // 'auth.jwt'
        //     ]
        // },
    
    
        ...authRoutes,
        ...userRoutes,
        ...genderRoutes,
        ...contactRoutes,
    };

    return processRoutes(ApiRoutes, [])
};


module.exports = routes;

function processRoutes(route, globalMiddlewares = []) {
    const Router = express.Router();

    for(let routeKey in route) {
        let middlewareArr = [];
        let routeMiddlewareArr = App.lodash.uniq(route[routeKey]['middlewares'].concat(globalMiddlewares));
        
        for(let middlewareIndex in routeMiddlewareArr) {
            let middleware = getComputedMiddleware(App.helpers.getObjProp(routeMiddlewareArr, middlewareIndex));
            
            if(middleware) {
                middlewareArr.push(asyncHandler(middleware));
            }
        }
        
        let routeValidatorName = route[routeKey]['validator'];
        if(! App.helpers.isEmpty(routeValidatorName)) {
            let routeValidator = getComputedValidator(routeValidatorName);
            if(routeValidator) {
                middlewareArr.push(asyncHandler(routeValidator));
            }
        }

        // For error handling in async operations
        let action = asyncHandler(route[routeKey]['action']);

        let routeKeyArr = routeKey.split(' ');

        switch(routeKeyArr[0]) {
            case 'GET':
                Router.get(`/${routeKeyArr[1]}`, middlewareArr, action);
                break;

            case 'POST':
                Router.post(`/${routeKeyArr[1]}`, middlewareArr, action);
                break;

            case 'PUT':
                Router.put(`/${routeKeyArr[1]}`, middlewareArr, action);
                break;

            case 'PATCH':
                Router.patch(`/${routeKeyArr[1]}`, middlewareArr, action);
                break;

            case 'DELETE':
                Router.delete(`/${routeKeyArr[1]}`, middlewareArr, action);
                break;
        }
    }
    return Router;
}

function getComputedMiddleware(middlewareStr) {
    if(! App.lodash.isString(middlewareStr)) {
        return null;
    }

    let middlewareStrArr = middlewareStr.split(':');
    let middlewareName = middlewareStrArr[0];

    if(middlewareStrArr.length == 2) {
        let middlewareArgs = middlewareStrArr[1];
        let argsArr = middlewareArgs.split('|');
        let middlewareMethod = App.helpers.getObjProp(middlewares, middlewareName);
        return middlewareMethod(...argsArr);
    }

    return App.helpers.getObjProp(middlewares, middlewareStr);
}

function getComputedValidator(validatorRequest) {
    return validateRules(checkSchema(validatorRequest))
}