class ObjectService {
    /**
     * @description remove keys which are not present in the whitelist, and 
     * return the object with only the whitelisted keys
     * @param {object} obj to filter using the whitelist
     * @param {array} keys List of whitelisted arrays 
     * @returns {object} Return object with only the whitelisted keys
     */
    static pick ( obj, keys ) {
        return keys
            .map( k => k in obj ? { [ k ]: obj[ k ]} : {})
            .reduce( (res, o) => Object.assign( res, o ), {});
    }
}

module.exports = ObjectService;