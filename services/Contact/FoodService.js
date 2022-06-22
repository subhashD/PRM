const BaseService = require('../BaseService');
const ContactRepository = require( "../../repositories/ContactRepository" ); // Contact Repo Layer

class FoodService extends BaseService {
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
      
        if(!App.lodash.isEmpty(result)) {
          return { success: true, message:'Food preference loaded successfully!', data: result.food_preferences };
        }
        return { success: false, message:'Food preference not found!', data: null };
    } catch ( err ) {
        return { success: false, message:'Food preference loading failed!', data: {errors: err}};
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
        let informationSetQuery = this.getSetQueryFromObject('food_preferences', informationData, false);
        let findQuery =  {'_id': contactId};
        let updateQuery = { $set: informationSetQuery };

        const result = await this.repositoryInstance.findOneAndUpdate( findQuery, updateQuery );
        // const result = true;

        if(!App.lodash.isEmpty(result)) {
          return { success: true, message:'Food preference updated successfully!', data: result.food_preferences };
        }
        return { success: false, message:'Food preference update failed!', data: null };
    } catch ( err ) {
        return { success: false, message:'Food preference updating failed!', data: {errors: err}};
    }
  }
  
}

module.exports = FoodService;