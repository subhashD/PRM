const mongoose = require('mongoose');
const config = require("../../../config/index");

class BaseSeeder {
    constructor() {
        
    }

    seedDB = async () => {
        console.log(' inside BaseSeeder with Model');
        console.log(this.model);
        const response = this.model.insertMany(this.seedData);
        if(response) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = BaseSeeder;