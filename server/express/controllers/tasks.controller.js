const Task = require('../models/Task');
const { taskValidationError } = require('../helpers/messages');
const { noir } = require('../helpers/logger');
const jwt = require('jsonwebtoken');

/**
 * @method GET /tasks - all tasks
 * */
exports.getAllTasks = async (req, res, next) => {
  const perPage = 15;
  const page = !req.query.page ? (req.query.page = 1) : Number(req.query.page);
  const titleSorting = {
    asc: 1,
    desc: -1
  }

  const dueBySorting = {
    soonest: 1,
    newest: -1
  }

  // SORTING
  const titleSort = req.query.sort === `title asc` ? titleSorting.asc :  titleSorting.desc;
  const dueBySort = req.query.sort === `dueBy soonest` ? dueBySorting.soonest : dueBySorting.newest;

  // PAGINATION
  const pageSkip = !req.query.page ? 1 : req.query.page * perPage;

  //TODO: fix the following logic with query method style
  try {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
      if (err) {
        noir.error(err);
        await res.status(401).json({
          status: "Error",
          message: 'Unauthorized'
        })
      } else {
        console.log(page)
        const tasks = await Task
            .find({}, {_id:0})
            .limit(perPage)
            .skip((perPage * page) - perPage)
            .sort(req.query.sort
              ? { dueBy: dueBySort }
              : null);


        const meta = {
          current: Number(req.query.page),
          limit: perPage,
          count: tasks.length,
        }

        await res.json({ tasks, meta });
      }
    })
  } catch (e) {
    noir.error(e)
    process.exit(1)
  }
}

/**
 * @method GET /task/{task} - particular task by id
 * */
exports.getTaskById = async (req, res, next) => {
  try {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
      if (err) {
        noir.error(err);
        await res.status(401).json({
          status: "Error",
          message: 'Unauthorized'
        })
      } else {
        const id = req.params.id;
        const task = await Task
          .findOne({id}, {_id: 0});

        await res.json({task})
      }
    })

  } catch (e) {
    noir.error(e)
    res.status(500).send({
      error: 500,
      message: e['message']
    })
  }
}

/**
 * @method POST /tasks - add a single task
 * */
exports.addTask = async (req, res, next) => {
  try {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
      if (err) {
        console.log('ERR', err)
        noir.error(err);
        res.status(403).json({
          status: "Error",
          message: 'This action is unauthorized'
        })
      } else {
        const { title, description, dueBy, priority } = req.body;

        if (!title) {
          return res.status(422).json(taskValidationError)
        }

        const task = await Task.create({ title, description, dueBy, priority });

        task.save();
        res.status(201).json({
          status: "Success",
          message: "Task has been successfully created"
        });
      }
    })

  } catch (e) {
    noir.error(e);
    res.status(500).send({
      error: 500,
      message: e['message']
    })
  }
}

/**
 * @method PUT /task/{task} - update task by id
 * */
exports.updateTask = async (req, res, next) => {
  try {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
      if (err) {
        noir.error(err);
        await res.status(403).json({
          status: "Error",
          message: 'This action is unauthorized'
        })
      } else {
        const id = req.params.id;
        const { title, dueBy, description, priority } = req.body;
        const task = await Task
          .findOneAndUpdate(
            { id },
            { title, dueBy, priority },
            { new: true }
          )

        await task.save();
        res.status(201).send({ task :{ title, description, dueBy, priority, id: Number(id) }} )
      }
    })

  } catch (e) {
    noir.error(e);
    res.status(500).send({
      error: 500,
      message: e['message']
    })
  }
}

/**
 * @method DELETE /task/{task} - remove task by id
 * */
exports.removeTask = async (req, res, next) => {
  try {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
      if (err) {
        noir.error(err);
        await res.status(403).json({
          status: "Error",
          message: 'This action is unauthorized'
        })
      } else {
        const id = req.params.id;
        const task = await Task
          .findOneAndDelete(
            { id }
          )

        await task.save();
        res.status(202).send({
          status: "Success",
          message: "The item has been successfully deleted"
        })
      }
    })

  } catch (e) {
    noir.error(e);
    res.status(500).send({
      error: 500,
      message: e['message']
    })
  }
}

