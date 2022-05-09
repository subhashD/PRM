const AddEmailRequest = require( "./AddEmailRequest" ); // Contact Repo Layer

class PushEmailsRequest {

    constructor (additionalRules = {}, withContact = false) {
        this.additionalRules = additionalRules;
        this.withContact = withContact;
        this.AddEmailRequestInstance = new AddEmailRequest(withContact);
    }

    getRules = () => {
        const pushEmailsRequest = {
            emails: {
                isArray: {
                    bail:true,
                    options: {
                      min: 0,
                    },
                    errorMessage: "emails should be an array of email objects."
                },
                
            },
        };

        if(Object.entries(this.additionalRules).length > 0) {
            for (const [key, value] of Object.entries(this.additionalRules)) {
                pushEmailsRequest['emails'][key] = value;
            }
        }
        
        for (const [key, value] of Object.entries(this.AddEmailRequestInstance.getRules())) {
            let newKey = `emails.*.${key}`;
            pushEmailsRequest[newKey] = value;
        }

        return pushEmailsRequest;
    }
    
    getData = async (body = []) => {
        const emailToPush = [];
        if(App.lodash.isArray(body.emails)) {
            await Promise.all(body.emails.map(async (element) => {
                let emailData = await this.AddEmailRequestInstance.getData(element);
                emailToPush.push(emailData);
            }));
        }
        return emailToPush;
    }
}

module.exports = PushEmailsRequest;