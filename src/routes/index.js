const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { swaggerUi, specs } = require('../lib/swagger');
const apiRouter = require('./api/v1');
const swaggerDocument = require('./api/v1/swagger.json');       
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, specs));  
=======
const apiRouter = require('./api/v1');
>>>>>>> eac178c4e49e775abf3b7a59062b77737e5502c0

router.get('/', (req,res) =>{
    res.send('ok');
});

router.use('/api', apiRouter);

module.exports = router;