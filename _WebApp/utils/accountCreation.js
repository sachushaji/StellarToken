const Stellar = require('stellar-sdk');
const rq = require('request-promise');

function accountCreation(req,res)
{
Stellar.Network.useTestNetwork();

async function createNewAccount(res) {
  const pair = Stellar.Keypair.random();
  console.log(`Public key  = ${pair.publicKey()}\nPrivate key = ${pair.secret()}`);
  const public = `${pair.publicKey()}`;
  const private = `${pair.secret()}`;
  console.log(public);
  res.send({
    status:true,
    public:public,
    private:private
  });
  
}

createNewAccount(res);

}

module.exports = {accountCreation};