const logger = require('morgan');
const pino = require('pino');
const expressPino = require('express-pino-logger');
const noir = pino({level: process.env.LOG_LEVEL || 'info'})
const expressLogger = expressPino({ noir });

module.exports = { noir, logger }