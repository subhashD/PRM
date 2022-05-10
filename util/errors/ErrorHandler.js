const ImportError = require('./ImportError');
const GenericError = require('./GenericError');
const ForbiddenError = require('./ForbiddenError');
const ValidationError = require('./ValidationError');
const UnauthorizedError = require('./UnauthorizedError');
const ModelNotFoundError = require('./ModelNotFoundError');
const InvalidSecretError = require('./InvalidSecretError');
const NotFoundError = require('./NotFoundError');

module.exports = function (err, req, res, next) {
    
    // use logger here

    switch (err.constructor) {
        case InvalidSecretError:
            return res.error(err, err.message, err.status);
        
        case UnauthorizedError:
            return res.error(err, err.message, 401, err.customCode);

        case ValidationError:
            return res.error(err, err.message, 422, err.customCode);

        case GenericError:
            return res.error(err, err.message, err.status, err.customCode);

        case ModelNotFoundError:
            return res.error(err, err.message, 400, err.customCode);

        case ImportError:
            return res.error(err, err.message, 400, err.customCode);

        case ForbiddenError:
            return res.error(err, err.message, 403, err.customCode);
        
        case NotFoundError:
            return res.error(err, err.message, 404, err.customCode);

        default:
            if(! App.env.APP_DEBUG) {
                return res.error(new Error("Something went wrong, Please try again later!"), '', 500);
            }
            return res.error(err, err.message, 500);
    }

}
