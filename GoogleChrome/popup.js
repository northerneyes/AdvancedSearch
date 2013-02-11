$(function(){

	//Restore options
	function restore_options()
    {
    	console.log("Options restored");
    	
    	ApplyPlaceholder();
    	$('#search_on_site').find('span').html(chrome.i18n.getMessage("popup_search_on_site"));
    	$('#exatly_phrase').find('span').html(chrome.i18n.getMessage("popup_exactly_phrase"));
    	$('#file-search').find('span').html(chrome.i18n.getMessage("popup_search_files"));
    	$('#btn-related-search').html(chrome.i18n.getMessage("popup_related_site"));

    	ApplySettings();
    }

    restore_options();

	$('#query').focus();  
	
	$('#query').keyup(function(e)
	{
		if (e.keyCode == 13) {
			search();
		};
	});

	$('#txt_filetype').keyup(function(e)
	{
		if (e.keyCode == 13) {
			search();
		};
	});

	function search()
	{
			query = $('#query').val();
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
	}

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
    	$('#txt_filetype').toggle('fast',function(){
    		$('#txt_filetype').focus();
    	});
    });

    $('#toogle-search-on_site').click(function () {
    	ApplyPlaceholder();
    	
    });

    function ApplySettings()
    {
    	var search_on_site_default = localStorage["search_on_site_default"] == undefined ? true : localStorage["search_on_site_default"];
        var show_exactly_phrase = localStorage['show_exactly_phrase'] == undefined ? true : localStorage["show_exactly_phrase"];
        var show_filesearch =     localStorage['show_filesearch'] == undefined ? true : localStorage["show_filesearch"];
        var show_relatedsearch =  localStorage['show_relatedsearch'] == undefined ? true : localStorage["show_relatedsearch"];

        console.log(toBool(search_on_site_default));
        if(toBool(search_on_site_default)) 
        	$('#toogle-search-on_site').prop('checked', toBool(search_on_site_default));

        if(!toBool(show_exactly_phrase))
        	$('#exatly_phrase').hide();
        if(!toBool(show_filesearch))
        	$('#file-search').hide();
        if(!toBool(show_relatedsearch))
        {
        	$('.splitter').hide();
        	$('#related-search').hide();
        }

    }

    function ApplyPlaceholder(){
    	if($('#toogle-search-on_site').is(':checked'))
    	{
    		$('#query').attr("placeholder", chrome.i18n.getMessage("query_placeholder_site"));
    	}
    	else
    	{
    		$('#query').attr("placeholder", chrome.i18n.getMessage("query_placeholder"));
    	}
    }

});
