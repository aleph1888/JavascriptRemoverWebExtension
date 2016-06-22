function sd_c(){

  this.initValue = 1;

  /**
   * Signer data cookie
   */


  var demoUser= {
    email: 'person@example.com',
    first_name: 'John',
    last_name: 'Doe',
    address: '1 Market St',
    city: 'Philadelphia',
    state_province: 'PA',
    postal_code: '19144',
    country_code: 'US'
  }

  this.mSignerDataCookie = {
      storeId: "changeorgwebext",
      name: "changeorgwebext.signer_data",
     	signer: demoUser,
      expirationDate: 1833062400
  };

   /**
   * Setting value
   */

  this.callback_set;

  this.onSet = function(cookie) {
    if (chrome.runtime.LastError) {
      console.error(chrome.runtime.LastError);
    } else {
      console.log(cookie);
      callback_set(cookie);
    }
  }

  /**
   * Retrieving value
   */
  this.callback_got;
  this.callback_error;

  this.gotCookie = function(cookie) {
    console.log(cookie);
    callback_got(cookie);  
  }

  this.gotError = function(errorMessage) {
    console.error(errorMessage);
    callback_error(errorMessage);
  }

  /**
   * Nulls signer data cookie.
   *
   * @param callback See {@link #onSet(cookie)} 
   **/
  this.deleteSignerDataCookie = function(callback){

    mSignerDataCookie.signer = null;

    chrome.cookies.set(mSignerDataCookie, callback);

  }

  /**
   * Fills signer data cookie.
   *
   * @param callback See {@link #onSet(cookie)} 
   **/
  this.setSignerDataCookie = function(cookie, callback){

    chrome.cookies.set(cookie, callback);

  }

  /**
   * Retrieves signer data cookie.
   *
   * @param callbackSuccess See {@link #gotCookie(cookie)} 
   * @param callbackError See {@link #gotError(cookie)} 
   **/
  this.getSignerDataCookie = function(callbackSuccess, callbackError){

    var addonCacheValue = JSON.parse(docCookies.getItem("changeorgwebext.signer_data"));

    QUnit.test( "docCookie retrieve action", function( assert ) {
      assert.ok(addonCacheValue != null, addonCacheValue.name );
    });

     callbackSuccess(addonCacheValue);
  }

  this.initSignerDataCookie = function() {

    docCookies.setItem("changeorgwebext.signer_data", JSON.stringify(this.mSignerDataCookie));
    self = this;
    QUnit.test( "docCookie write action", function( assert ) {
      var cached = JSON.parse(docCookies.getItem("changeorgwebext.signer_data"));
      console.log(cached.signer.first_name);
      assert.ok(
        cached != null,
        cached.name + " " + self.mSignerDataCookie.name );       
    });

  } 

}

module.exports = sd_c;
