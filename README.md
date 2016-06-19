https://github.com/aleph1888/JavascriptRemoverWebExtension/wiki/Change.org

**Current developing space**
======================
[Branch changedotorg](https://github.com/aleph1888/JavascriptRemoverWebExtension/tree/changedotorg) from current repository has been moved to [notabug/aleph/ChangeOrgWebExt](https://notabug.org/aleph/ChangeOrgWebExt/src/changedotorg), same branch; this is due [techy considerations about not using github](https://libreboot.org/github/).


See general overview on [[Change.org]].

This is building diary. Summer 2016.

Map
==============
![ChangeOrgWebExt map](https://raw.githubusercontent.com/aleph1888/JavascriptRemoverWebExtension/changedotorg/change.org-inpage-toolbar-ui/changeorgwebext_map.png)
[Source odg](https://github.com/aleph1888/JavascriptRemoverWebExtension/blob/changedotorg/change.org-inpage-toolbar-ui/changeorgwebext_map.odg).

[Help here] Current break holes
=====================

1) Change.org API demands "an authorization key" to sign any petition. This is given on async callback endpoint service. ***So, how can this Firefox Webextension provide a callback?***
See: [petitionGET(objSignatureData)](https://notabug.org/aleph/ChangeOrgWebExt/commit/7aac107a6599e0f7e3b5647783cceb0dbf479598). For now we are [followuping the request](https://github.com/vbuck/change-js-api/blob/master/examples/ChangeOrgApiPetition/getAuthorization.md#sending-a-follow-up-request).

Basic on WebExtensions applied to *ChangeOrgWebExt*
==============================

WebExtensions Port
-----------
A <code>Port</code> object provides a dedicated messaging channel between two specific endpoints.</p>

<p>You can use a <code>Port</code> to communicate:</p>

<ul>
 <li>within your extension (for example, between <a href="/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts">content scripts</a> running in a particular tab and your extension's <a href="/en-US/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Background_scripts">background scripts</a>)</li>
 <li>with other extensions</li>
 <li>with web pages.</li>
</ul>

<p>You create a <code>Port</code> object by calling <a href="/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Runtime/connect" title="Attempts to connect listeners within an extension (such as the background page), or other extensions. This is useful for content scripts connecting to their extension processes and extension communication."><code>runtime.connect()</code></a> or, if you are connecting to content scripts running in a tab, by calling <a href="/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Tabs/connect" title="Connects to the content script(s) in the specified tab. The runtime.onConnect event is fired in each content script running in the specified tab for the current extension. For more details, see content script messaging."><code>tabs.connect()</code></a>.</p>
 You create a Port object by calling [runtime.connect()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Runtime/connect) or, if you are connecting to content scripts running in a tab, by calling [tabs.connect()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Tabs/connect). <p>The other end can listen for the new port using <a href="/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Runtime/onConnect" title="Fired when a connection is made from either an extension process or a content script."><code>runtime.onConnect</code></a> for intra-extension ports, or <a href="/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Runtime/onConnectExternal" title="Fired when a connection is made from another extension."><code>runtime.onConnectExternal</code></a> for extension-to-extension or page-to-extension ports.</p>

*ChangeOrgWebExt* - ChangeJS API
------------------------------
Just as commanded above, cloned [engine/change-js-api](https://notabug.org/aleph/ChangeOrgWebExt/src/changedotorg/change.org-inpage-toolbar-ui/engine/change-js-api). ***TODO: Could use it as ''git submodule''!***

*ChangeOrgWebExt* - Ports
-----------------------------
# Background
 [engine/background.js](https://notabug.org/aleph/ChangeOrgWebExt/src/changedotorg/change.org-inpage-toolbar-ui/engine/background.js)
## Actions provided:
### List petitions.
**Input** {page limits}
### Load petition.
 **Input** *{signer data, petition url}* **Does**: *{API query to change.org server}* **Output** *{Authorization key for given petition, petition sign form data}*.
### Sign petition.
 **Input** *{signer authorization key for given petition, petition id}*

# Network actions:
[Change.org API Reference](https://github.com/change/api_docs/blob/master/v1/documentation/index.md)

### Load petitions list.

```javascript

var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var petition=new ChangeOrgApiPetition(client);

petition.setCallback(function(response) {
	console.log(JSON.stringify(response.getData()));
});

petition.getPetitions({
	petition_ids: '1234567,7654321',
	fields: 'title'
});

// Console Output:
// {"page":1,"prev_page_endpoint":null,"next_page_endpoint":null,"total_pages":1,"petitions":[{"title":"A Petition to Petition"},{"title":"Save the Clock Tower!"}]} 
```

### Load a single petition by url

```javascript
petition.getPetitionId('http://www.change.org/petitions/save-the-clock-tower',function(response) {
	console.log(JSON.stringify(response.getData()));
});

// Console Output:
// {"result":"success","petition_id":1234567} 
```

### Authorize and sign

```javascript
var client=new ChangeOrgApiClient({
	api_key	: 'YOUR_API_KEY',
	secret 	: 'YOUR_SECRET_KEY'
});

var petition=new ChangeOrgApiPetition(client);
var auth=petition.getAuthorization();

auth.setPetitionId(1234567)
	.setRequesterEmail('requester@gmail.com')
	.setSource('http://www.myblog.com/sign-the-petition')
	.setSourceDescription('My Blog')
	.setCallback(function(response) {

		console.log(JSON.stringify(response.getData()));

		if(response.getData('status')=='granted') {
			petition.addSignature({
				petition_id 	: 1234567,
				auth_key 		: response.getData('auth_key'),
				source 			: 'http://www.myblog.com/sign-the-petition',
				email 			: 'requester@gmail.com',
				first_name 		: 'John',
				last_name 		: 'Doe',
				address 		: '123 Any St.',
				city 			: 'Beverly Hills',
				state_province 	: 'CA',
				postal_code 	: '90210',
				country_code 	: 'US',
				phone 			: '5555555555',
				reason 			: 'I support this petition!',
				hidden 			: true
			},function(response) {
				console.log(JSON.stringify(response.getData()));
			});
		}

	});

auth.authorize();

// Console Output:
// {"auth_key":"YOUR_AUTH_KEY","petition_id":1234567,"requester_email":"...","source":"...","source_description":"...","status":"granted","result":"success"}
// {"result":"failure","messages":["user has already signed the petition"]}
```


# Load Bar UI Content
 [engine/contentscript.js](https://notabug.org/aleph/ChangeOrgWebExt/src/changedotorg/change.org-inpage-toolbar-ui/engine/contentscript.js)
- [loadbar/ui.html](https://notabug.org/aleph/ChangeOrgWebExt/src/changedotorg/change.org-inpage-toolbar-ui/loadbar/ui.html)
-[loadbar/ui.css](https://notabug.org/aleph/ChangeOrgWebExt/src/changedotorg/change.org-inpage-toolbar-ui/loadbar/ui.css)
- [loadbar/ui.js](https://notabug.org/aleph/ChangeOrgWebExt/src/changedotorg/change.org-inpage-toolbar-ui/loadbar/ui.js)

# Port transmision sequence

- User shows...

... **ChangeOrgWebExt Load Bar** (A) by clicking on **browser toolbar button** (B). 


- User fills...

... **petition load form** (C) and *submits* (1).


- **Background** (D) receives... 

... *order to load petition* (2). *Swipes to API Change.org server* (2.1) and messages **contentscript** (E) with *petition signin form data* (2.2) and proper *authorization key* (2.2).


- User gets...

... data on **petition sign form** (F). Submits *signin order* (3).


- **Background** receives...

... *order to sign petition* (4). Swipes to API Change.org server and messages **contentscript** to *reset the forms* (5) and notify commit.


UI Layout
===========================

- Header. **Height = 50%**
- Signer data form & petition search bar. **Height = 10%**.
- Petition widget. **Height = 40%**.

Header
-----------------
Petitions list. Dropdown.

Elements:
- List: Petitions (one page).
- Paragraph: Pager buttons.

Events:
- Message: == > 'list-load-pick'


Signer data form & petition search bar
----------------------
Load petition url from Change.org API, while prepares *authorization key* with signer data form.

Elements:
- Form: SignerData {email, firstName...}
- Input Url: PetitionUrl
- Input Submit: Send data.

Events:
- Message: ==> button-load-click

Petition widget
---------------
Sign petition form.

Elements:
- Form (readonly): PetitionsData {title, pic, description, ...}
- Form: SignData {signer, key, reasons,...}
- Input Submit: Sign petition.

Events:
- Message ==> button-sign-click
