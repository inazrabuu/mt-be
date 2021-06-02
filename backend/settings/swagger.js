module.exports = function(app){
  const swaggerJsdoc = require('swagger-jsdoc'),
  swaggerUi = require('swagger-ui-express')

  const docs = require('../swagger.json');
  app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(docs, { explorer: true })
  );
}