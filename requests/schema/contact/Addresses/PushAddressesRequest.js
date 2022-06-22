const AddAddressRequest = require( "./AddAddressRequest" ); // Contact Repo Layer

class PushAddressesRequest {

    constructor (additionalRules = {}) {
        this.additionalRules = additionalRules;
        this.AddAddressRequestInstance = new AddAddressRequest();
    }

    getRules = () => {
        const pushAddressesRequest = {
            addresses: {
                isArray: {
                    bail:true,
                    options: {
                      min: 0,
                    },
                    errorMessage: "addresses should be an array of address objects."
                },
                
            },
        };

        if(Object.entries(this.additionalRules).length > 0) {
            for (const [key, value] of Object.entries(this.additionalRules)) {
                pushAddressesRequest['addresses'][key] = value;
            }
        }
        
        for (const [key, value] of Object.entries(this.AddAddressRequestInstance.getRules())) {
            let newKey = `addresses.*.${key}`;
            pushAddressesRequest[newKey] = value;
        }

        return pushAddressesRequest;
    }
    
    getData = async (body = []) => {
        const AddressesToPush = [];
        if(App.lodash.isArray(body.addresses)) {
            await Promise.all(body.addresses.map(async (element) => {
                let addressData = await this.AddAddressRequestInstance.getData(element);
                AddressesToPush.push(addressData);
            }));
        }
        return AddressesToPush;
    }
}

module.exports = PushAddressesRequest;