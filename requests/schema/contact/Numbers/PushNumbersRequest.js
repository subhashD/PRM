const AddNumberRequest = require( "./AddNumberRequest" ); // Contact Repo Layer

class PushNumbersRequest {

    constructor (additionalRules = {}, withContact = false) {
        this.additionalRules = additionalRules;
        this.withContact = withContact;
        this.AddNumberRequestInstance = new AddNumberRequest(withContact);
    }

    getRules = () => {
        const pushNumbersRequest = {
            numbers: {
                isArray: {
                    bail:true,
                    options: {
                      min: 0,
                    },
                    errorMessage: "Numbers should be an array of objects."
                },
                
            },
        };

        if(Object.entries(this.additionalRules).length > 0) {
            for (const [key, value] of Object.entries(this.additionalRules)) {
                pushNumbersRequest['numbers'][key] = value;
            }
        }
        
        for (const [key, value] of Object.entries(this.AddNumberRequestInstance.getRules())) {
            let newKey = `numbers.*.${key}`;
            pushNumbersRequest[newKey] = value;
        }

        return pushNumbersRequest;
    }
    
    getData = async (body = []) => {
        const numbersToPush = [];
        if(App.lodash.isArray(body.numbers)) {
            await Promise.all(body.numbers.map(async (element) => {
                let numberData = await this.AddNumberRequestInstance.getData(element);
                numbersToPush.push(numberData);
            }));
        }
        return numbersToPush;
    }
}

module.exports = PushNumbersRequest;