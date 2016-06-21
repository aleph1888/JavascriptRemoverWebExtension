
module.exports = bg;

function bg() {

  this.initValue = 1;

  this.startWorker = function() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("port.js");
        }

        w.addEventListener("message", function (oEvent) {
          console.log("Called back by the worker!\n");
        }, false);

        w.postMessage(""); // start the worker.

        w.onmessage = function(event) {
            document.getElementById("result").innerHTML = event.data;
        };
    } else {
        document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
    }
  }

  this.stopWorker = function () {
    w.terminate();
    w = undefined;
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
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "onPetitionsReceived", petitionsList);
    });
  }

  // Hold UI events
  this.UIQueue = function(action, data) {
    switch (action) {
      case "init":
        w.petitionsGET(data, onPetitionsReceived);
      case "list-load-pick":
        w.authorizationGET(data, onAuthorizationReceived);    
        break;
      case "button-load-click":
        w.petitionGET(data, onPetitionReceived);
        w.authorizationGET(data, onAuthorizationReceived);      
        break;
      case "button-sign-click":
        w.signPetition(data);
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
