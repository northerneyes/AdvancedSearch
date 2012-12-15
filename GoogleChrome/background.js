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
 			
 			var url = request.url;
 			var query = request.query;
 			var filetype = request.filetype;
 			var queryOptions = request.queryOptions;


 			var searchQuery = getSearchQuery(url, query, filetype, queryOptions);

			console.log("CurrentTabId is " + CurrentTabId);
			console.log("url is " + url);
			console.log(searchQuery);
			chrome.tabs.create({url: searchQuery}, function(tab){
				SearchTabId = tab.id;
				//SearchOnGoogle();	//search!
			});
 			break;
		case 1:
			CurrentTabId = request.currentTabId;
			var url = request.url;
			var searchQuery = getRelatedSearchQuery(url);
			chrome.tabs.create({url: searchQuery}, function(tab){
				SearchTabId = tab.id;
			});
 			break;
	}
});

function SearchOnGoogle () {
	 chrome.tabs.executeScript(SearchTabId, {code:"document.getElementById('gbqfba').click()"}); //see how work youtubestopper
}