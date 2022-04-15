// services/AuthService.js
const config = require('../config/index')
const MongooseService = require( "./MongooseService" ); // Data Access Layer
const ContactModel = require( "../models/contact" ); // Database Model
const GenderService = require('../services/GenderService');
const DateHelper = require('../util/helpers/DateHelper');

class ContactService {
  /**
   * @description Create an instance of MongooseService
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.model = ContactModel;
    // this.MongooseServiceInstance = new MongooseService( ContactModel );
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
            birthdate: DateHelper.format(body.birthdate),
            first_met_additional_info: body.first_met_additional_info,
            last_consulted_at: body.last_consulted_at,
            vcard: body.vcard,
            emails: body.emails,
            contacts: body.contacts 
        };

        if(body.gender) {
          const genderObj = new GenderService();
          const genderResponse = await genderObj.getById(body.gender);
          if(genderResponse.success) {
            contactToCreate.gender = genderResponse.body._id;
            contactToCreate.genderTitle = genderResponse.body.title;
          }
        }

        console.log(contactToCreate);

        const result = await this.model.create( contactToCreate );
        // const result = true;
        return { success: true, body: result };
    } catch ( err ) {
        return { success: false, error: err };
    }
  }
}

module.exports = ContactService;