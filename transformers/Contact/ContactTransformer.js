const Transformer = require('../Transformer');
const ContactModel = require('../../database/models/contact');

class ContactTransformer extends Transformer {

    /* constructor(req, data, transformOptions = null) {
        super(req, data, transformOptions);
        this.model = UserModel;
    } */

    async transform(data) {
        const hasContact = App.lodash.has(data, '_id');
        const responseData = {};
        
        if(hasContact) {
            const user = data.user;
            // const hasPhoto = App.lodash.has(user, 'profilePhoto');

            const contactData = {
                id: data._id,
                fullname: this.getFullName(data),
                firstname: data.firstname,
                middlename: data.middlename,
                lastname: data.lastname,
                nickname: data.nickname,
                description: data.description,
                email: data.email,
                gender: data.gender,
                genderTitle: data.genderTitle,
                birthdate: App.moment(data.birthdate).format('Do MMM, YYYY'),
                first_met_additional_info: data.first_met_additional_info,
                last_consulted_at: App.helpers.formatDate(data.last_consulted_at),
                is_dead: data.is_dead,
                contacts: this.showContacts(data.contacts),
                emails: this.showEmails(data.emails),

            };

            responseData.contact = contactData;
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

    showContacts = (contacts) => {
        const contactsData = [];
        contacts.forEach(element => {
            contactsData.push({
                id: element._id,
                type: element.type,
                contact: element.contact
            });
        });
        
        return contactsData;
    }
    
    showEmails = (emails) => {
        const emailsData = [];
        emails.forEach(element => {
            emailsData.push({
                id: element._id,
                type: element.type,
                contact: element.email
            });
        });
        
        return emailsData;
    }

}

module.exports = ContactTransformer;