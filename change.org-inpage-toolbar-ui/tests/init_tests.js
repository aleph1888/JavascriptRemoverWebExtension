
QUnit.module( "A) Boot sequence" );
QUnit.test( "Test engine", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "Modules and state loader", function( assert ) {

  var content = new cs();
  var background = new bg();
  var port = new pt();
  var cookie = new sd_c();

  assert.ok( 1 == content.initValue, "content controler loaded: Passed!" );
  
  assert.ok( 1 == background.initValue, "background controler loaded: Passed!" );

  assert.ok( 1 == port.initValue, "worker loaded: Passed!" );

  var cookieData;
  cookie.getSignerDataCookie( function(data){
      cookieData = data;
      if ( data != null && data.signer != null ) assert.ok(true, "Cached default value: " + data.signer.name);
      else assert.ok(true, "Cached default value: " + data);
    });

  var message = cookieData == undefined ? "] Default: " + cookie.mSignerDataCookie.name : "] " + cookieData.name;
  assert.ok(true, 
    "Cookies loaded: [" + message    
  );

  if ( cookieData != undefined ) {
     assert.ok(true, "Cached going to init");
     cookie.initSignerDataCookie();
  }

  cookie.getSignerDataCookie(
    function(data){
      cookieData = data;
      assert.ok(data != undefined, "Cached Cookie signer [postal_code: " + cookieData.signer.postal_code + "]");
    }
  );
    
});

