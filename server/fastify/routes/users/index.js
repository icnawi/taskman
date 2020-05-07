const userCtrl = require('../../controllers/user.controller');

module.exports = async (fastify, opts, next) => {
  fastify.route({
    method: 'POST',
    url: '/api/users',
    handler: userCtrl.createUser
  });

  next()
}