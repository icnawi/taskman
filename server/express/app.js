const { config } = require('dotenv');
const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// LOGGER
const { noir, logger } = require('./helpers/logger');

// messages
const { message } = require('./helpers/messages');

// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const docsRouter = require('./routes/docs');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);
app.use('/api', [usersRouter, tasksRouter, docsRouter]);

// DB
config();
const launchDB = async () => {
  await mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
}

launchDB().catch(e => {
  noir.error(e);
  process.exit(1)
})

const db = mongoose.connection;
db.on('error', err => {
  noir.error(err);
});

db.once('open', () => {
  noir.info('Connected to MongoDB...')
});

// app.use(flash())
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   res.locals.user = req.user || null;
//   next();
// });

// HANDLERS
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { message });
});

module.exports = app;
