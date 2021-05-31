global.config = require('dotenv').config()
global.express = require('express')
global.app = express();

require('./settings/setting')(app)

app.listen(process.env.APP_PORT, () => {
  console.log(`${process.env.APP_NAME} is running on ${process.env.APP_PORT}`)
})