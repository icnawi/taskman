const Task = require('../models/Task');

exports.getTasks = async (req, reply) => {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (e) {
    fastify.log.error(e);
    process.exit(1)
  }
}

exports.getTask = async (req, reply) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    return task;
  } catch (e) {
    fastify.log.error(e);
    process.exit(1)
  }
}

exports.addTask = async (req, reply) => {
  try {
    const task = new Task(req.body);
    return task.save()
  } catch (e) {
    fastify.log.error(e);
    process.exit(1)
  }
}

exports.updateTask = async (req, reply) => {
  try {
    const id = req.params.id;
    const task = req.body;
    const {...updateData} = task;
    const refresh = await Task.findByIdAndUpdate(id, updateData, { new: true });
    return refresh;
  } catch (e) {
    fastify.log.error(e);
    process.exit(1)
  }
}

exports.removeTask = async (req, reply) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndRemove(id);
    return task;
  } catch (e) {
    fastify.log.error(e);
    process.exit(1)
  }
}