var toolbarUI;

// Create the toolbar ui iframe and inject it in the current page
function initToolbar() {
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src", chrome.runtime.getURL("loadbar/ui.html"));
  iframe.setAttribute("style", "position: fixed; top: 0; left: 0; z-index: 10000; width: 100%;");
  document.body.appendChild(iframe);

  return toolbarUI = {
    iframe: iframe, visible: true
  };
}

function toggleToolbar(toolbarUI) {
  if (toolbarUI.visible) {
    toolbarUI.visible = false;
    toolbarUI.iframe.style["display"] = "none";
  } else {
    toolbarUI.visible = true;
    toolbarUI.iframe.style["display"] = "block";
  }
}

function getSignerFormData(){
  return {
    email: document.getElementById("email").value,
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,

  };
}

function setSignerFormData(data){
  document.getElementById("email").value = data.email;
  document.getElementById("name").value = data.email;
  document.getElementById("address").value = data.email;
}

function getPetitionUrl(){
  return document.getElementById("url").value;
}

function setPetitionData(data){
  document.getElementById("id").value = data.id;
  document.getElementById("key").value = data.key;
  document.getElementById("reasons").value = data.reasons;
}

function getPetitionId(){
  return document.getElementById("id").value;
}

function addPetitionToList(petition){
  var option = document.createElement("option");
  option.text = petition.title;
  option.value = petition.id;
  var select = document.getElementById("list");
  select.appendChild(option);
}

/**
 * Fills UI petitions list with given list by replacing previous content.
 **/
function refreshPetitionsList(petitionsList){

  document.getElementById("list").clear();

  if ( petitionsList.length == 0 ) return;

  for (i == 0; i < petitionsList.length ; i++ ) {
    var petition = petitionsList[i];

    addPetitionToList(petition);
  }

}

/**
 * Fills UI petitions list with given list by replacing previous content.
 **/
function refreshWidget(state, petition, signerData, error){

  switch (state) {
    case "load":
      loadPetition(petition, signerData);
      break;
    case "error":
      loadPetition(petition, signerData)
      console.log(error);
      break;
    case "signed"
      loadSignerData(null);
      break;
    default:    
  }

}

/**
 * Fill UI input data with petition data.
 */
function loadPetition(petition){
  document.getElementById("id").value = petition.id;
  document.getElementById("title").value = petition.title;
  document.getElementById("description").value = petition.description;
  document.getElementById("thumbnail").src = petition.thumbnail;
}

/**
 * Fill UI input with data for a signer. 
 *
 * @param data Use null to clean screen.
 **/
function loadSignerData(data){

  if ( data == null ) data = {"email":null, "name":null, "address":null, "key":null, "reasons":null}
  document.getElementById("email").value = data.email;
  document.getElementById("name").value = data.name;
  document.getElementById("address").value = data.name;
  document.getElementById("key").value = data.key;
  document.getElementById("reasons").value = data.reasons;
}


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
