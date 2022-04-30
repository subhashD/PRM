// services/AuthService.js
const ContactRepository = require( "../repositories/ContactRepository" ); // Contact Repo Layer
const GenderRepository = require( "../repositories/GenderRepository" ); // Gender Repo Layer
const ApplicationError = require("../util/errors/ApplicationError");

class ContactService {
  /**
   * @description Create an instance of MongooseService
   */
  constructor () {
    // Create instance of Data Access layer
    this.repositoryInstance = new ContactRepository();
  }

  /**
   * @description Returns the gender Id and Title
   * @param {*} id 
   * @returns {Promise}
   */
  getGender = (id) => {
    const genderRepository = new GenderRepository();
    return genderRepository.findById(id, { _id: 1, title: 1 });
  }

  /**
   * @description Attempt to create a contact with the provided object
   * @param body {object} Object containing all body fields to
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
   create = async ( body ) => {
    try {
        let contactToCreate = {
            user: body.userId, 
            firstname: body.firstname, 
            middlename: body.middlename, 
            lastname: body.lastname, 
            nickname: body.nickname, 
            description: body.description, 
            birthdate: App.helpers.changeDateFormat(body.birthdate),
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

        const result = await this.repositoryInstance.create( contactToCreate );
        // const result = true;
        return { success: true, message:'Contact created successfully!'};
    } catch ( err ) {
        console.log(err);
        return { success: false, message:'Contact creation failed!', data: {errors: err.message} };
    }
  }

  /**
   * @description Attempt to create a contact with the provided object
   * @param body {object} Object containing all body fields to
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
   getAll = async ( body ) => {
    try {  
        const filter = {};
        const result = await this.repositoryInstance.find( filter );
        return { success: true, message:'Contacts loaded successfully!', data: result };
    } catch ( err ) {
        console.log(err);
        return { success: false, message: err.name, data: {errors: err.message} };
    }
  }
   
  getById = async ( id ) => {
    try {  
        const result = await this.repositoryInstance.findById( id );
        return { success: true, message:'Contact loaded successfully!', data: result };
    } catch ( err ) {
        return { success: false, message:'Contact loading failed!', data: {errors: err.message}};
    }
  }
}

module.exports = ContactService;