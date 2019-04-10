const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const accountId = 'GA5KODDUMD5PJFMPK3QT77TF7H6ILLCCWGDFJZRPM7WGM55GMVSD2PA7';

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

// hash: 9218181b30fa77910bbfcc7af1c2402e757f2d3d34793b8536d0bf3c878db75d
