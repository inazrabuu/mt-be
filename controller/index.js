const request = require('request-promise'),
      midtransHelper = require('../helper/midtrans'),
      responseHelper = require('../helper/response')

class Index{
  async index(req, res, next){
    console.log(req.database)
    res.json({
      code: 200,
      body: {
        message: 'success',
        data: []
      }
    })
  }

  async getSnap(req, res, next){
    let orderId = req.body.orderId || 1
    let responseBody = responseHelper.get()

    let options = {
      url: `${midtransHelper.getSnapTransactionURL()}`,
      headers: midtransHelper.buildHeader(),
      body: {
        transaction_details: {
          order_id: `FREEZY-${orderId}-${Math.floor(new Date().getTime() / 1000)}`,
          gross_amount: 10000
        },
        credit_card: {
          secure: true
        },
        customer_details: {
          first_name: "mid",
          last_name: "trans",
          email: "midtrans@mailinator.com",
          phone: "081234567890"
        }
      },
      json: true
    }

    try{
      let response = await request.post(options)

      responseHelper.set(responseBody, 200, 'success', response)
    } catch (e){
      console.log(e)

      responseHelper.set(responseBody, 500, 'error', e)
    }

    res.status(responseBody.code).json(responseBody)
  }

  async postPaymentHandler(req, res, next){
    let responseBody = responseHelper.get()

    let { transaction_time, transaction_status, 
          transaction_id, payment_type, order_id, 
          gross_amount, card_type, bank } = req.body

    responseHelper.set(responseBody, 200, 'success', { transaction_time, transaction_status, bank })

    res.status(responseBody.code).json(responseBody)
  }
}

module.exports = Index