class ResponseHelper{
  get(){
    return {
      code: 200,
      body: {
        message: 'success',
        data: {}
      }
    }
  }

  set(responseBody, code, message, data){
    responseBody.code = code
    responseBody.body.message = message
    responseBody.body.data = data

    return responseBody
  }
}

module.exports = new ResponseHelper()