const BaseModel = require('./base')

class Transaction extends BaseModel{
  constructor(){
    super()
    this.table = 'transaction'
  }

  async create(params){
    let sql = `INSERT INTO ${this.table} 
              (transaction_id, transaction_time, transaction_status, order_id, payment_type, gross_amount, payload) 
              VALUES (?, ?, ?, ?, ?, ?, ?)`
    await this.db.exec(sql, params)
  }
}

module.exports = new Transaction()