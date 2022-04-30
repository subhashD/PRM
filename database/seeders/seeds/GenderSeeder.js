const BaseSeeder = require('./BaseSeeder');
const GenderModel = require('../../models/gender');
const config = require("../../../config/index");

class GenderSeeder {
    constructor() {
        this.model = GenderModel;
        this.seedData = this.getSeedData();
    }

    getSeedData = () => {
        let seedData = [
            {
                title: 'Man'
            },
            {
                title: 'Woman'
            },
            {
                title: 'Other'
            }
        ]

        return seedData;
    }

    seedDB = async () => {
        try {
            const response = this.model.insertMany(this.seedData);
            if(response) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
}

module.exports = GenderSeeder;