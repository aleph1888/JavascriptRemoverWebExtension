/**
 * Signer data cookie
 */
var mSignerDataCookie = {
    storeId: "changeorgwebext",
    name: "signer_data",
   	signer: {email: "foo@foo.fo",
  	         name: "foo",
  	         address: "foo"},
    expirationDate: 1833062400
};

var getSignerDataCookie = browser.cookies.get({
  storeId: "changeorgwebext",
  name: "signer_data",
});


/**
 * Setting value
 */

var callback_set;

function onSet(cookie) {
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
var callback_got;
var callback_error;

function gotCookie(cookie) {
  console.log(cookie);
  callback_got(cookie);  
}

function gotError(errorMessage) {
  console.error(errorMessage);
  callback_error(errorMessage);
}

/**
 * Nulls signer data cookie.
 *
 * @param callback See {@link #onSet(cookie)} 
 **/
function deleteSignerDataCookie(callback){

  mSignerDataCookie.signer = null;

  chrome.cookies.set(mSignerDataCookie, callback);

}

/**
 * Fills signer data cookie.
 *
 * @param callback See {@link #onSet(cookie)} 
 **/
function setSignerDataCookie(cookie, callback){

  chrome.cookies.set(cookie, callback);

}

/**
 * Retrieves signer data cookie.
 *
 * @param callbackSuccess See {@link #gotCookie(cookie)} 
 * @param callbackError See {@link #gotError(cookie)} 
 **/
function getSignerDataCookie(callbackSuccess, callbackError){

  getSignerDataCookie.then(callbackSuccess, callbackError);

}