const ContactModel = require( "../database/models/contact" ); // Database Model
const BaseRepository = require("./BaseRepository");

class ContactRepository extends BaseRepository {
    constructor() {
        super();
        this.model = ContactModel;
    }

    /**
     * @description Retrieve a single document matching the provided ID, from the
     *   Model
     * @param id {string} Required: ID for the object to retrieve
     * @param {object} [projection] Optional: Fields to return or not return from
     * query
     * @param {object} [options] Optional: options to provide query
     * @returns {Promise} Returns the results of the query
     */
    findById ( id, populateArray = [], projection = { __v: 0 }, options = { lean: true } ) {
        // return this.model
        //   .findById( id, projection, options );
          // .exec();
        // var populateQuery = [{path:'user', select:['_id','email']}, {path:'gender', select:['_id','title']}];
        // const populateQuery = [];
        // populateArray.forEach(element => {
        //     populateQuery.push({
        //         path: element._id,
        //         type: element.type,
        //         contact: element.contact
        //     });
        // });
        if(! App.lodash.isEmpty(populateArray)) {
          return this.model
          .findById( id, projection, options )
          .populate(populateQuery)
          .exec();
        }

        return this.model
          .findById( id, projection, options )
          .exec();
    }

}

module.exports = ContactRepository;
