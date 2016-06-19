function startWorker() {
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

function stopWorker() {
    w.terminate();
    w = undefined;
}

// Send a message to the current tab's content script.
function toggleToolbar() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "toggle-in-page-toolbar");
  });
}

// Send a message to the current tab's content script.
function onPetitionReceived(petitionData) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "onPetitionReceived", petitionData);
  });
}

// Send a message to the current tab's content script.
function onAuthorizationReceived(petitionData) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "onAuthorizationReceived", petitionData);
  });
}



// Handle the browser action button.
chrome.browserAction.onClicked.addListener(toggleToolbar);

// Hold UI events
function UIQueue(action, data) {
  switch (action) {
    case "button-load-click":
      w.authorizationGET(data, onAuthorizationReceived);
      w.petitionGET(data, onPetitionReceived);
      break;
    case "button-sign-click":
      w.signPetition(data);
      break;
    default:
  }
}

// Handle connections received from the add-on toolbar ui iframes.
chrome.runtime.onConnect.addListener(function (port, action, data) {
  if (port.sender.url == chrome.runtime.getURL("loadbar/ui.html")) {
    // Handle port messages received from the connected toolbar ui frames.
    port.onMessage.addListener(UIQueue(action, data));
    port.onMessage.addListener(toggleToolbar);
  }
});
