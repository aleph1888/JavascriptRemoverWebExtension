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
function loadPetition() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "load-petition-click");
  });
}
// Send a message to the current tab's content script.
function signPetition() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "sign-petition-click");
  });
}

// Handle the browser action button.
chrome.browserAction.onClicked.addListener(loadPetition);
chrome.browserAction.onClicked.addListener(signPetition);

// Handle connections received from the add-on toolbar ui iframes.
chrome.runtime.onConnect.addListener(function (port) {
  if (port.sender.url == chrome.runtime.getURL("loadbar/ui.html")) {
    // Handle port messages received from the connected toolbar ui frames.
    port.onMessage.addListener(loadPetition);
    port.onMessage.addListener(signPetition);
  }
});
