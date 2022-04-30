const Transformer = require('../Transformer');
const UserModel = require('../../database/models/user');

class UserTransformer extends Transformer {

    /* constructor(req, data, transformOptions = null) {
        super(req, data, transformOptions);
        this.model = UserModel;
    } */

    async transform(data) {
        const hasUser = App.lodash.has(data, 'user');
        const hasAccessToken = App.lodash.has(data, 'accessToken');

        const responseData = {};
        
        if(hasUser) {
            const user = data.user;
            const hasPhoto = App.lodash.has(user, 'profilePhoto');

            const userData = {
                id: user._id,
                fullname: this.getFullName(user),
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                timezone: user.timezone,
                // dob_formatted: App.moment(user.dob).format('Do MMM, YYYY'),
                // profile_photo_url: await user.getProfilePhotoUrl,
                has_photo: (hasPhoto) ? true : false,

            };
            /* if(user.getData('last_login_at')) {
                returnVal = App.helpers.cloneObj(returnVal, {
                    last_login_at: user.getData('last_login_at'),
                    last_login_at_formatted: App.helpers.formatDate(user.getData('last_login_at')),
                });
            } */

            responseData.user = userData;
        }
        
        if(hasAccessToken) {
            responseData.access_token = data.accessToken;
            responseData.refresh_token = data.refreshToken;
        }

        return App.helpers.cloneObj(responseData);
    }

    /* includeGender(data) {
        const GenderTransformer = require('./GenderTransformer');
        return (new GenderTransformer(this.req, data)).init();
    } */

    getFullName(user) {
        if(App.lodash.isEmpty(user.lastname)) {
            return user.firstname;
        }
        return `${user.firstname} ${user.lastname}`;
    }

}

module.exports = UserTransformer;