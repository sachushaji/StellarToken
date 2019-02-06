
function txhistory(req,res)
{

const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const accountId = req.body.sourceSecretKey;

server.transactions()
  .forAccount(accountId)
  .call()
  .then((page) => {
    console.log('Page 1: ');
    console.log(page.records);
    return page.next();
  })
  .then((page) => {
    console.log('Page 2: ');
    console.log(page.records);
  })
  .catch((err) => {
    console.log(err);
  });

}
module.exports = {txhistory};