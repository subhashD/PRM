module.exports = function(data = {}, message = null, statusCode = 200) {

    // Get access to `req` and `res`
    
    var req = this.req;
    var res = this.res;

    // If no data was provided, use res.sendStatus().
    // if (App.lodash.isUndefined(data)) {
    //     res.status(statusCode);
    //     return res.send();
    // }

    if (App.lodash.isError(data)) {

        // If the error doesn't have a custom .toJSON(), use its `stack` instead--
        // otherwise res.json() would turn it into an empty dictionary.
        // (If this is production, don't send a response body at all.)
        if (! App.lodash.isFunction(data.toJSON)) {
            if (process.env.ENV === 'production') {
                return res.sendStatus(statusCode);
            } else {
                res.status(statusCode);
                return res.send(data.stack);
            }
        }
    }

    // Set status code and send response data.
    
    var responseData = {
        code: statusCode,
        message: message
    };

    if (! App.helpers.isEmpty(data)) {
        responseData.data = data;
    }

    res.status(statusCode);
    return res.json(responseData);

};
