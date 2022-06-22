const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    collection: 'country',
    timestamps: true
});

module.exports = mongoose.model('Country', countrySchema);