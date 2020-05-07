const mongoose = require('mongoose');
const taskSchema = require('./Task');

const TasksSchema = new mongoose.Schema({
  tasks: [taskSchema],
  meta: {
    current: Number,
    limit: Number,
    count: Number
  }
});

module.exports = mongoose.model('Tasks', TasksSchema)