var ObjectId = require('mongoose').Types.ObjectId;

class WorkInformationRequest {

    constructor () {
        //
    }

    getRules = () => {
        const workInformationRequest = {
            job_title: {
                optional: true,
                isString: true,
                errorMessage: "Job title field should be a string"
            },
            company: {
                optional: true,
                isString: true,
                errorMessage: "Company field should be a string."
            }
        };

        return workInformationRequest;
    }
    
    getData = async (body = []) => {
        let informationToUpdate = {};
        
        if(body.job_title) {
            informationToUpdate.job_title = body.job_title;
        }
        
        if(body.company) {
            informationToUpdate.company = body.company;
        }
        
        return informationToUpdate;
    }
}

module.exports = WorkInformationRequest;