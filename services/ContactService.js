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
        const result = await this.repositoryInstance.create( body );
        // const result = true;
        if(result) {
          return { success: true, message:'Contact created successfully!'};
        }
        return { success: false, message:'Contact creation failed!'};
    } catch ( err ) {
        console.log(err);
        return { success: false, message: err.name, data: {errors: err} };
    }
  }

  /**
   * @description Attempt to update a contact with the provided object
   * @param contactId {ObjectId} Contact to be updated
   * @param body {object} Object containing body fields to update contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
   update = async ( contactId, contactToUpdate ) => {
    try {
        // console.log(contactToUpdate);
        const result = await this.repositoryInstance.update(contactId, contactToUpdate);
        // const result = true;
        if(result) {
          return { success: true, message:'Contact updated successfully!'};
        }
        return { success: false, message:'Contact update failed!'};
    } catch ( err ) {
        console.log(err);
        return { success: false, message: err.name, data: {errors: err} };
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
        return { success: false, message: err.name, data: {errors: err} };
    }
  }
  
  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  getById = async ( contactId ) => {
    try {  
        const result = await this.repositoryInstance.findById( contactId );
        return { success: true, message:'Contact loaded successfully!', data: result };
    } catch ( err ) {
        return { success: false, message: err.name, data: {errors: err}};
    }
  }

  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  deleteById = async ( contactId ) => {
    try {  
        const result = await this.repositoryInstance.delete( contactId );
        if(App.lodash.isNull(result)) {
          return { success: false, message:'Contact not found!', data: result };
        }
        return { success: true, message:'Contact deleted successfully!', data: result };
    } catch ( err ) {
      console.log(err.message);
        return { success: false, message: err.name, data: {errors: err}};
    }
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
        return { success: false, message:'Contact`s emails loading failed!', data: result };
    } catch ( err ) {
        return { success: false, message:'Contact`s emails loading failed!', data: {errors: err}};
    }
  }
  
  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
   getNumbersByContactId = async ( contactId ) => {
    try {  
        const result = await this.repositoryInstance.findById( contactId );
        if(!App.lodash.isEmpty(result)) {
          return { success: true, message:'Contact`s numbers loaded successfully!', data: result.numbers };
        }
        return { success: false, message:'Contact`s numbers loading failed!', data: result };
    } catch ( err ) {
        return { success: false, message:'Contact`s numbers loading failed!', data: {errors: err}};
    }
  }
}

module.exports = ContactService;