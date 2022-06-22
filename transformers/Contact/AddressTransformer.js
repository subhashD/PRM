const Transformer = require('../Transformer');
const GenderModel = require('../../database/models/gender');

class AddressTransformer extends Transformer {

    async transform(data) {
        let responseData = {};
        const hasAddress = App.lodash.has(data, '_id');
        if(hasAddress) {
            let address = '';

            responseData = {
                'id': data._id,
                'is_active': data.is_active,
                'label': data.label,
                'street': data.street,
                'city': data.city,
                'province': data.province,
                'postal_code': data.postal_code,
                'country': data.country,
                'latitude': data.latitude,
                'longitude': data.longitude,
                'google_map_address' : this.getGoogleMapAddress(data),
                'google_map_location' : this.getGoogleMapsAddressWithLatitude(data),
            };

        }

        return App.helpers.cloneObj(responseData);
    }

    getAddressAsString = (data) => {
        let address = '';

        if(App.lodash.has(data, 'street') && !App.helpers.isEmpty(data.street)) {
            address = `${data.street}`;
        }
        if(App.lodash.has(data, 'city') && !App.helpers.isEmpty(data.city)) {
            address = `${address} ${data.city}`;
        }
        if(App.lodash.has(data, 'province') && !App.helpers.isEmpty(data.province)) {
            address = `${address} ${data.province}`;
        }
        if(App.lodash.has(data, 'postal_code') && !App.helpers.isEmpty(data.postal_code)) {
            address = `${address} ${data.postal_code}`;
        }
        if(App.lodash.has(data, 'country') && !App.helpers.isEmpty(data.country)) {
            address = `${address} ${data.country}`;
        }

        return address;
    }

    getGoogleMapAddress = (data) => {
        let place = this.getAddressAsString(data);
        place = encodeURI(place);
        return `https://www.google.com/maps/place/${place}`;
    }
    
    getGoogleMapsAddressWithLatitude = (data) => {
        let location = '';

        if(App.lodash.has(data, 'latitude') && !App.helpers.isEmpty(data.latitude)) {
            location = `${data.latitude}`;
        }
        if(App.lodash.has(data, 'longitude') && !App.helpers.isEmpty(data.longitude)) {
            location = `${location},${data.longitude}`;
        }
        console.log("Location : " + location);
        if(App.helpers.isEmpty(location)) {
            return null;
        }
        return `http://maps.google.com/maps?q=${location}`;
    }

}

module.exports = AddressTransformer;