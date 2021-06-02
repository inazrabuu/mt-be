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
      +"`user_id` int NOT NULL,"
      +"`transaction_id` varchar(255) DEFAULT '',"
      +"`transaction_time` varchar(255) DEFAULT '',"
      +"`transaction_status` varchar(255) DEFAULT '',"
      +"`order_id` varchar(255) DEFAULT '',"
      +"`payment_type` varchar(255) DEFAULT '',"
      +"`gross_amount` decimal(15, 2) DEFAULT 0,"
      +"`payload` json DEFAULT NULL,"
      +"`created_at` datetime DEFAULT CURRENT_TIMESTAMP,"
      +"PRIMARY KEY (`id`)"
      +") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
    
    let sqlCard = "CREATE TABLE IF NOT EXISTS `card` ("
      +"`id` int NOT NULL AUTO_INCREMENT,"
      +"`user_id` int NOT NULL,"
      +"`token` varchar(255) NOT NULL,"
      +"`masked` varchar(255) NOT NULL,"
      +"`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,"
      +"PRIMARY KEY (`id`)"
      +") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"

      await this.exec(sql, [])
      await this.exec(sqlCard, [])
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