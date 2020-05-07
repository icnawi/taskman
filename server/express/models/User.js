const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const { noir } = require('../helpers/logger');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 25,
    min: 8,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 16
  }
}, { versionKey: false });

UserSchema.pre('save', function(next) {
  const user = this;
  let {password, isModified} = user;
  // only hash the password if it has been modified (or is new)
  if (!isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      password = hash;
      next();
    });
  });
});

// UserSchema.post('save', (err, user, next) => {
//   if (err.name === 'MongoError' && err.code === 11000) {
//     next(new Error('Email must be unique'));
//   } else next(err)
// })

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', UserSchema)
