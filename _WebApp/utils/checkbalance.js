https =require('https');

function checkbalance(req,res)
{
https.get('https://horizon-testnet.stellar.org/accounts/'+ req.body.BPublicKey,function(response){
    response.on('data',function(data)
    {
        console.log(req.body.BPublicKey);
        full_data=JSON.parse(data.toString()); 
        console.log(full_data);
        const account_balance = full_data.balances[full_data.balances.length-1].balance;
        res.send({
          status:true,
          balance:account_balance
        });
        
        
    })
});

}
module.exports = {checkbalance};