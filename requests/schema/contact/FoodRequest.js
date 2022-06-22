var ObjectId = require('mongoose').Types.ObjectId;

class FoodRequest {

    constructor () {
        //
    }

    getRules = () => {
        const foodPreferencesRequest = {
            food_preferences: {
                optional: true,
                isString: true,
                errorMessage: "food Preferences field should be a string"
            }
        };

        return foodPreferencesRequest;
    }
    
    getData = async (body = []) => {
        let informationToUpdate = {};
        
        if(body.food_preferences) {
            informationToUpdate.food_preferences = body.food_preferences;
        } else {
            informationToUpdate.food_preferences = null;
        }
        
        return informationToUpdate;
    }
}

module.exports = FoodRequest;