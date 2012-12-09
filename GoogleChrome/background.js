var SearchTabId = undefined;
var CurrentTabId = undefined;

chrome.tabs.onRemoved.addListener(function(id, removeInfo) {
	if(id === SearchTabId)
	{
		backToCurrentTab();
	}
});

function backToCurrentTab()
{
	console.log("CurrentTabId tab:" + CurrentTabId);
	chrome.tabs.update(CurrentTabId, {selected: true});
	SearchTabId = undefined;
	CurrentTabId = undefined;
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.messageId)
	{
		case 0:
 			CurrentTabId = request.currentTabId;
			console.log("CurrentTabId is " + CurrentTabId);
 			break;
		case 1:
			SearchTabId = request.currentTabId;
			console.log("SearchTabId is " + SearchTabId);
		    SearchOnGoogle();   //site is not exist!
  			console.log("Run script SearchOnGoogle!");
 			break;
	}
});

function SearchOnGoogle () {
	 chrome.tabs.executeScript(SearchTabId, {code:"document.getElementById('gbqfba').click()"}); //see how work youtubestopper
}