module.exports = function(app){
	app.use((req, res, next) => {
		// let err = new Error('File Not Found')
		// err.status = 404
		// next(err)
		let context = {
      code: 404,
      body: {
        title: 'Route not found!',
			  text: `We can't find your requested page, please go back to home.`
      }
		}
		res.status(404).json(context)
	})
	
	app.use((err, req, res, next) => {
		// res.status(err.status || 500).json({
		// 	message: err.message,
		// 	error: {}
		// })
		console.log(err)
		let text = process.env.ENV == 'prod' ? 
			"Something is wrong with the response, please try again." : err.message
		let context = {
      code: err.status || 500,
      body: {
        title: "Internal Error",
			  text: text
      }
		}
    // res.render('error', context)
    res.status(err.status || 500).json(context)
	})
}