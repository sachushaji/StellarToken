/**
 * @Author Sachu Shaji Abraham <sachushajiabraham@gmail.com>
 */

const Stellar = require('stellar-sdk');

const { isProduction } = process.env;
let server;

// To set changes in according to production or testnet
// Configure StellarSdk to talk to the horizon instance hosted by Stellar.org
if (isProduction) {
  server = new Stellar.Server('https://horizon.stellar.org');
  Stellar.Network.usePublicNetwork();
} else {
  server = new Stellar.Server('https://horizon-testnet.stellar.org');
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

  /**
 * Send lumens from one account to another
 * @param {String} sourceSecretKey
 * @param {String} receiverPublicKey
 * @param {String} amount
 * @returns {Promise}
 * @example
 * sendLumens('sourceSecretKey', 'receiverPublicKey', 'amount')
 *  .then((transactionResult) => {
 *  console.log(JSON.stringify(transactionResult, null, 2));
 *  console.log('\nSuccess! View the transaction at: ');
 *  console.log(transactionResult._links.transaction.href);
 * })
 * .catch((err) => {
 *  console.log('An error has occured:');
 *  console.log(err);
 * });
 */
  async sendLumens(sourceSecretKey, receiverPublicKey, amount) {
    // The source account is the account we will be signing and sending from.
    this.sourceSecretKey = sourceSecretKey;

    // Derive Keypair object and public key (that starts with a G) from the secret
    this.sourceKeypair = Stellar.Keypair.fromSecret(sourceSecretKey);
    this.sourcePublicKey = this.sourceKeypair.publicKey();

    this.receiverPublicKey = receiverPublicKey;

    // Transactions require a valid sequence number that is specific to this account.
    // We can fetch the current sequence number for the source account from Horizon.
    server.loadAccount(this.sourcePublicKey)
      .then((account) => {
        this.transaction = new Stellar.TransactionBuilder(account)
        // Add a payment operation to the transaction
          .addOperation(Stellar.Operation.payment({
            destination: receiverPublicKey,
            // The term native asset refers to lumens
            asset: Stellar.Asset.native(),
            //  Lumens are divisible to seven digits past
            // the decimal. They are represented in JS Stellar SDK in string format
            // to avoid errors from the use of the JavaScript Number data structure.
            amount,
          }))
        // Uncomment to add a memo (https://www.stellar.org/developers/learn/concepts/transactions.html)
        //   .addMemo(StellarSdk.Memo.text('Hello world!'))
          .setTimeout(1000)
          .build();

        // Sign this transaction with the secret key
        this.transaction.sign(this.sourceKeypair);

        // Let's see the XDR (encoded in base64) of the transaction we just built
        // console.log(this.transaction.toEnvelope().toXDR('base64'));

        // Submit the transaction to the Horizon server. The Horizon server will then
        // submit the transaction into the network for us.
        return server.submitTransaction(this.transaction);
      })
      .catch((e) => {
        console.error(e);
      });
  }
}


module.exports = Account;
