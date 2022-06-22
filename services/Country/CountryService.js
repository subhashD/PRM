const BaseService = require('../BaseService');
const CountryRepository = require( "../../repositories/CountryRepository" ); // Country Repo Layer
const CountrySeeder = require('../../database/seeders/seeds/CountrySeeder');

class CountryService extends BaseService {
  /**
   * @description Create an instance of MongooseService
   */
  constructor () {
    super();
    // Create instance of Data Access layer
    this.repositoryInstance = new CountryRepository();
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
        return { success: true, message:'Countries loaded successfully!', data: result };
    } catch ( err ) {
        return { success: false, message: err.name, data: {errors: err.message} };
    }
  }
   
  getById = async ( id ) => {
    try {  
        const result = await this.repositoryInstance.findById( id );
        return { success: true, message:'Country loaded successfully!', data: result };
    } catch ( err ) {
        return { success: false, message:'Country loading failed!', data: {errors: err.message}};
    }
  }
  
  seedData = async () => {
    try {
        const CountrySeederInstance = new CountrySeeder();
        const result = await CountrySeederInstance.seedDB();
        return { success: true, message:'Countries Seeding successfull!', body: result };
    } catch ( err ) {
        return { success: false, message:'Countries Seeding failed!', data: {errors: err.message}};
    }
  }
}

module.exports = CountryService;