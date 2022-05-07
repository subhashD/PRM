const ObjectId = require('mongoose').Types.ObjectId;
const Transformer = require('../Transformer');
const ContactModel = require('../../database/models/contact');
const GenderTransformer = require('../Gender/GenderTransformer');
const NumberTransformer = require('./NumberTransformer');
const EmailTransformer = require('./EmailTransformer');
const UserTransformer = require('../User/UserTransformer');

class ContactTransformer extends Transformer {

    /* constructor(req, data, transformOptions = null) {
        super(req, data, transformOptions);
        this.model = UserModel;
    } */

    async transform(data) {
        const hasContact = App.lodash.has(data, '_id');
        let responseData = {};
        
        if(hasContact) {
            responseData = {
                id: data._id,
                fullname: this.getFullName(data),
                firstname: data.firstname,
                middlename: data.middlename,
                lastname: data.lastname,
                nickname: data.nickname,
                description: data.description,
                email: data.email,
                genderTitle: data.genderTitle,
                birthdate: App.moment(data.birthdate).format('Do MMM, YYYY'),
                first_met_additional_info: data.first_met_additional_info,
                last_consulted_at: App.helpers.formatDate(data.last_consulted_at),
                is_dead: data.is_dead,
                numbers: await (new NumberTransformer()).getTransformedData(this.req, data.numbers),
                emails: await (new EmailTransformer()).getTransformedData(this.req, data.emails),

            };

            if(data.user instanceof ObjectId) {
                responseData.userId = data.user;
            } else if(App.lodash.isObject(data.user)) {
                responseData.userId = data.user._id;
                responseData.user = await (new UserTransformer()).getTransformedData(this.req, data.user);
            }
            
            if(data.gender instanceof ObjectId) {
                responseData.genderId = data.gender;
            } else if(App.lodash.isObject(data.user)) {
                responseData.genderId = data.gender._id;
                responseData.gender = await (new GenderTransformer()).getTransformedData(this.req, data.gender);
            }
        }

        return App.helpers.cloneObj(responseData);
    }

    /* includeGender(data) {
        const GenderTransformer = require('./GenderTransformer');
        return (new GenderTransformer(this.req, data)).init();
    } */

    getFullName = (contact) => {
        var fullName = contact.firstname;
        if(! App.lodash.isEmpty(contact.middlename)) {
            fullName = `${fullName} ${contact.middlename}`;
        }
        if(! App.lodash.isEmpty(contact.lastname)) {
            fullName = `${fullName} ${contact.lastname}`;
        }
        return fullName;
    }

}

module.exports = ContactTransformer;