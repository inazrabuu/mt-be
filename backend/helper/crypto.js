const crypto = require('crypto')

class CryptoHelper{
  signContent(payload, privateKey){
    const sign = crypto.createHash('sha256')
          .update(`${payload}${privateKey}`)
          .digest('hex')

    return sign
  }
}

module.exports = new CryptoHelper()