const { Router } = require('express');
const { message } = require('../helpers/messages')

const router = Router();

/* GET home page. */
router.get('/', async (req, res) => {
  res.status(404).render('index', { message })
});

module.exports = router;
