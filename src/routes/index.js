const express = require('express');
const router = express.Router();
const { swaggerUi, specs } = require('../lib/swagger');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

router.get('/', (req, res) => {
  res.send('ok');
});

module.exports = router;