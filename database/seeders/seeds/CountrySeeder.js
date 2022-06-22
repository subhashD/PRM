const CountryModel = require('../../models/country');
const config = require("../../../config/index");
const seedFilesPath = require("../../seed_files/countries.json")
const fs = require('fs');
const path = require("path");

class GenderSeeder {
    constructor() {
        this.model = CountryModel;
    }

    getSeedData = () => {
        const seedFile = path.resolve(__dirname + '../../../seed_files', 'countries.json');
        let rawdata = fs.readFileSync(seedFile);
        let seedData = JSON.parse(rawdata);
        
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
            console.log(err.message);
            return false;
        }
    }
}

module.exports = GenderSeeder;