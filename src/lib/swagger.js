const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      tittle: 'Node API',
      version: '1.0.0',
      description: 'AppUs API with Express',
    },
    host: 'localhost:3000',
    basePath: '/',
  },
  apis: ['../routes/*.js', './swagger/*']
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};
