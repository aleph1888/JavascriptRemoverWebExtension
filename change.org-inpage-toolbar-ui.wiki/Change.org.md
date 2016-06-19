**Current developing space**
======================
[Branch changedotorg](https://github.com/aleph1888/JavascriptRemoverWebExtension/tree/changedotorg) from current repository has been moved to [notabug/aleph/ChangeOrgWebExt](https://notabug.org/aleph/ChangeOrgWebExt/src/changedotorg), same branch; this is due [techy considerations about not using github](https://libreboot.org/github/).

Developing road map:
===========================
1) Take a look to [Change.org repository on Github](https://github.com/change)
-----------------------
Say hello on [Change.org developers's forum](https://groups.google.com/forum/#!forum/change-org-api).  

2) Get an API key on [developer's site](https://www.change.org/developers/api-key) to make HTTP request to their PHP server.
-----------------
 - KEY 7d28c145e1263dd16dd5da75b0c2136ae0621709300c3d2c57e501a99ffe171e
 - SECRET (fake) 0fb0c4561f65d53c2013c72cd2938a8fd23f7529dfd51d85472a1958db47a7e6

 2.1) Visit old PHP [API DOCS](https://github.com/change/api_docs/blob/master/v1/documentation/index.md) for examples and tutorials.
 
 2.2) Visit the (unoficial?) Javascript [API Repository](https://github.com/vbuck/change-js-api) 

3) Get an opened petitions list by offering *sign* button.
----------------------------------
 3.1) [API petitions](https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions.md)  

 3.2) Use causes:
```java
    var $causes = array(
    'an' => 'Animals',
    'cj' => 'Criminal Justice',
    'ed' => 'Education',
    'en' => 'Environment',
    'gr' => 'Gay Rights',
    'hc' => 'Health',
    'hr' => 'Human Rights',
    'ht' =>'Human Trafficking',
    'im' => 'Immigrant Rights',
    'us' => 'Poverty in America',
    'sf' => 'Sustainable Food',
    'wr' => "Women's Rights",
    );
```
4) Show signing form for a single petition (first go to point 5 to signin user).  
---------------------------
 4.1) Use insert script to display a known petition id:

```html
 <!-- Insert script: -->
     <script src="https://d18kwxxua7ik1y.cloudfront.net/product/embeds/v1/change-embeds.js" type="text/javascript">
     <div class="change-embed-petition" data-petition-id="3960028"></div>
```

```javascript
 // Embed script:
 
    var ChangeEmbeds = function() {
    return {
    insertIframesInDivs: function() {
      var divs = document.getElementsByClassName('change-embed-petition'),
        i,
        len;
      for (i = 0, len = divs.length; i < len; i++) {
        ChangeEmbeds.insertIframeIntoDiv(divs[i]);
        ChangeEmbeds.setEmbedSize(divs[i], 300, 400, 600, 520, 700, 700);
      }
    },

    insertIframeIntoDiv: function(div) {
      //Make sure the div hasn't already received its iframe
      if (div.getAttribute('data-iframe-loaded') === 'true') {return;}
      var petitionId = div.getAttribute('data-petition-id');
      if (!petitionId) {return;}
      div.innerHTML = "<iframe class='iframe-class' width: '300px' height: '520px' src='https://www.change.org/embed/p/" +
        petitionId + "/preview' frameborder='0'></iframe>";
      div.setAttribute('data-iframe-loaded', 'true');
    },

    setEmbedSize: function(div, minWidth, midWidth, maxWidth, minHeight, midHeight, maxHeight) {
      var iframe = div.getElementsByClassName('iframe-class')[0];
      if (!iframe) return;
      var divWidth = div.offsetWidth,
        newHeight;
      if (divWidth <= midWidth) {
        newHeight = minHeight;
        newWidth = minWidth;
      } else if (divWidth < maxWidth) {
        newHeight = midHeight;
        newWidth = midWidth;
      } else {
        newHeight = maxHeight;
        newWidth = maxWidth;
      }
      div.style.height = newHeight.toString().concat('px');
      iframe.style.height = newHeight.toString().concat('px');
      iframe.style.width = newWidth.toString().concat('px');
    }
  }
}(); document.addEventListener("DOMContentLoaded", ChangeEmbeds.insertIframesInDivs);
```
 Embed page sample:
 https://www.change.org/embed/p/3960028/preview
       

5) Offer user CRUD.
------------------------------
 5.1) [API users](https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md)  
 5.2) Get [**Authorization key** for user](https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/auth_keys.md#authorization-keys-on-petitions) in order to be able to sign petitions.


6.) Offer Organizations capabilities.
-----------------------------------------
 6.1) [API organizations](https://github.com/change/api_docs/blob/master/v1/documentation/resources/organizations.md)

7.) Test it on Firefox 45
---------------------
 or higher by picking proper manifest.json in your browser on url: 'about:debugging#addons'. 

[[ChangeOrgWebExt OnBoardPage]]