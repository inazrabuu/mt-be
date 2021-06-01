const BaseModel = require('./base')

class CardModel extends BaseModel{
  constructor(){
    super()
    this.table = 'card'
  }

  async create(userId, token, masked){
    let sql = `INSERT INTO ${this.table} (user_id, token, masked) 
              VALUES (?, ?, ?)`
    await this.db.exec(sql, [userId, token, masked])
  }

  async getByUser(userId){
    let sql = `SELECT id, user_id, token, masked From ${this.table} WHERE user_id = ?`

    let response = this.db.exec(sql, [userId])

    return response
  }
}

module.exports = new CardModel()