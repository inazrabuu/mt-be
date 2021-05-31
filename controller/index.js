class Index{
  async index(req, res, next){
    res.json({
      code: 200,
      body: {
        message: 'success',
        data: []
      }
    })
  }
}

module.exports = Index