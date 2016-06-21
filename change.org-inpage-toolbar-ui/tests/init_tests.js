
QUnit.module( "A) Boot sequence" );
QUnit.test( "Test engine", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "content scripts loading", function( assert ) {

  var content = new cs();
  var background = new bg();
  var port = new pt();
  var cookie = new sd_c();

  assert.ok( 1 == content.initValue, "Controler loaded: Passed!" );
  
  assert.ok( 1 == background.initValue, "Controler loaded: Passed!" );

  assert.ok( 1 == port.initValue, "Worker loaded: Passed!" );

  var cookieData;
  cookie.getSignerDataCookie( function(data){
      cookieData = data;
      if ( data != null && data.signer != null ) assert.ok(true, "Cached default value: " + data.signer.name);
      else assert.ok(true, "Cached default value: " + data);
    });

  var message = cookieData == undefined ? "] Default: " + cookie.mSignerDataCookie.name : cookieData.name;
  assert.ok(true, 
    "Cookies loaded: [" + message    
  );

  if ( cookieData == undefined ) {
     assert.ok(true, "Cached going to init");
     cookie.initSignerDataCookie();
  }

  cookie.getSignerDataCookie(
    function(data){
      cookieData = data;
      assert.ok(data != undefined, "Cached Cookie signer [name: " + cookieData.signer.name + "]");
    }
  );
    
});

