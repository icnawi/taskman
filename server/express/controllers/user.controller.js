const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { signupValidationError, loginValidationError } = require('../helpers/messages');
const { noir } = require('../helpers/logger');
const bcrypt = require('bcrypt');

/**
 * @method POST /users - User registrations
 * */
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password
    });
    user.save();

    // Send 200 + token
    jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h'
    }, (err, token) => {
        res.json({
          token
        })
      }
    )
  } catch (e) {
    noir.error(e);
    if (e.name === 'ValidationError') {
      return res.status(422).json(signupValidationError)
    }
  }
}

/**
 * @method POST /auth - User authorization
 * */
exports.auth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!email) {
      res.status(422).json(loginValidationError)
    }

    if (!user) {
      return res.status(403).json({
        status: "Error",
        message: "Wrong credentials or user is not found"
      })
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(403).json({
          status: "Error",
          message: "Wrong login or password"
        })
      } else {
        jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '24h'
        }, (err, token) => {
          res.json({token})
        })
      }
    })
  } catch (e) {
    noir.error(e);
    return next(e)
  }
}