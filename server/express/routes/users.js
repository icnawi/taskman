const { Router } = require('express');
const router = Router();
const userCtrl = require('../controllers/user.controller')

/* POST users listing. */
router.post('/users', userCtrl.createUser);
router.post('/auth', userCtrl.auth);

module.exports = router;
