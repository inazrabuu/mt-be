module.exports = function(app){
  require('./bodyparser')(app)
  // require('./view')(app)
  // require('./session')(app)
  // require('./passport')(app)
  // require('./aws')(app)
  // app.use(express.static(__dirname + '/../public'))
  app.use('/', require('../route/router'))
  require('./swagger')(app)
  require('./error')(app)
}