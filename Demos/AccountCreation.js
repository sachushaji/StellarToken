/**
 * @Author Sachu Shaji Abraham <sachushajiabraham@gmail.com>
 */

const Stellar = require('stellar-sdk');

Stellar.Network.useTestNetwork();

async function createNewAccount() {
  const pair = Stellar.Keypair.random();
  console.log(`Public key  = ${pair.publicKey()}\nPrivate key = ${pair.secret()}`);
}

createNewAccount();

// https://medium.com/wearetheledger/exploring-stellar-lumens-development-tutorial-78b4e1c92733
// https://medium.com/wearetheledger/stellar-escrow-smart-contract-development-4c43ef32ac4b
