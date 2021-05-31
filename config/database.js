const mysql = require('mysql2')

class Db{
	constructor(){
		this.conn = mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME
		})
	}

  async init(){
    let sql = "CREATE TABLE IF NOT EXISTS `transaction` ("
      +"`id` int NOT NULL AUTO_INCREMENT,"
      +"`transaction_id` varchar(255) DEFAULT '',"
      +"`transaction_time` varchar(255) DEFAULT '',"
      +"`transaction_status` varchar(255) DEFAULT '',"
      +"`payment_type` varchar(255) DEFAULT '',"
      +"`payload` json DEFAULT NULL,"
      +"`created_at` datetime DEFAULT CURRENT_TIMESTAMP,"
      +"PRIMARY KEY (`id`)"
      +") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"

      await this.exec(sql, [])
  }

	exec(sql, param){
		return new Promise((resolve, reject) => {
			this.conn.query(sql, param, (err, results, fields) => {
				if (err){
					this.conn.destroy()
					reject(err)
				}

				resolve(results)
			})
		})
	}
}

module.exports = Db