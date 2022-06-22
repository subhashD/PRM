const AddressService = require('../../services/Contact/AddressService');
const addressServiceInstance = new AddressService();

// Requests to get validated and formatted data
const AddAddressRequest = require('../../requests/schema/contact/Addresses/AddAddressRequest');
const PushAddressesRequest = require('../../requests/schema/contact/Addresses/PushAddressesRequest');

// data transfromers
const AddressTransformer = require('../../transformers/Contact/AddressTransformer');

module.exports = {

    getAddresses: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await addressServiceInstance.getByContactId( req.params.contactId );
            if(response.success) {
                const transformedData = await (new AddressTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    
    findAddress: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await addressServiceInstance.findByContactIdAndAddressId(req.params.contactId, req.params.addressId);
            if(response.success) {
                const transformedData = await (new AddressTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }

            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

    addNewAddress: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const addAddressRequestInstance = new AddAddressRequest();
            const addressData = await addAddressRequestInstance.getData(req.body);
            const response = await addressServiceInstance.pushAddresses( req.params.contactId, addressData );
            if(response.success) {
                return res.success({}, response.message, 200);
            }
            return res.error(response.data, response.message, 500);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    
    pushAddresses: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const pushAddressesRequestInstance = new PushAddressesRequest();
            const addressesData = await pushAddressesRequestInstance.getData(req.body);

            const response = await addressServiceInstance.pushAddresses( req.params.contactId, addressesData );
            if(response.success) {
                return res.success({}, response.message, 200);
            }
            return res.error(response.data, response.message, 500);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

    updateAddress: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const addAddressRequestInstance = new AddAddressRequest();
            const addressData = await addAddressRequestInstance.getData(req.body);

            // We only pass the body object, never the req object
            const response = await addressServiceInstance.updateByContactIdAndAddressId(req.params.contactId, req.params.addressId, addressData);
            if(response.success) {
                const transformedData = await (new AddressTransformer()).getTransformedData(req, response.data);
                return res.success(transformedData, response.message);
            }
            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },

    deleteAddress: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await addressServiceInstance.deleteByContactIdAndAddressId(req.params.contactId, req.params.addressId);
            if(response.success) {
                return res.success({}, response.message, 204);
            }

            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    
    makeAddressActive: async ( req, res ) => {
        try {
            // We only pass the body object, never the req object
            const response = await addressServiceInstance.makeAddressActive(req.params.contactId, req.params.addressId);
            if(response.success) {
                return res.success({}, response.message, 200);
            }

            return res.error(response.data, response.message);
        } catch ( err ) {
            res.error( err, err.name, 500);
        }
    },
    

};
