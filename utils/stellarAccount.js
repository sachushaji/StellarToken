const Stellar = require('stellar-sdk');

const { isProduction } = process.env;

// To set changes in according to production or testnet
if (isProduction) {
  Stellar.Network.usePublicNetwork();
} else {
  Stellar.Network.useTestNetwork();
}

class Account {
  /**
    * @function createNewAccount()
    * @description Creates a random account
    * @returns keypair
    * @example
    * console.log(`public key = ${pair.publicKey()} private key = ${pair.secret()}`);
    */
  async createNewAccount() {
    this.pair = await Stellar.Keypair.random();
    return this.pair;
  }

  async sendLumens(){
    
  }
}


module.exports = Account;
