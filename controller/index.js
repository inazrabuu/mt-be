const request = require('request-promise'),
      midtransHelper = require('../helper/midtrans'),
      responseHelper = require('../helper/response'),
      transactionModel = require('../model/transaction')

class Index{
  async index(req, res, next){
    res.json(responseHelper.get())
  }

  async getSnap(req, res, next){
    let responseBody = responseHelper.get()

    let options = midtransHelper.buildSnapOptions(req.body)

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

    let { transaction_id, transaction_time, transaction_status, 
          fraud_status, payment_type, order_id, 
          gross_amount } = req.body

    if (typeof(fraud_status) == 'undefined')
      fraud_status = ''

    transaction_status = midtransHelper.getTransactionStatusAlias(transaction_status, fraud_status)
    
    try{
      await transactionModel.create([
        transaction_id, transaction_time, transaction_status, 
        order_id, payment_type, parseFloat(gross_amount), JSON.stringify(req.body)
      ])
  
      responseHelper.set(responseBody, 200, 'success', { transaction_id })
    } catch (e){
      console.log(e)

      responseHelper.set(responseBody, 500, 'error', e)
    }

    res.status(responseBody.code).json(responseBody)
  }
}

module.exports = Index