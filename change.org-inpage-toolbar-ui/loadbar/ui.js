// Connect to the background page.
var port = chrome.runtime.connect();

// Handle click events on the toolbar button.
document.querySelector("#toggle").addEventListener("click", function() {
  // Ask the background page to toggle the toolbar on the current tab
  port.postMessage("toggle-in-page-toolbar");
});

// Handle click events on the toolbar button.
document.querySelector("#buttonLoad").addEventListener("click", function() {
  // Ask the background page to toggle the toolbar on the current tab
  	var payload = {
          signerData: getSignerFormData(), 
          petitionUrl: getPetitionUrl() 
      };
	port.postMessage("button-load-click", payload);
});

// Handle click events on the toolbar button.
document.querySelector("#buttonSign").addEventListener("click", function() {
  // Ask the background page to toggle the toolbar on the current tab
    var payload = {
          signerData: getSignerFormData(), 
          petitionId: getPetitionId() 
    };
	port.postMessage("button-sign-click", payload);
});
