const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../middleware/verifyToken');
const taskCtrl = require('../controllers/tasks.controller');

/* GET tasks listing. */
router.get('/tasks', verifyToken, taskCtrl.getAllTasks);

/* GET a single task. */
router.get('/tasks/:id', verifyToken, taskCtrl.getTaskById);

/* POST add task. */
router.post('/tasks', verifyToken, taskCtrl.addTask);

/* PUT update to our task*/
router.put('/tasks/:id', verifyToken, taskCtrl.updateTask);

/* DELETE a task. */
router.delete('/tasks/:id', verifyToken, taskCtrl.removeTask);

module.exports = router;
