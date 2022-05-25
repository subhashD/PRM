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
  is_birthdate_known: {
    type: Boolean,
    default: false
  },
  birthdate_information: {
    is_age_based: {
      type: Boolean,
      default: false
    },
    age: {
      type: Number,
      default: null
    },
    day: {
      type: Number,
      default: null
    },
    month: {
      type: Number,
      default: null
    },
    year: {
      type: Number,
      default: null
    }
  },
  introduction : {
    information: {
      type: String,
      default: null
    },
    first_met_at: {
      type: String,
      default: null
    },
    is_first_met_date_known: {
      type: Boolean,
      default: false
    },
    first_met_date_type: {
      type: Number,
      default: null
    },
    first_met_on: {
      day: {
        type: Number,
        default: null
      },
      month: {
        type: Number,
        default: null
      },
      year: {
        type: Number,
        default: null
      }
    },
    met_through_contact: {
      type: Schema.Types.ObjectId,
      ref: 'Contact'
    }
  },
  last_consulted_at: { 
    type: Date 
  },
  is_partial: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: true
  },
  is_starred: {
    type: Boolean,
    default: false
  },
  is_deceased: {
    type: Boolean,
    default: false
  },
  is_deceased_date_known: {
    type: Boolean,
    default: false
  },
  deceased_information: {
    is_age_based: {
      type: Boolean,
      default: false
    },
    age: {
      type: Number,
      default: null
    },
    day: {
      type: Number,
      default: null
    },
    month: {
      type: Number,
      default: null
    },
    year: {
      type: Number,
      default: null
    }
  },
  vcard: {
    type: String
  }
}, {
  collection: 'contacts',
  timestamps: true
});


module.exports = mongoose.model("Contact", contactSchema);
