const db = require('../config/database')
module.exports = function(app){
  app.database = new db()
}