/**
 * @Author Sachu Shaji Abraham <sachushajiabraham@gmail.com>
 */

const StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// Keys for accounts to issue and receive the new asset
const issuingKeys = StellarSdk.Keypair
  .fromSecret('SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4');
const receivingKeys = StellarSdk.Keypair
  .fromSecret('SDSAVCRE5JRAI7UFAVLE5IMIZRD6N6WOJUWKY4GFN34LOBEEUS4W2T2D');

// Create an object to represent the new asset
const astroDollar = new StellarSdk.Asset('AstroDollar', issuingKeys.publicKey());

// First, the receiving account must trust the asset
server.loadAccount(receivingKeys.publicKey())
  .then((receiver) => {
    const transaction = new StellarSdk.TransactionBuilder(receiver)
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: astroDollar,
        limit: '1000',
      })).setTimeout(1000)
      .build();
    transaction.sign(receivingKeys);
    return server.submitTransaction(transaction);
  })

  // Second, the issuing account actually sends a payment using the asset
  .then(() => server.loadAccount(issuingKeys.publicKey()))
  .then((issuer) => {
    const transaction = new StellarSdk.TransactionBuilder(issuer)
      .addOperation(StellarSdk.Operation.payment({
        destination: receivingKeys.publicKey(),
        asset: astroDollar,
        amount: '10',
      })).setTimeout(1000)
      .build();
    transaction.sign(issuingKeys);
    return server.submitTransaction(transaction);
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error('Error!', error);
  });
