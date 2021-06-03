const { expect } = require('chai')
const midtransHelper = require('./helper/midtrans'),
      responseHelper = require('./helper/response')

test('create response', async () => {
  let rb = responseHelper.get()
  expect(rb.code).equal(200)
})

test('get status alias', async () => {
  let status = midtransHelper.getTransactionStatusAlias('cancel', '')
  expect(status).equal('failure')

  status = midtransHelper.getTransactionStatusAlias('deny', '')
  expect(status).equal('failure')

  status = midtransHelper.getTransactionStatusAlias('capture', 'accept')
  expect(status).not.equal('capture')
})