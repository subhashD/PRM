const BaseService = require('../BaseService');
const ContactRepository = require( "../../repositories/ContactRepository" ); // Contact Repo Layer

class WorkInformationService extends BaseService {
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
  getByContactId = async ( contactId ) => {
    try {  
        const result = await this.repositoryInstance.findById( contactId );
      
        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.work_information)) {
          return { success: true, message:'Contact`s work information loaded successfully!', data: result.work_information };
        }
        return { success: false, message:'Contact`s work information not found!', data: null };
    } catch ( err ) {
        return { success: false, message:'Contact`s work information loading failed!', data: {errors: err}};
    }
  }
  
  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * update work information from the given contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  updateByContactId = async ( contactId, informationData ) => {
    try {
        let informationSetQuery = this.getSetQueryFromObject('work_information', informationData, false);
        let findQuery =  {'_id': contactId};
        let updateQuery = { $set: informationSetQuery };

        const result = await this.repositoryInstance.findOneAndUpdate( findQuery, updateQuery );
        // const result = true;

        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.work_information)) {
          return { success: true, message:'Contact`s work information updated successfully!', data: result.work_information };
        }
        return { success: false, message:'Contact`s work information update failed!', data: null };
    } catch ( err ) {
        return { success: false, message:'Contact`s work information updating failed!', data: {errors: err}};
    }
  }

 
  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
   deleteByContactId = async ( contactId ) => {
    try {  
        let findQuery =  {'_id': contactId};
        let deleteQuery = { $set: {work_information: {}} };
        
        const result = await this.repositoryInstance.findOneAndUpdate(findQuery, deleteQuery);
        // const result = null;
        if(App.lodash.isNull(result)) {
          return { success: false, message:'Contact`s work information not found!', data: null };
        }
        return { success: true, message:'Contact`s work information deleted successfully!', data: result };
    } catch ( err ) {
        return { success: false, message: err.name, data: {errors: err}};
    }
  }
  
}

module.exports = WorkInformationService;