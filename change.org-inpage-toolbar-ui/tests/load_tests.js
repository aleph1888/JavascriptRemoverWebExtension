QUnit.module( "B) Load data sequence" );


QUnit.test( "Init loaders", function( assert ) {
  

  var background = new bg();

  background.startWorker();

  var content = new cs();

  background.UIQueue("init", null, function(list){
    console.log(list)
    assert.ok( list != null, "onListReceived Pages: " + list.total_pages );
    background.stopWorker();

    content.refreshPetitionsList(list.petitions);
  });

  var cookie = new sd_c();
   cookie.getSignerDataCookie(function(data){
      assert.ok( 1 == "1", "setSignerFormData " +  data.signer);
      content.setSignerFormData(data.signer);
    });;  
  
});


QUnit.test( "Load petition", function( assert ) {
  

  var background = new bg();

  background.startWorker();

  var content = new cs();

  var petitionData = {
    "id" : 1, 
    "title": "A Petition to Petition", 
    "overview": "bla, bla", 
    "image_url": "images/test.png", 
    "signature_count": 4, 
    "goal": 10
  };

  var cookie = new sd_c();
  cookie.getSignerDataCookie(function(data){
    
    background.UIQueue("list-load-pick", {petition: petitionData, signer: data.signer}, 
          function(petition){
             assert.ok( 1 == "1", "onLoadPetition " +  petition);
            content.loadPetition(petition);
          },
          function(authorization){
            assert.ok( 1 == "1", "onAuthorization " +  authorization);
            content.loadSignerData(authorization)
          }
      );
  });
  
});