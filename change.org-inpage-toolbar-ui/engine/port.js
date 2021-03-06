module.exports = pt;

function pt() {

  this.initValue = 1;

  this.mAPIClient = new ChangeOrgApiClient({
     api_key  : '7d28c145e1263dd16dd5da75b0c2136ae0621709300c3d2c57e501a99ffe171e',
     secret   : '0fb0c4561f65d53c2013c72cd2938a8fd23f7529dfd51d85472a1958db47a7e6'
  });

  this.mAPIChannel = new ChangeOrgApiPetition(this.mAPIClient);   

  this.mAPIChannel.setCallback(function(response) {
     alert(response.getData('result'));
  }); 

  /**
   * '1234567,7654321'
   * https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions.md#get-petitions
   **/
  this.petitionsGET = function(intBottom, inTop, callback){

    this.mAPIChannel.setCallback(function(response) {

        QUnit.module( "B) Load data sequence" );

        var response_data = {
            "page":1, "prev_page_endpoint":null, "next_page_endpoint":null,
            "total_pages":1,
            "petitions":
              [{"id" : 1, "title":"A Petition to Petition", "overview": "bla, bla",  "image_url": "images/test.png", "signature_count": 4, "goal": 10},
              {"id" : 2, "title":"ave the clock tower!", "overview": "aaa bla, bla",  "image_url": "images/test.png", "signature_count": 2, "goal": 5},
              ]
        }; 
        QUnit.test( "API CALLBACK", function( assert ) {
          assert.ok( response_data != null, response);
        });
        console.log(JSON.stringify(response_data));
        callback(response_data);
        // Console Output:
        // 
      });

    this.mAPIChannel.getPetitions({
        fields: ['id, title', 'overview', 'image_url', 'signature_count', 'goal']
    });
  }


  /**
  * @see https://github.com/vbuck/change-js-api/blob/master/examples/ChangeOrgApiPetition/getPetitionId.md
  * @param strUrl Sample: 'http://www.change.org/petitions/save-the-clock-tower'
  **/
  this.petitionGET = function(data, callback){

    return callback( {"email" : "dsgdg@dsgd.es", "key" : "dgsdgsdgdsg", "reason": "I support this petition!"} );
    
    /*var petition_id = data.id;

    this.mAPIChannel.getPetitionId(strUrl,function(response) {
      console.log(JSON.stringify(response.getData()));
      // Console Output:
      // {"result":"success","petition_id":1234567}
      callback(response.getData()); 
    });*/

  }

  /**
  * @see https://github.com/vbuck/change-js-api/blob/master/examples/ChangeOrgApiPetition/getPetitionId.md
  * @param strUrl Sample: 'http://www.change.org/petitions/save-the-clock-tower'
  **/
  this.petitionGET = function(data, callback){


    var strUrl = data.inputUrl;

    this.mAPIChannel.getPetitionId(strUrl,function(response) {
      console.log(JSON.stringify(response.getData()));
      // Console Output:
      // {"result":"success","petition_id":1234567}
      callback(response.getData()); 
    });

  }


  /**
   * https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/auth_keys.md
   **/
  this.authorizationGET = function(petition, signer, callback){
    
    callback( {"email" : "dsgdg@dsgd.es", "key" : "dgsdgsdgdsg", "reason": "I support this petition!"} );
    return;
/*
    var auth= this.mAPIChannel.getAuthorization();
    
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
                  
                  callback(response.getData());
                  // Console Output:
                  // {"auth_key":"YOUR_AUTH_KEY","petition_id":1234567,"requester_email":"...","source":"...","source_description":"...","status":"granted","result":"success"}
                  // {"result":"failure","messages":["user has already signed the petition"]}
                  *//*TODO
                  Using a Callback Endpoint
                  According to Change.org, you need to pass a callback_endpoint parameter along with your authorization request. 
                  This is because authorization keys are generated asynchronously to your request. 
                  Therefore, when the key is ready, it will be posted back to your given endpoint. In this case, 
                  it is up to you to listen for that response and make the authorization key available to your application
                  as it becomes available.
                  *//*
              });
          }

      });

    auth.authorize();
*/
  }

  /**
   * https://github.com/vbuck/change-js-api/blob/master/examples/ChangeOrgApiPetition/getAuthorization.md#sending-a-follow-up-request
   **/
  this.followUpTheRequest = function(intPetitionId){
    
    this.mAPIClient.setPetitionId(intPetitionId)
      .setRequesterEmail('requester@gmail.com')
      .setSource('http://www.myblog.com/sign-the-petition')
      .setSourceDescription('My Blog')
      .setFollowupFlag(true)
      .setCallback(function(response) {
          alert(response.getData('auth_key'));
      });
  }


  // system functions

  this.defaultQuery  = function(vMsg) {
    // your default PUBLIC function executed only when main page calls the queryableWorker.postMessage() method directly
    // do something
  }

  this.reply = function (/* listener name, argument to pass 1, argument to pass 2, etc. etc */) {
    if (arguments.length < 1) { throw new TypeError("reply - not enough arguments"); return; }
    postMessage({ "vo42t30": arguments[0], "rnb93qh": Array.prototype.slice.call(arguments, 1) });
  }


  this.onmessage = function (oEvent) {
    if (oEvent.data instanceof Object && oEvent.data.hasOwnProperty("bk4e1h0") && oEvent.data.hasOwnProperty("ktp3fm1")) {
      queryableFunctions[oEvent.data.bk4e1h0].apply(self, oEvent.data.ktp3fm1);
    } else {
      defaultQuery(oEvent.data);
    }
  };
 
}