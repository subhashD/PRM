const BaseService = require('../BaseService');
const ContactRepository = require( "../../repositories/ContactRepository" ); // Contact Repo Layer

class NumbersService extends BaseService {
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
  getNumbersByContactId = async ( contactId ) => {
    try {  
        const result = await this.repositoryInstance.findById( contactId );
        if(!App.lodash.isEmpty(result)) {
          return { success: true, message:'Contact`s numbers loaded successfully!', data: result.numbers };
        }
        return { success: false, message:'Contact`s numbers not found!', data: null };
    } catch ( err ) {
        return { success: false, message:'Contact`s numbers loading failed!', data: {errors: err}};
    }
  }
  
  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * @param numberId {objectId} fetch the given number Id
   * find particular number from the given contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  findNumberByContactIdAndNumberId = async ( contactId, numberId ) => {
    try {  
        let queryProjection = {
            numbers: {
              $elemMatch: {
                _id: numberId,
              },
          },
        };

        const result = await this.repositoryInstance.findOne( {'_id': contactId, 'numbers._id': numberId}, queryProjection );
        
        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.numbers)) {
          return { success: true, message:'Contact`s number loaded successfully!', data: result.numbers[0] };
        }
        return { success: false, message:'Contact`s number not found!', data: null };
    } catch ( err ) {
        return { success: false, message:'Contact`s number loading failed!', data: {errors: err}};
    }
  }
  
  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * @param numberId {objectId} fetch the given number Id
   * find particular number from the given contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  updateNumberByContactIdAndNumberId = async ( contactId, numberId, numberData ) => {
    try {
        let numberSetQuery = this.getSetQueryFromObject('numbers', numberData);
        let findQuery =  {'_id': contactId, 'numbers._id': numberId};
        let updateQuery = { $set: numberSetQuery };
        
        const result = await this.repositoryInstance.findOneAndUpdate( findQuery, updateQuery );
        // const result = true;

        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.numbers)) {
          return { success: true, message:'Contact`s number loaded successfully!', data: result.numbers[0] };
        }
        return { success: false, message:'Contact`s number not found!', data: null };
    } catch ( err ) {
        return { success: false, message:'Contact`s number loading failed!', data: {errors: err}};
    }
  }

  /**
   * @description Attempt to update a contact with the provided object
   * @param contactId {ObjectId} Contact to be updated
   * @param body {object} Object containing body fields to add a new number
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
   pushNumbers = async ( contactId, numberToPush ) => {
    try {
        let updateQuery = { $push: { numbers: numberToPush } };
        const result = await this.repositoryInstance.update(contactId, updateQuery);
        // const result = true;
        if(result) {
          return { success: true, message:'Numbers added successfully!'};
        }
        return { success: false, message:'Numbers adding failed!'};
    } catch ( err ) {
        console.log(err);
        return { success: false, message: err.name, data: err };
    }
  }

  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * create contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
   deleteNumberByContactIdAndNumberId = async ( contactId, numberId ) => {
    try {  
        let findQuery =  {'_id': contactId, 'numbers._id': numberId};
        let deleteQuery = { $pull: {numbers: {_id: numberId}} };
        
        const result = await this.repositoryInstance.findOneAndUpdate(findQuery, deleteQuery);
        // const result = null;
        if(App.lodash.isNull(result)) {
          return { success: false, message:'Contact`s number not found!', data: null };
        }
        return { success: true, message:'Contact`s number deleted successfully!', data: result };
    } catch ( err ) {
      console.log(err.message);
        return { success: false, message: err.name, data: {errors: err}};
    }
  }
  
}

module.exports = NumbersService;