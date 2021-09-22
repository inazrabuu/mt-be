class MidtransHelper{
  constructor(){
    this.secretKey = process.env.MT_SECRET_KEY
    this.baseUrl = process.env.MT_BASE_URL
    this.snapPath = process.env.MT_SNAP_PATH
    this.transactionPath = process.env.MT_SNAP_TRX_PATH
    this.baseSnapUrl = `${this.baseUrl}${this.snapPath}`
    this.payments = ["credit_card", "cimb_clicks",
    "bca_klikbca", "bca_klikpay", "bri_epay", "echannel", "permata_va",
    "bca_va", "bni_va", "bri_va", "other_va", "gopay", "indomaret",
    "danamon_online", "akulaku", "shopeepay", "cstore"]
  }

  getConfig(){
    return {
      secretKey: this.secretKey,
      baseUrl: this.baseUrl,
      snapPath: this.snapPath,
      transactionPath: this.transactionPath,
      baseSnapUrl: this.baseSnapUrl
    }
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
  
  buildSnapOptions(payload){
    let orderId = payload.order_id || 1,
        userId = payload.user_id || 'user_01',
        firstName = payload.first_name || "first",
        lastName = payload.last_name || "last",
        email = payload.email || "email@memail.com",
        phone = payload.phone || '',
        amount = payload.amount || 10000,
        paymentType = payload.payment_type.toLowerCase() || 'all',
        itemDetails = []

    if (payload.items.length > 0){
      payload.items.map(i => {
        itemDetails.push({
          id: i.id,
          price: i.price,
          quantity: i.qty,
          name: i.name
        })
      })
    }
    
    return {
      url: `${this.getSnapTransactionURL()}`,
      headers: this.buildHeader(),
      body: {
        user_id: userId,
        transaction_details: {
          order_id: `${orderId}`,
          gross_amount: amount
        },
        item_details: itemDetails,
        enabled_payments: this.enabledPayments(paymentType),
        credit_card: {
          secure: true,
          save_card: true
        },
        customer_details: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone
        }
      },
      json: true
    }
  }

  enabledPayments(paymentType){
    let payments = []

    switch (paymentType){
      case 'all':
        payments = this.payments
      break
      case 'credit_card':
        payments.push(this.payments[0])
      break
      case 'non_credit_card':
        payments = this.payments.slice(1)
      break
    }

    return payments
  }

  getTransactionStatusAlias(transactionStatus, fraudStatus){
    if (transactionStatus == 'capture'){
      if (fraudStatus == 'challenge'){
        return 'challenge'
      } else if (fraudStatus == 'accept'){
        return 'success'
      }
    } else if (transactionStatus == 'settlement'){
      return 'success'
    } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' 
      || transactionStatus == 'expire'){
      return 'failure'  
    } else if (transactionStatus == 'pending'){
      return 'pending'
    }
  }
}

module.exports = new MidtransHelper()