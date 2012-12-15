$(function(){
	$('#query').focus();  
	$('#query').keyup(function(e)
	{
		if (e.keyCode == 13) {
			query = $(this).val();
			console.log("You enter: " + query);

			var onSiteSearch = $('#toogle-search-on_site').is(':checked');
			var fileSearch = $('#toggle_file_search').is(':checked');
			var exactlyPhrase = $('#toggle_search_exatly_phrase').is(':checked');
			var filetype = $('#txt_filetype').val();

			chrome.tabs.getSelected(null, function(tab){
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
			})
			
		};
	});

	$('#btn-related-search').click(function(){
		chrome.tabs.getSelected(null, function(tab){
			  	chrome.extension.sendMessage(
			  	{
			  		messageId: 1, 
			  		currentTabId: tab.id,
			  		url: tab.url,
			  	}); 
			})
	});

	$('#toggle_file_search').click(function () {
    	$('#txt_filetype').toggle('fast');
    });

});
