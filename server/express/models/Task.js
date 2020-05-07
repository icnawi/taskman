const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');


// Add expiry and pagination
const TaskSchema = new mongoose.Schema({
    id: { type: Number, default: 0, required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueBy: { type: Number, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true }
}, { versionKey: false })

autoIncrement.initialize(mongoose.connection);
TaskSchema.plugin(autoIncrement.plugin, {
  model: 'TaskSchema',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});


module.exports = mongoose.model('Task', TaskSchema)
