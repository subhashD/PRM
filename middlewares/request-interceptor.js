module.exports = function (app) {
    app.use((req, res, next) => {
        req.allParams = {...{}, ...req.query, ...req.body, ...req.params};
        req.getParam = function(paramName, defaultVal = null) {
            return App.helpers.getObjProp(req.allParams, paramName, defaultVal);
        }

        if(App.config.env == 'development') {
            console.log('All Req Params', req.allParams);
        }
        
        next();
    });
}