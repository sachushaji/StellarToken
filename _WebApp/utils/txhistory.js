const StellarSdk = require('stellar-sdk');

function txhistory(req,res)
{

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// const accountId = req.body.sourceSecretKey;

const accountId ='GA5KODDUMD5PJFMPK3QT77TF7H6ILLCCWGDFJZRPM7WGM55GMVSD2PA7';

server.transactions()
  .forAccount(accountId)
  .call()
  .then((page) => {
    console.log('Page 1: ');
    console.log(page.records);
    res.render('txhistory');
    return page.next();
  })
  // .then((page) => {
  //   console.log('Page 2: ');
  //   console.log(page.records);
  // })
  .catch((err) => {
    console.log(err);
  });

}
module.exports = {txhistory};