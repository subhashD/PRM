const BaseSeeder = require('./BaseSeeder');
const GenderModel = require('../../models/gender');
const config = require("../../../config/index");

class GenderSeeder {
    constructor() {
        this.model = GenderModel;
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
            const resultCount = await this.model.countDocuments();
            const seedData = this.getSeedData();
            if(resultCount == seedData.length) {
                return false;
            }

            const response = this.model.insertMany(seedData);
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