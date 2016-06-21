// Connect to the background page.
var port = chrome.runtime.connect();

// Handle click events on the toolbar button.
document.querySelector("#toggle").addEventListener("click", function() {
  // Ask the background page to toggle the toolbar on the current tab
  port.postMessage("toggle-in-page-toolbar");
});

document.querySelector("#petitions_list").addEventListener("onchange", function() {
	var payload = {
		signerData: getSignerFormData(), 
		petitionId: getPetitionId()
	};

	port.postMessage("button-sign-click", payload); 
}

document.querySelector("#button_load").addEventListener("click", function() {
	var payload = {
		signerData: getSignerFormData(), 
		petitionUrl: getPetitionUrl()
	};

	port.postMessage("button-load-click", payload); 
}

document.querySelector("#button_sign").addEventListener("click", function() {
	var payload = {
		signerData: getSignerFormData(), 
		getPetitionData: getPetitionData()
	};

	port.postMessage("button-sign-click", payload); 
}