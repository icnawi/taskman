const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: String,
  dueBy: Date,
  priority: String
})

module.exports = mongoose.model('Task', TaskSchema)