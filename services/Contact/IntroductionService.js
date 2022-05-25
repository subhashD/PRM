const BaseService = require('../BaseService');
const ContactRepository = require( "../../repositories/ContactRepository" ); // Contact Repo Layer

class IntroductionService extends BaseService {
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
  getIntroductionByContactId = async ( contactId ) => {
    try {  
        const result = await this.repositoryInstance.findById( contactId );
        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.introduction)) {
          return { success: true, message:'Contact`s Introduction loaded successfully!', data: result.introduction };
        }
        return { success: false, message:'Contact`s Introduction not found!', data: null };
    } catch ( err ) {
        return { success: false, message:'Contact`s Introduction loading failed!', data: {errors: err}};
    }
  }
  
  /**
   * @description get the first met date type
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  getFirstMetDateTypes = async () => {
    try {  
        const dateTypes = this.repositoryInstance.getFirstMetDateTypes();
        const dateTypesArray = [];
        
        for(let key in dateTypes) {
            dateTypesArray.push({id: key, name: dateTypes[key]});
        }
        
        console.log(dateTypesArray);

        return { success: true, message:'First met date types loaded successfully!', data: dateTypesArray };
    } catch ( err ) {
        return { success: false, message:'First met date types loading failed!', data: {errors: err}};
    }
  }
  
  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * update introduction from the given contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  updateIntroductionByContactId = async ( contactId, introductionData ) => {
    try {
        let introductionSetQuery = this.getSetQueryFromObject('introduction', introductionData, false);
        let findQuery =  {'_id': contactId};
        let updateQuery = { $set: introductionSetQuery };

        const result = await this.repositoryInstance.findOneAndUpdate( findQuery, updateQuery );
        // const result = true;

        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.introduction)) {
          return { success: true, message:'Contact`s introduction loaded successfully!', data: result.introduction };
        }
        return { success: false, message:'Contact`s introduction not found!', data: null };
    } catch ( err ) {
        return { success: false, message:'Contact`s introduction loading failed!', data: {errors: err}};
    }
  }

 
  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
   deleteIntroductionByContactId = async ( contactId ) => {
    try {  
        let findQuery =  {'_id': contactId};
        let deleteQuery = { $set: {introduction: {}} };
        
        const result = await this.repositoryInstance.findOneAndUpdate(findQuery, deleteQuery);
        // const result = null;
        if(App.lodash.isNull(result)) {
          return { success: false, message:'Contact`s introduction not found!', data: null };
        }
        return { success: true, message:'Contact`s introduction deleted successfully!', data: result };
    } catch ( err ) {
        return { success: false, message: err.name, data: {errors: err}};
    }
  }
  
}

module.exports = IntroductionService;