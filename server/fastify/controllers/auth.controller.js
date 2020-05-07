const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
const User = require('../models/User');

exports.authenticate = async (req, reply) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    })
      .exec()
      .then(user => {
        if (!user) return next();
        user.comparePasswords(req.body.password, (e, isMatch) => {
          if (e) return next(e)
          if (isMatch) {
            req.email = user;
            next();
          } else {
            return next()
          }
        });
      });
  } catch (e) {
    fastify.log.error(e);
    process.exit(1)
  }
}

exports.generateToken = async (req, reply) => {
  try {
    if (!req.email) return next();

    const jwtPayload = {
      id: req.email._id
    };

    const jwtData = {
      expiresIn: '24h'
    }

    const secret = process.env.secret;
    req.token = jwt.sign(jwtPayload, secret, jwtData);

    next();
  } catch (e) {
    fastify.log.error(e);
    process.exit(1)
  }
}

exports.replyJWT = async (req, reply) => {
  try {
    let response;
    if (!req.email) {
      response = await reply.code(401).send({
        error: 'Unauthorized'
      })
      return response;
    } else {
      response = await reply.code(200).send({
        jwt: req.token
      })
    }
  } catch (e) {
    fastify.log.error(e);
    process.exit(1)
  }
}