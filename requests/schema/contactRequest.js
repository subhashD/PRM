const ContactService = require('../../services/ContactService');
const ContactServiceInstance = new ContactService();
var ObjectId = require('mongoose').Types.ObjectId;

const contactRequest = {
    firstname: {
        notEmpty: true,
        isString: true,
        errorMessage: "Firstname field cannot be empty and should be a string"
    },
    middlename: {
        optional: true,
        isString: true,
        errorMessage: "Middlename field should be a string."
    },
    lastname: {
        optional: true,
        isString: true,
        errorMessage: "Lastname field should be a string."
    },
    nickname: {
        optional: true,
        isString: true,
        errorMessage: "Nickname field should be a string."
    },
    gender: {
        optional: true,
       /*  custom: {
            options: value => {
                const isValidValue = ObjectId.isValid( value );
                if (!isValidValue) {
                    return Promise.reject('Gender is not valid.')
                }
            }
        } */
    }
}

module.exports = contactRequest;