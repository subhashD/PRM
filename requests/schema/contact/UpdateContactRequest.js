var ObjectId = require('mongoose').Types.ObjectId;
const gender = require('../../../database/models/gender');
const GenderRepository = require( "../../../repositories/GenderRepository" ); // Gender Repo Layer

class UpdateContactRequest {
    
    getRules = () => {
        const updateContactRequest = {
            firstname: {
                optional: true,
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
            }
        };

        return updateContactRequest;
    }

    /**
    * @description Returns the gender Id and Title
    * @param {*} id 
    */
    getGender = async (id) => {
        const genderRepository = new GenderRepository();
        return genderRepository.findById(id, { _id: 1, title: 1 });
    }
    
    getData = async (body = []) => {
        let contactToUpdate = {
            user: body.userId
        };

        if(body.firstname) {
            contactToUpdate.firstname = body.firstname;
        }
        if(body.middlename) {
            contactToUpdate.middlename = body.middlename;
        }
        if(body.lastname) {
            contactToUpdate.lastname = body.lastname;
        }
        if(body.nickname) {
            contactToUpdate.nickname = body.nickname;
        }
        if(body.description) {
            contactToUpdate.description = body.description;
        }
        if(body.birthdate) {
            contactToUpdate.birthdate = body.birthdate;
        }
        if(body.first_met_additional_info) {
            contactToUpdate.first_met_additional_info = body.first_met_additional_info;
        }
        if(body.last_consulted_at) {
            contactToUpdate.last_consulted_at = body.last_consulted_at;
        }
        if(body.vcard) {
            contactToUpdate.vcard = body.vcard;
        }
        if(body.emails) {
            contactToUpdate.emails = body.emails;
        }
        if(body.contacts) {
            contactToUpdate.contacts = body.contacts;
        }

        if(body.gender) {
          const genderResponse = await this.getGender(body.gender);
          if(genderResponse) {
            contactToUpdate.gender = genderResponse._id;
            contactToUpdate.genderTitle = genderResponse.title;
          }
        }

        return contactToUpdate;
    }
}

module.exports = UpdateContactRequest;