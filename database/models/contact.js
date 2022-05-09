const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true  
  },
  firstname: {
    type: String,
    required: true
  },
  middlename: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
  },
  nickname: {
    type: String,
  },
  description: {
    type: String,
  },
  gender: {
    type: Schema.Types.ObjectId,
    ref: 'Gender'  
  },
  genderTitle: {
    type: String
  },
  emails: [{
      email : {
        type: String,
        unique: true,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      is_active: {
        type: Boolean,
        default: true
      },
  }],
  numbers: [{
      country_code: {
        type: String,
        default: "+91"
      },
      contact : {
        type: String,
        required: true
      },
      type: {
        type: String
      },
      is_active: {
        type: Boolean,
        default: true
      },
  }],
  birthdate: {
      type: Date
  },
  first_met_additional_info : {
    type: String
  },
  last_consulted_at: { 
    type: Date 
  },
  is_dead: {
    type: Boolean,
    default: false
  },
  vcard: {
      type: String
  }
}, {
  collection: 'contacts',
  timestamps: true
});


module.exports = mongoose.model("Contact", contactSchema);
