const AuthService = require('../../services/AuthService');
const AuthServiceInstance = new AuthService();

const registrationRequest = {
    firstname: {
        notEmpty: true,
        isString: true,
        errorMessage: "Firstname field cannot be empty and should be a string"
    },
    lastname: {
        isString: true,
        errorMessage: "Lastname field should be a string."
    },
    password: {
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        },
        errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
    email: {
        notEmpty: true,
        errorMessage: "Email field cannot be empty",
        custom: {
            options: value => {
                const userResponse = AuthServiceInstance.findUserByEmail( value );
                return userResponse.then(response => {
                    if (response.status) {
                        return Promise.reject('Email address already taken')
                    }
                })
            }
        }
    }
}

module.exports = registrationRequest;