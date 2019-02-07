const Stellar = require('stellar-sdk');
const rq = require('request-promise');

function accountCreation(req,res)
{
Stellar.Network.useTestNetwork();

async function createNewAccount() {
  const pair = Stellar.Keypair.random();
  console.log(`Public key  = ${pair.publicKey()}\nPrivate key = ${pair.secret()}`);
  
}

createNewAccount();

}

module.exports = {accountCreation};