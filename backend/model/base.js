const Db = require('../config/database')

class BaseModel{
  constructor(){
    this.db = new Db()
    this.table = ''
  }

  _buildQuery(){
    
  }
}

module.exports = BaseModel