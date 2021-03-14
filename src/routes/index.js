const express = require('express');
const router = express.Router();
const { swaggerUi, specs } = require('../lib/swagger');
const apiRouter = require('./api/v1');
const swaggerDocument = require('./api/v1/swagger.json');       
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, specs));  

router.get('/', (req,res) =>{
    res.send('ok');
});

router.use('/api', apiRouter);

module.exports = router;