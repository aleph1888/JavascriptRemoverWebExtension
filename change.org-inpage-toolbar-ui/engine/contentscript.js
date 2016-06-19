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
    email: document.getElementById("inputEmail").value;
  };
}
function setSignerFormData(data){
  document.getElementById("inputEmail").value = data.email;
}

function getPetitionUrl(){
  return document.getElementById("inputUrl").value;
}
function setPetitionData(data){
  document.getElementById("hidPetitionId").value = data.hidPetitionId;
  document.getElementById("hidAuthorizationKey").value = data.hidAuthorizationKey;
}


function getPetitionId(){
  return document.getElementById("hidPetitionId").value;
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
