'use strict'

const { config } = require('dotenv');
const path = require('path')
const AutoLoad = require('fastify-autoload')
const mongoose = require('mongoose')
// const fmongo = require('fastify-mongoose')
const cors = require('fastify-cors')

module.exports = function (fastify, opts, next) {

  // Plugins
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // Services
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts)
  })

  // DB
  // const db = mongoose.connection
 config();
  const launchDB = async () => {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  }

  launchDB().catch(e => {
    fastify.log.error(e);
    process.exit(1)
  })

  const db = mongoose.connection;
  db.on('error', err => {
    fastify.log.error(err);
  });

  db.once('open', () => {
    fastify.log.info('connected')
  });

  // Cross-origin
  fastify.register(cors, {
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    origin: "*",
    maxAge: 86400
  })

  // Helmet
  fastify.register(require('fastify-helmet'))

  // Routes
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign ({}, opts)
  })

  next()
}
