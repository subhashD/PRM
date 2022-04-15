const { matchedData, validationResult } = require('express-validator');

const validateRules = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            req.matchedData = matchedData(req);
            return next();
        }

        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

        return res.status(422).json({
            status: false,
            message: 'Validations failed!!', 
            errors: extractedErrors,
        });
    };
};

module.exports = validateRules;