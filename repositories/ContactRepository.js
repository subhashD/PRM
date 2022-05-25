const ContactModel = require( "../database/models/contact" ); // Database Model
const BaseRepository = require("./BaseRepository");

class ContactRepository extends BaseRepository {
    constructor() {
        super();
        this.model = ContactModel;
    }

    /**
     * @description Create a new document on the Model
     * @param pipeline {array} Aggregate pipeline to execute
     * @returns {Promise} Returns the results of the query
     */
    getFirstMetDateTypes () {
        const dateTypes = { 
            1: "First met exact date known", 
            2: "First met Month and Year known", 
            3: "First met Day and Month known",
            4: "First met Only Year known" 
        };

        return dateTypes;
    }

}

module.exports = ContactRepository;
