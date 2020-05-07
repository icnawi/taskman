module.exports = async function (fastify, opts, next) {
  fastify.get('/', async function (req, reply) {
    return { status: 200 }
  })

  next();
}
