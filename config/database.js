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