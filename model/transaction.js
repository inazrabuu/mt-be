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

  async update(params, field, value){
    let fieldValues = '',
        fieldvalues = [],
        param = []

    params.map(m => {
      for (let k in m){
        fieldvalues.push(`${k} = ?`)
        param.push(m[k])
      }
    })

    fieldValues = fieldvalues.join(', ')
    param.push(value)

    let sql = `UPDATE ${this.table} SET ${fieldValues} WHERE ${field} = ?`
    await this.db.exec(sql, param)
  }
}

module.exports = new Transaction()