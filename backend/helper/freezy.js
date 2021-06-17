class FreezyHelper{
  constructor(){
    this.url = process.env.FREEZY_API_URL
    this.callbackPath = process.env.FREEZY_API_PATH_CALLBACK
    this.clientId = process.env.FREEZY_API_CLIENT_ID
    this.clientKey = process.env.FREEZY_API_CLIENT_KEY
    this.clientSecret = process.env.FREEZY_API_CLIENT_SECRET
    this.clientAuth = process.env.FREEZY_API_CLIENT_AUTH
  }

  getSignaturePayload(){
    let timestamp = Math.floor(new Date().getTime() / 1000)

    return {
      timestamp: timestamp,
      signatureString: `client_id=${this.clientId}&client_key=${this.clientKey}&timestamp=${timestamp}`
    }
  }

  buildHeader(timestamp, signature){
    console.log(timestamp, signature)
    return {
      'x-timestamp': timestamp,
      'x-tyk-auth': this.clientAuth,
      'x-signature': signature,
      'x-client-id': this.clientId,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  buildCallbackOptions(timestamp, signature, payload){
    return {
      url: `${this.url}${this.callbackPath}`,
      headers: this.buildHeader(timestamp, signature),
      body: payload,
      json: true
    }
  }

  translateStatus(status){
    let newStatus = 'SUCCEED'
    if (status == 'cancel' || status == 'deny' || status == 'expire'){
      newStatus = 'FAILED'
    }

    return newStatus
  }
}

module.exports = new FreezyHelper()