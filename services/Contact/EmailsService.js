const BaseService = require('../BaseService');
const ContactRepository = require( "../../repositories/ContactRepository" ); // Contact Repo Layer

class EmailsService extends BaseService {
  /**
   * @description Create an instance of ContactService
   */
  constructor () {
    super();
    // Create instance of Data Access layer
    this.repositoryInstance = new ContactRepository();
  }

  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  getEmailsByContactId = async ( contactId ) => {
    try {  
        const result = await this.repositoryInstance.findById( contactId );
        if(!App.lodash.isEmpty(result)) {
          return { success: true, message:'Contact`s emails loaded successfully!', data: result.emails };
        }
        return { success: false, message:'Contact`s emails not found!', data: null };
    } catch ( err ) {
        return { success: false, message:'Contact`s emails loading failed!', data: {errors: err}};
    }
  }
  
  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * @param emailId {objectId} fetch the given email Id
   * find particular email from the given contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  findEmailByContactIdAndEmailId = async ( contactId, emailId ) => {
    try {  
        let queryProjection = {
          emails: {
              $elemMatch: {
                _id: emailId,
              },
          },
        };

        const result = await this.repositoryInstance.findOne( {'_id': contactId, 'emails._id': emailId}, queryProjection );
        
        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.emails)) {
          return { success: true, message:'Contact`s email loaded successfully!', data: result.emails[0] };
        }
        return { success: false, message:'Contact`s email not found!', data: null };
    } catch ( err ) {
        return { success: false, message:'Contact`s email loading failed!', data: {errors: err}};
    }
  }
  
  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * @param emailId {objectId} fetch the given email Id
   * find particular email from the given contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  updateEmailByContactIdAndEmailId = async ( contactId, emailId, emailData ) => {
    try {
        let emailSetQuery = this.getSetQueryFromObject('emails', emailData);
        let findQuery =  {'_id': contactId, 'emails._id': emailId};
        let updateQuery = { $set: emailSetQuery };
        
        const result = await this.repositoryInstance.findOneAndUpdate( findQuery, updateQuery );
        // const result = true;

        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.emails)) {
          return { success: true, message:'Contact`s email loaded successfully!', data: result.emails[0] };
        }
        return { success: false, message:'Contact`s email not found!', data: null };
    } catch ( err ) {
        return { success: false, message:'Contact`s email loading failed!', data: {errors: err}};
    }
  }

  /**
   * @description Attempt to update a contact with the provided object
   * @param contactId {ObjectId} Contact to be updated
   * @param body {object} Object containing body fields to add a new email
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
   pushEmails = async ( contactId, emailToPush ) => {
    try {
        let updateQuery = { $push: { emails: emailToPush } };
        const result = await this.repositoryInstance.update(contactId, updateQuery);
        // const result = true;
        if(result) {
          return { success: true, message:'Email added successfully!'};
        }
        return { success: false, message:'Email adding failed!'};
    } catch ( err ) {
        return { success: false, message: err.name, data: err };
    }
  }

  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
   deleteEmailByContactIdAndEmailId = async ( contactId, emailId ) => {
    try {  
        let findQuery =  {'_id': contactId, 'emails._id': emailId};
        let deleteQuery = { $pull: {emails: {_id: emailId}} };
        
        const result = await this.repositoryInstance.findOneAndUpdate(findQuery, deleteQuery);
        // const result = null;
        if(App.lodash.isNull(result)) {
          return { success: false, message:'Contact`s email not found!', data: null };
        }
        return { success: true, message:'Contact`s email deleted successfully!', data: result };
    } catch ( err ) {
        return { success: false, message: err.name, data: {errors: err}};
    }
  }
  
}

module.exports = EmailsService;