
var StellarSdk = require('stellar-sdk');


function assetCreation(req,res)
{
StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var assetCode = req.body.AssetCode; 
var assetLimit = req.body.Limit;
// Keys for accounts to issue and receive the new asset
var issuingKeys = StellarSdk.Keypair
  .fromSecret(req.body.IssuersPrivateKey);
var receivingKeys = StellarSdk.Keypair
  .fromSecret(req.body.ReceversPrivateKey);

// Create an object to represent the new asset
var assetCode = new StellarSdk.Asset(assetCode, issuingKeys.publicKey());

// First, the receiving account must trust the asset
server.loadAccount(receivingKeys.publicKey())

  .then(function(receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver)
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: assetCode,
        limit: assetLimit
      }))
      .setTimeout(1000)
      .build();
    transaction.sign(receivingKeys);
    return server.submitTransaction(transaction);




  })

  // Second, the issuing account actually sends a payment using the asset
  .then(function() {
    return server.loadAccount(issuingKeys.publicKey())
  })
//   .then(function(issuer) {
//     var transaction = new StellarSdk.TransactionBuilder(issuer)
//       .addOperation(StellarSdk.Operation.payment({
//         destination: receivingKeys.publicKey(),
//         asset: assetCode,
//         amount: '10'
//       }))
//       .setTimeout(1000)
//       .build();

//     transaction.sign(issuingKeys);
//     return server.submitTransaction(transaction);

//   })
  .catch(function(error) {
    console.error('Error!', error);
  });
  res.redirect('/');
  console.log('Check the account at')
  console.log('https://horizon-testnet.stellar.org/accounts/'+ req.body.ReceversPrivateKey);
}
module.exports = {assetCreation};