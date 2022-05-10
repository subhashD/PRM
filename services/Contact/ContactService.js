const BaseService = require('../BaseService');
const ContactRepository = require( "../../repositories/ContactRepository" ); // Contact Repo Layer

class ContactService extends BaseService {
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
   * @param body {object} Object containing all body fields to
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
   create = async ( body ) => {
    try {
        // const result = await this.repositoryInstance.create( body );
        const result = true;
        if(result) {
          return { success: true, message:'Contact created successfully!'};
        }
        return { success: false, message:'Contact creation failed!'};
    } catch ( err ) {
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
        const result = await this.repositoryInstance.update(contactId, contactToUpdate);
        // const result = true;
        if(result) {
          return { success: true, message:'Contact updated successfully!'};
        }
        return { success: false, message:'Contact update failed!'};
    } catch ( err ) {
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
        const result = await this.repositoryInstance.find();

        if(!App.lodash.isEmpty(result)) {
          return { success: true, message:'Contactd loaded successfully!', data: result };
        }
        
        return { success: false, message:'Contactd not found!', data: null };
    } catch ( err ) {
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
        const populateQuery = [
          {path:'user', select:['_id','email']}, 
          {path:'gender', select:['_id','title']}
        ];

        const result = await this.repositoryInstance.findByIdAndPopulate( contactId, populateQuery );
        if(!App.lodash.isEmpty(result)) {
          return { success: true, message:'Contact loaded successfully!', data: result };
        }
        return { success: false, message:'Contact not found!', data: null };
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
          return { success: false, message:'Contact not found!', data: null };
        }
        return { success: true, message:'Contact deleted successfully!', data: result };
    } catch ( err ) {
        return { success: false, message: err.name, data: {errors: err}};
    }
  }

}

module.exports = ContactService;