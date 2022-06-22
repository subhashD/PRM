const Transformer = require('../Transformer');

class FoodTransformer extends Transformer {

    async transform(data) {
        let responseData = {};

        const hasFoodPreferences = App.lodash.has(data, 'food_preferences');
        if(hasFoodPreferences) {
            responseData.food_preferences = data.food_preferences;
        }
        
        return App.helpers.cloneObj(responseData);
    }

}

module.exports = FoodTransformer;