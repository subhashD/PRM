const BaseService = require('../BaseService');
const GenderRepository = require( "../../repositories/GenderRepository" ); // Gender Repo Layer
const GenderSeeder = require('../../database/seeders/seeds/GenderSeeder');

class GenderService extends BaseService {
  /**
   * @description Create an instance of MongooseService
   */
  constructor () {
    super();
    // Create instance of Data Access layer
    this.repositoryInstance = new GenderRepository();
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
        return { success: true, message:'Gender loaded successfully!', data: result };
    } catch ( err ) {
        return { success: false, message: err.name, data: {errors: err.message} };
    }
  }
   
  getById = async ( id ) => {
    try {  
        const result = await this.repositoryInstance.findById( id );
        return { success: true, message:'Gender loaded successfully!', data: result };
    } catch ( err ) {
        return { success: false, message:'Gender loading failed!', data: {errors: err.message}};
    }
  }
  
  seedData = async () => {
    try {  
        const GenderSeederInstance = new GenderSeeder();
        const result = await GenderSeederInstance.seedDB();
        return { success: true, message:'Seeding successfull!', body: result };
    } catch ( err ) {
        return { success: false, message:'Seeding failed!', data: {errors: err.message}};
    }
  }
}

module.exports = GenderService;