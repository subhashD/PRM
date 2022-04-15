const mongoose = require('mongoose');

const genderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Gender', genderSchema);