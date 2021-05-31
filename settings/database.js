const db = require('../config/database')
module.exports = async function(req, res, next){
  req.database = new db()
  await req.database.init()
  next()
}