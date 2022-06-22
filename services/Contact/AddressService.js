const BaseService = require('../BaseService');
const ContactRepository = require( "../../repositories/ContactRepository" ); // Contact Repo Layer

class AddressService extends BaseService {
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
        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.addresses)) {
          return { success: true, message:'Contact`s addresses loaded successfully!', data: result.addresses };
        }
        return { success: false, message:'Contact`s addresses not found!', data: null };
    } catch ( err ) {
        return { success: false, message:'Contact`s addresses loading failed!', data: {errors: err}};
    }
  }
  
  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * @param addressId {objectId} fetch the given address Id
   * find particular address from the given contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  findByContactIdAndAddressId = async ( contactId, addressId ) => {
    try {  
        let queryProjection = {
          addresses: {
              $elemMatch: {
                _id: addressId,
              },
          },
        };

        const result = await this.repositoryInstance.findOne( {'_id': contactId, 'addresses._id': addressId}, queryProjection );
        
        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.addresses)) {
          return { success: true, message:'Contact`s address loaded successfully!', data: result.addresses[0] };
        }
        return { success: false, message:'Contact`s address not found!', data: null };
    } catch ( err ) {
        return { success: false, message:'Contact`s address loading failed!', data: {errors: err}};
    }
  }
  
  /**
   * @description Attempt to create a contact with the provided object
   * @param contactId {objectId} fetch the given contact id
   * @param addressId {objectId} fetch the given address Id
   * find particular address from the given contact
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  updateByContactIdAndAddressId = async ( contactId, addressId, addressData ) => {
    try {
        let addressSetQuery = this.getSetQueryFromObject('addresses', addressData);
        let findQuery =  {'_id': contactId, 'addresses._id': addressId};
        let updateQuery = { $set: addressSetQuery };
        
        const result = await this.repositoryInstance.findOneAndUpdate( findQuery, updateQuery );
        // const result = true;

        if(!App.lodash.isEmpty(result) && !App.lodash.isEmpty(result.addresses)) {
          return { success: true, message:'Contact`s address loaded successfully!', data: result.addresses[0] };
        }
        return { success: false, message:'Contact`s address not found!', data: null };
    } catch ( err ) {
        return { success: false, message:'Contact`s address loading failed!', data: {errors: err}};
    }
  }

  /**
   * @description Attempt to update a contact with the provided object
   * @param contactId {ObjectId} Contact to be updated
   * @param body {object} Object containing body fields to add a new address
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
   pushAddresses = async ( contactId, addressToPush ) => {
    try {
        let updateQuery = { $push: { addresses: addressToPush } };
        const result = await this.repositoryInstance.update(contactId, updateQuery);
        // const result = true;
        if(result) {
          return { success: true, message:'Address added successfully!'};
        }
        return { success: false, message:'Address adding failed!'};
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
   deleteByContactIdAndAddressId = async ( contactId, addressId ) => {
    try {  
        let findQuery =  {'_id': contactId, 'addresses._id': addressId};
        let deleteQuery = { $pull: {addresses: {_id: addressId}} };
        
        const result = await this.repositoryInstance.findOneAndUpdate(findQuery, deleteQuery);
        // const result = null;
        if(App.lodash.isNull(result)) {
          return { success: false, message:'Contact`s address not found!', data: null };
        }
        return { success: true, message:'Contact`s address deleted successfully!', data: result };
    } catch ( err ) {
        return { success: false, message: err.name, data: {errors: err}};
    }
  }
   
  makeAddressActive = async ( contactId, addressId ) => {
    try {
        let activeSetQuery = this.getSetQueryFromObject('addresses', {'is_active' : true});
        let activeQuery =  {'_id': contactId, 'addresses._id': addressId};
        
        let inActiveSetQuery = this.getSetQueryFromObject('addresses', {'is_active' : false});
        let inActiveQuery =  {'_id': contactId, 'addresses._id': { $ne : addressId}};

        let result = null;
        const resultInActive = await this.repositoryInstance.findAndUpdateMany(inActiveQuery, inActiveSetQuery);
        console.log(resultInActive);
        if(!App.lodash.isNull(resultInActive)) {
          result = await this.repositoryInstance.findOneAndUpdate(activeQuery, activeSetQuery);
        }
        // work from here
        // const result = null;
        if(App.lodash.isNull(result)) {
          return { success: false, message:'Contact`s address not found!', data: null };
        }
        return { success: true, message:'Contact`s address set active successfully!', data: result };
    } catch ( err ) {
        return { success: false, message: err.name, data: {errors: err}};
    }
  }
  
}

module.exports = AddressService;