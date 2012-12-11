var SearchTabId = undefined;
var CurrentTabId = undefined;


chrome.tabs.onRemoved.addListener(function(SearchTabId, removeInfo) {
	console.log("CurrentTabId tab:" + CurrentTabId);
	chrome.tabs.update(CurrentTabId, {selected: true});
});

$(function(){

	$('#query').keyup(function(e)
	{
		if (e.keyCode == 13) {
			query = $(this).val();
			console.log("You enter: " + query);
			
			var onSiteSearch = true;
			var fileSearch = true;
			var exactlyPhrase = true;
			var filetype = "pdf";

			chrome.tabs.getSelected(null, function(tab){
			  	CurrentTabId = tab.id;
			  	chrome.extension.sendMessage(
			  	{
			  		messageId: 0, 
			  		currentTabId: tab.id,
			  		url: tab.url,
			  		query: query,
			  		filetype: filetype,
			  		queryOptions: {
			  			onSiteSearch: onSiteSearch,
			  			fileSearch: fileSearch,
			  			exactlyPhrase: exactlyPhrase}
			  	}); //send request to background.js
			    //searchOnSite(tab.url, query);
			})
			
		};
	});

});

// function searchOnSite(url, query)
// {
// 	chrome.tabs.create({url: getSearchGoogleQueryForSite(query,url)}, function(tab){
// 		chrome.extension.sendMessage({messageId: 1, currentTabId: tab.id}); //send request to background.js
// 		//chrome.tabs.executeScript(tab.id, {file:"search.js"});
// 		//SearchTabId = tab.id;
// 	});
// }

// var req = new XMLHttpRequest();
// req.open(
// 	"GET",
// 	"http://api.flickr.com/services/rest/?" +
//         "method=flickr.photos.search&" +
//         "api_key=90485e931f687a9b9c2a66bf58a3861a&" +
//         "text=hello%20world&" +
//         "safe_search=1&" +  // 1 is "safe"
//         "content_type=1&" +  // 1 is "photos only"
//         "sort=relevance&" +  // another good one is "interestingness-desc"
//         "per_page=20",
//     true);
// req.onload = showPhotos;
// req.send(null);

// function showPhotos() {
// 	var photos = req.responseXML.getElementsByTagName("photo");

// 	for (var i = 0, photo; photo = photos[i]; i++) {
// 	    var img = document.createElement("image");
// 	    img.src = constructImageURL(photo);
// 	    document.body.appendChild(img);
// 	  }
// }

// function constructImageURL(photo) {
//   return "http://farm" + photo.getAttribute("farm") +
//       ".static.flickr.com/" + photo.getAttribute("server") +
//       "/" + photo.getAttribute("id") +
//       "_" + photo.getAttribute("secret") +
//       "_s.jpg";
// }