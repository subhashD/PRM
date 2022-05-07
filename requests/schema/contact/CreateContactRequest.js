var ObjectId = require('mongoose').Types.ObjectId;
const GenderRepository = require( "../../../repositories/GenderRepository" ); // Gender Repo Layer

class CreateContactRequest {
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
            }
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
            emails: body.emails,
            contacts: body.contacts 
        };

        if(body.gender) {
          const genderResponse = await this.getGender(body.gender);
          if(genderResponse) {
            contactToCreate.gender = genderResponse._id;
            contactToCreate.genderTitle = genderResponse.title;
          }
        }

        return contactToCreate;
    }
}

module.exports = CreateContactRequest;