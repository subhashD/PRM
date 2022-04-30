const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  timezone: {
    type: String,
  },
  profilePhoto: {
    type: String
  },
  source: { 
    type: String, 
    required: [true, "source not specified"] 
  },
  password: {
    type: String,
    required: true
  }
},{
  collection: 'users',
  timestamps: true
});

userSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
          if (err) {
              return next(err);
          }
          bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          });
      });
  } else {
      return next();
  }
});

userSchema.methods.comparePassword = function (password, cb) {
  const user = this;
  bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
