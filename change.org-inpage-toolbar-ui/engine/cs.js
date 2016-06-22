module.exports = cs;

function cs() {

  this.initValue = 1;

  this.toolbarUI = null;

  // Create the toolbar ui iframe and inject it in the current page
  this.initToolbar = function() {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", chrome.runtime.getURL("loadbar/ui.html"));
    iframe.setAttribute("style", "position: fixed; top: 0; left: 0; z-index: 10000; width: 100%;");
    document.body.appendChild(iframe);

    return toolbarUI = {
      iframe: iframe, visible: true
    };
  }

  this.toggleToolbar = function(toolbarUI) {
    if (toolbarUI.visible) {
      toolbarUI.visible = false;
      toolbarUI.iframe.style["display"] = "none";
    } else {
      toolbarUI.visible = true;
      toolbarUI.iframe.style["display"] = "block";
    }
  }

  this.getSignerFormData = function(){
    return {
      email: document.getElementById("email").value,
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      state_province: document.getElementById("state_province").value,
      postal_code: document.getElementById("postal_code").value,
      country_code: document.getElementById("country_code").value
    }
  }

  this.setSignerFormData = function(data){
    document.getElementById("email").value = data.email;
    document.getElementById("email2").value = data.email;
    document.getElementById("address").value = data.address;    
    document.getElementById('first_name').value = data.first_name;
    document.getElementById('last_name').value = data.last_name;    
    document.getElementById('city').value = data.city;
    document.getElementById('state_province').value= data.state_province;
    document.getElementById('postal_code').value = data.postal_code;
    document.getElementById('country_code').value = data.country_code;
  }

  this.getPetitionUrl = function(){
    return document.getElementById("url").value;
  }

  this.setPetitionData = function(data){
    document.getElementById("id").value = data.id;
    document.getElementById("key").value = data.key;
    document.getElementById("reasons").value = data.reasons;
  }

  this.getPetitionId = function(){
    return document.getElementById("id").value;
  }

  this.addPetitionToList = function(petition){
    var option = document.createElement("option");
    option.text = petition.title;
    option.value = petition.id;
    option.style = "cursor:pointer;";
    var select = document.getElementById("list");
    select.appendChild(option);
    console.log("append item to list", option);
    option.addEventListener("click", 
        function(ev) {
           console.log("onListLoadPicked: " + option.value );
        }
    );

  }

  /**
   * Fills UI petitions list with given list by replacing previous content.
   **/
  this.refreshPetitionsList = function(petitionsList){

    if ( petitionsList.length == 0 ) return;

    for (var i = 0; i < petitionsList.length ; i++ ) {
      var petition = petitionsList[i];

      this.addPetitionToList(petition);
    }

  }

  /**
   * Fills UI petitions list with given list by replacing previous content.
   **/
  this.refreshWidget = function(state, petition, signerData, error){

    if ( state == "load") loadPetition(petition, signerData);
    else if ( state == "error" ) loadPetition(petition, signerData);
    else if ( state = "signed" ) loadSignerData(null);       

  }

  /**
   * Fill UI input data with petition data.
   */
  this.loadPetition = function(petition){
    document.getElementById("id").value = petition.id;
    document.getElementById("title").value = petition.title;
    document.getElementById("overview").innerHTML = petition.overview;
    document.getElementById("image_url").src = petition.image_url;
    document.getElementById("signature_count").value = petition.signature_count;
    document.getElementById("goal").value = petition.goal;
  }

  /**
   * Fill UI input with data for a signer. 
   *
   * @param data Use null to clean screen.
   **/
  this.loadSignerData = function(data){

    document.getElementById("email2").value = data.email;    
    document.getElementById("key").value = data.key;
    document.getElementById("reason").value = data.reason;
  }

  this.init = function(){

    // Handle messages from the add-on background page (only in top level iframes)
    if (window.parent == window) {
      chrome.runtime.onMessage.addListener(function(msg, data) {
        if (msg == "toggle-in-page-toolbar") {
          if (toolbarUI) {
            toggleToolbar(toolbarUI);
          } else {
            toolbarUI = initToolbar();
          }
        } else if (msg == "onPetitionReceived") {
          setSignerFormData(data);
          setPetitionData(data);
        } else if (msg == "onAuthorizationReceived") {
          resetSignerForm(data);
        }
      });
    }
  }

  
}

