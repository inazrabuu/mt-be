const { json } = require('body-parser')
const request = require('request-promise'),
      midtransHelper = require('../helper/midtrans'),
      responseHelper = require('../helper/response'),
      transactionModel = require('../model/transaction'),
      cardModel = require('../model/card')

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
      return next(new Error(e))
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
      return next(new Error(e))
    }

    res.status(responseBody.code).json(responseBody)
  }

  async saveCard(req, res, next){
    let responseBody = responseHelper.get()

    let userId = req.body.user_id || 0,
        token = req.body.token || 'thetoken',
        masked = req.body.masked || 1234

    try{
      await cardModel.create(userId, token, masked)

      responseHelper.set(responseBody, 200, 'success', { userId, token })
    } catch (e){
      return next(new Error(e))
    }

    res.status(responseBody.code).json(responseBody)
  }

  async getUserToken(req, res, next){
    let responseBody = responseHelper.get()

    let userId = req.params.user_id || 1

    try{
      let response = await cardModel.getByUser(userId)

      responseHelper.set(responseBody, 200, 'success', response)
    } catch(e){
      return next(new Error(e))
    }

    res.status(responseBody.code).json(responseBody)
  }
}

module.exports = Index