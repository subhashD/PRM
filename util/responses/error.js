module.exports = function(data = {}, message = null, statusCode = 400, customCode = null) {

    // Get access to `req` and `res`
    const req = this.req;
    const res = this.res;
    let responseData = {};
    if (App.lodash.isObject(data)) {
        
        if (data.hasOwnProperty('errors')) {
            responseData.errors = data.errors;
        } else if(data.hasOwnProperty('message')) {
            responseData.errors = data.message;
            console.log('--- in error response ---');
            console.log(data.stack);
        }
    } else if (App.lodash.isNull(data)) {
        statusCode = 404;
    }

    responseData.code = (customCode) ? customCode : statusCode;
    responseData.message = message;
    
    res.status(statusCode);
    return res.json(responseData);

};