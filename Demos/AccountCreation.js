const Stellar = require('stellar-sdk');
const rq = require('request-promise');

Stellar.Network.useTestNetwork();

async function createNewAccount() {
  const pair = Stellar.Keypair.random();
  console.log(`public key = ${pair.publicKey()} private key = ${pair.secret()}`);
}

createNewAccount();
// https://medium.com/wearetheledger/exploring-stellar-lumens-development-tutorial-78b4e1c92733
//https://medium.com/wearetheledger/stellar-escrow-smart-contract-development-4c43ef32ac4b