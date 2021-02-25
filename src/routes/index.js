const express = require('express');
const router = express.Router();
const { swaggerUi, specs } = require('../lib/swagger');
const apiRouter = require('./api/v1');
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

router.get('/', (req,res) =>{
    res.send('ok');
});

router.use('/api', apiRouter);

module.exports = router;