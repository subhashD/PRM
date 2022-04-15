// services/AuthService.js
const config = require('../config/index')
const GenderModel = require( "../models/gender" ); // Database Model
const contactModel = require( "../models/contact" ); // Database Model
const GenderSeeder = require('../util/seeders/seeds/GenderSeeder');

class GenderService {
  /**
   * @description Create an instance of MongooseService
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.model = GenderModel;
    // this.MongooseServiceInstance = new MongooseService( ContactModel );
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
        const result = await this.model.find( filter );
        return { success: true, body: result };
    } catch ( err ) {
        console.log(err);
        return { success: false, error: err };
    }
  }
   
  getById = async ( id ) => {
    try {  
        const result = await this.model.findById( id );
        return { success: true, body: result };
    } catch ( err ) {
        return { success: false, error: err };
    }
  }
  
  seedData = async () => {
    try {  
        const GenderSeederInstance = new GenderSeeder();
        const result = await GenderSeederInstance.seedDB();
        return { success: true, body: result };
    } catch ( err ) {
        return { success: false, error: err };
    }
  }
}

module.exports = GenderService;