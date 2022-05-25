const GenderRepository = require( "../repositories/GenderRepository" ); // Gender Repo Layer

class BaseService {
    /**
    * @description Create an instance of BaseService
    */
    constructor () {
    
    }

    /**
    * @description Returns the gender Id and Title
    * @param {*} id 
    * @returns {Promise}
    */
    getGender = (id) => {
        const genderRepository = new GenderRepository();
        return genderRepository.findById(id, { _id: 1, title: 1 });
    }

    getSetQueryFromObject = (entityKey, objectData, isMultiple = true) => {
        let setQuery = {};
        if(isMultiple) {
            for (const [key, value] of Object.entries(objectData)) {
                let newKey = `${entityKey}.$.${key}`;
                setQuery[newKey] = value;
            }
        } else {
            for (const [key, value] of Object.entries(objectData)) {
                let newKey = `${entityKey}.${key}`;
                setQuery[newKey] = value;
            }
        }
        
        return setQuery;
    }

}

module.exports = BaseService;