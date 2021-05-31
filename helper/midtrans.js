class MidtransHelper{
  constructor(){
    this.secretKey = process.env.MT_SECRET_KEY
    this.baseUrl = process.env.MT_BASE_URL
    this.snapPath = process.env.MT_SNAP_PATH
    this.transactionPath = process.env.MT_SNAP_TRX_PATH
    this.baseSnapUrl = `${this.baseUrl}${this.snapPath}`
  }

  getSnapTransactionURL(){
    return `${this.baseSnapUrl}${this.transactionPath}`
  }

  buildHeader(){
    let authKey = Buffer.from(`${this.secretKey}:`).toString('base64')
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${authKey}`
    }
  }
}

module.exports = new MidtransHelper()