const request = require('request');
const querystring = require('querystring');
const tanentId = 'TENANT-ID';
const subId = 'SUBSCRIPTION-ID';
const clientId = 'CLIENT-ID';
const clientSecret = 'CLIENT-SECRET';
const functionAppId = 'FUNCTION-APP-ID';
const resGroup = 'RES-GROUP';
var vmName = 'test64';
const scopeAzure = "SCOPE"


module.exports =  function (context, req) {

    vmName = (req.query.name || (req.body && req.body.name));


    getToken(function(err,token){

        context.log(token);

        if(!err){

            deleteVm(token,function(err,res){

                if(!err){

                    context.log("OK");
                    context.res = { status: 200, body: 'ok' }
                    context.done();



                }else{
                    context.log("Errore cancellazione VM: "+err);
                    context.res = { status: 400, body: 'nooooo' }
                    context.done();
                }


            });


        }else{
            context.res = { status: 200, body: 'Errore Token' }
            context.log("Errore Token")
            context.done();
        }
        
    });
    
    

}


//Cancella LA VM 
var deleteVm = function(token,callback){

    var options = {
        uri:'https://management.azure.com/subscriptions/'+subId+'/resourceGroups/'+resGroup+'/providers/Microsoft.Compute/virtualMachines/'+vmName+'?api-version=2020-06-01',
        method: 'DELETE',
        headers:{
            'Authorization': "Bearer "+token
        }
    };

    request(options, function (error, response, body){

              
        if(!error && response.statusCode == 202){
            callback(null,response);
            
        }else{
            callback(error, body);
        }
            
    });


}


//Cancella LA NETWORK INTERFACE 
var deleteNetworkInterface = function(token,callback){

    var options = {
        uri:'https://management.azure.com/subscriptions/'+subId+'/resourceGroups/'+resGroup+'/providers/Microsoft.Network/networkInterfaces/'+vmName+'_netInterface?forceDelete=true&api-version=2020-07-01',
        method: 'DELETE',
        headers:{
            'Authorization': "Bearer "+token
        }
    };

    request(options, function (error, response, body){

              
        if(!error && response.statusCode == 202){
            callback(null,response);
            
        }else{
            callback(error, body);
        }
            
    });


}



//Cancella L' IP'
var deleteIp = function(token,callback){

    var options = {
        uri:'https://management.azure.com/subscriptions/'+subId+'/resourceGroups/'+resGroup+'/providers/Microsoft.Network/publicIPAddresses/'+vmName+'_ip?forceDelete=true&api-version=2020-07-01',
        method: 'DELETE',
        headers:{
            'Authorization': "Bearer "+token
        }
    };

    request(options, function (error, response, body){

              
        if(!error && response.statusCode == 202){
            callback(null,response);
            
        }else{
            callback(error, body);
        }
            
    });


}










//PRENDE IL TOKEN 
var getToken = function(callback){

    var token

    var data = {
        client_id:clientId,
        client_secret:clientSecret,
        grant_type:'client_credentials',
        scope : scopeAzure
    }

    var form = querystring.stringify(data);

    var options = {
        uri:'https://login.microsoftonline.com/'+tanentId+'/oauth2/v2.0/token',
        method: 'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:form
    };

    request(options, function (error, response, body){

              
        if(response.statusCode != 200){
            callback(body.error,null);
        }else{
            token = JSON.parse(body).access_token;
            callback(null,token);
        }
            
    });
}



function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n) {
  msleep(n*1000);
}
