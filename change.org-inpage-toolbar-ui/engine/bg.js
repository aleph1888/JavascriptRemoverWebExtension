
module.exports = bg;

function bg() {

  this.initValue = 1;

  this.startWorker = function() {
    this.w = new pt();
  }

  this.stopWorker = function () {
    //this.w.terminate();
    this.w = undefined;
  }

  this.toggleToolbar = function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "toggle-in-page-toolbar");
    });
  }

  // Send a message to the current tab's content script.
  this.onPetitionReceived = function(petitionData) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "onPetitionReceived", petitionData);
    });
  }

  // Send a message to the current tab's content script.
  this.onAuthorizationReceived = function(petitionData) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "onAuthorizationReceived", petitionData);
    });
  }

  // Send a message to the current tab's content script.
  this.onPetitionsReceived  = function(petitionsList) {
    console.log("onPetitionsReceived", petitionsList);
    
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "onPetitionsReceived", petitionsList);
    });
    
  }

  // Hold UI events
  this.UIQueue = function(action, data, callback1, callback2) {
    switch (action) {
      case "init":
        console.log("init");
        this.w.petitionsGET(1, 10, callback1);
        break;
      case "list-load-pick":
        console.log("list-load-pick");
        callback1(data.petition);
        this.w.authorizationGET(data.petition, data.signer, callback2);    
        break;
      case "button-load-click":
        console.log("button-load-pick");
        this.w.petitionGET(data, onPetitionReceived);
        this.w.authorizationGET(data, this.onAuthorizationReceived);      
        break;
      case "button-sign-click":
        console.log("button-sign-click");
        this.w.signPetition(data);
        break;
      default:
    }
  }

  this.init = function() { 
    // Handle connections received from the add-on toolbar ui iframes.
    chrome.runtime.onConnect.addListener(function (port, action, data) {
      if (port.sender.url == chrome.runtime.getURL("loadbar/ui.html")) {
        // Handle port messages received from the connected toolbar ui frames.
        port.onMessage.addListener(UIQueue(action, data));
        port.onMessage.addListener(toggleToolbar);
      }
    });

    chrome.browserAction.onClicked.addListener(toggleToolbar);

  }
}
