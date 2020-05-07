const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
})

UserSchema.pre('save', true, function (next, done) {
  const user = this;
  const saltRounds = 10;

  if (!user.isModified('password')) {
    console.log(user)
    return next()
  };

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) return next(hashErr);

      user.password = hash
      next();
    })
  })
})

UserSchema.methods.comparePasswords = (comparable, done) => {
  bcrypt.compare(comparable, this.password, (err, isMatch) => {
    if (err) done(err);
    done(err, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema);