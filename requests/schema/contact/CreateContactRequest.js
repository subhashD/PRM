var ObjectId = require('mongoose').Types.ObjectId;
const GenderRepository = require( "../../../repositories/GenderRepository" ); // Gender Repo Layer
const ApplicationError = require('../../../util/errors/ApplicationError');
const PushEmailsRequest = require('./Emails/PushEmailsRequest');
const PushNumbersRequest = require('./Numbers/PushNumbersRequest');

class CreateContactRequest {

    constructor () {
        this.pushEmailsRequestInstance = new PushEmailsRequest({ optional: true }, true);
        this.pushNumbersRequestInstance = new PushNumbersRequest({ optional: true }, true);
    }

    /**
    * @description Returns the gender Id and Title
    * @param {*} id 
    * @returns {Promise}
    */
    getGender = async (id) => {
        const genderRepository = new GenderRepository();
        return genderRepository.findById(id, { _id: 1, title: 1 });
    }

    getRules = () => {
        const emailsRules = this.pushEmailsRequestInstance.getRules();
        const numbersRules = this.pushNumbersRequestInstance.getRules();

        const createContactRequest = {
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
            birthdate: {
                optional: true,
                isDate: true,
                errorMessage: "birthdate field should be a valid date in the 'DD/MM/YYYY' format."
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
            },
            ...emailsRules,
            ...numbersRules
        };

        return createContactRequest;
    }
    
    getData = async (body = []) => {
        let contactToCreate = {
            user: body.userId, 
            firstname: body.firstname, 
            middlename: body.middlename, 
            lastname: body.lastname, 
            nickname: body.nickname, 
            description: body.description, 
            birthdate: body.birthdate,
            first_met_additional_info: body.first_met_additional_info,
            last_consulted_at: body.last_consulted_at,
            vcard: body.vcard,
        };

        if(body.gender) {
          const genderResponse = await this.getGender(body.gender);
          if(genderResponse) {
            contactToCreate.gender = genderResponse._id;
            contactToCreate.genderTitle = genderResponse.title;
          }
        }

        const emailsData = await this.pushEmailsRequestInstance.getData(body);
        if(! App.lodash.isEmpty(emailsData)) {
            contactToCreate.emails = emailsData;
        }
        
        const numbersData = await this.pushNumbersRequestInstance.getData(body);
        if(! App.lodash.isEmpty(numbersData)) {
            contactToCreate.numbers = numbersData;
        }

        return contactToCreate;
    }
}

module.exports = CreateContactRequest;