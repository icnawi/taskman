const { Router } = require('express');
const router = Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

/* Using Tasks API docs */
router.use('/docs', swaggerUi.serve);

/* GET Tasks API docs */
router.get('/docs', swaggerUi.setup(swaggerDocument));

module.exports = router;