https =require('https');

function checkbalance(req,res)
{
https.get('https://horizon-testnet.stellar.org/accounts/'+ req.body.BPublicKey,function(response){
    response.on('data',function(data)
    {
        full_data=JSON.parse(data.toString());
        
        console.log(full_data.balances[1].balance);
        
        
    })
});

}
module.exports = {checkbalance};