var mAPIClient=new ChangeOrgApiClient({
   api_key  : '7d28c145e1263dd16dd5da75b0c2136ae0621709300c3d2c57e501a99ffe171e',
   secret   : '0fb0c4561f65d53c2013c72cd2938a8fd23f7529dfd51d85472a1958db47a7e6'
});

var mAPIChannel=new ChangeOrgApiPetition(mAPIClient);   

mAPIChannel.setCallback(function(response) {
   alert(response.getData('result'));
}); 

function petitionGET(objSignatureData){
  
  var auth=mAPIChannel.getAuthorization();
  
  auth.setPetitionId(1234567)
    .setRequesterEmail('requester@gmail.com')
    .setSource('http://www.myblog.com/sign-the-petition')
    .setSourceDescription('My Blog')
    .setCallback(function(response) {

        console.log(JSON.stringify(response.getData()));

        if(response.getData('status')=='granted') {
            petition.addSignature({
                petition_id     : 1234567,
                auth_key        : response.getData('auth_key'),
                source          : 'http://www.myblog.com/sign-the-petition',
                email           : 'requester@gmail.com',
                first_name      : 'John',
                last_name       : 'Doe',
                address         : '123 Any St.',
                city            : 'Beverly Hills',
                state_province  : 'CA',
                postal_code     : '90210',
                country_code    : 'US',
                phone           : '5555555555',
                reason          : 'I support this petition!',
                hidden          : true
            },function(response) {
                console.log(JSON.stringify(response.getData()));
                // Console Output:
                // {"auth_key":"YOUR_AUTH_KEY","petition_id":1234567,"requester_email":"...","source":"...","source_description":"...","status":"granted","result":"success"}
                // {"result":"failure","messages":["user has already signed the petition"]}
                /* TODO
                Using a Callback Endpoint
According to Change.org, you need to pass a callback_endpoint parameter along with your authorization request. 
This is because authorization keys are generated asynchronously to your request. 
Therefore, when the key is ready, it will be posted back to your given endpoint. In this case, 
it is up to you to listen for that response and make the authorization key available to your application
 as it becomes available.
                */
            });
        }

    });

  auth.authorize();

}

function authorizationGET(strEmail, intPetitionId) {
  mAPIChannel.addSignature({
     petition_id      : 'YOUR_PETITION_ID',
     auth_key         : 'YOUR_AUTH_KEY',
     source           : 'http://www.myblog.com/sign-the-petition/',
     email            : 'johndoe@gmail.com',
     first_name       : 'John',
     last_name        : 'Doe',
     address          : '123 Any St.',
     city             : 'Beverly Hills',
     state_province   : 'CA',
     postal_code      : '90210',
     country_code     : 'US',
     phone            : '5555555555',
     reason           : 'I support this petition',
     hidden           : false
  });
}

function signaturePUT(hashAuthorizationKey, intPetitionId) {
  mAPIChannel.addSignature({
     petition_id      : 'YOUR_PETITION_ID',
     auth_key         : 'YOUR_AUTH_KEY',
     source           : 'http://www.myblog.com/sign-the-petition/',
     email            : 'johndoe@gmail.com',
     first_name       : 'John',
     last_name        : 'Doe',
     address          : '123 Any St.',
     city             : 'Beverly Hills',
     state_province   : 'CA',
     postal_code      : '90210',
     country_code     : 'US',
     phone            : '5555555555',
     reason           : 'I support this petition',
     hidden           : false
  });
}


// system functions

function defaultQuery (vMsg) {
  // your default PUBLIC function executed only when main page calls the queryableWorker.postMessage() method directly
  // do something
}

function reply (/* listener name, argument to pass 1, argument to pass 2, etc. etc */) {
  if (arguments.length < 1) { throw new TypeError("reply - not enough arguments"); return; }
  postMessage({ "vo42t30": arguments[0], "rnb93qh": Array.prototype.slice.call(arguments, 1) });
}


onmessage = function (oEvent) {
  if (oEvent.data instanceof Object && oEvent.data.hasOwnProperty("bk4e1h0") && oEvent.data.hasOwnProperty("ktp3fm1")) {
    queryableFunctions[oEvent.data.bk4e1h0].apply(self, oEvent.data.ktp3fm1);
  } else {
    defaultQuery(oEvent.data);
  }
};