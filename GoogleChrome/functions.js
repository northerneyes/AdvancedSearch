
var googleSiteSearchKeyword = " site:";
var googleFiletypeKeyword = " filetype:";
var googleUrl = "http://www.google.com";

function getSearchGoogleQuery(query){
	return googleUrl + "\\?q=" + query;
}

function getSearchQuery(url, query, filetype, queryOptions)
{
	var siteOperator =  getSiteOperator(queryOptions.onSiteSearch, url);
	query = getExactlyOperator(queryOptions.exactlyPhrase, query);
	var fileOperator = getFileOperator(queryOptions.fileSearch, filetype);

	var resultQuery = query + siteOperator + fileOperator;
	
	return getSearchGoogleQuery(resultQuery);
}

function getSiteOperator(needSiteSearch, url)
{
	if(needSiteSearch)
	{
		var result = url.split("/");
		var domainSite = result[0] + "//" + result[2];
		return googleSiteSearchKeyword + domainSite;
	}
	return "";
}

function getFileOperator(needFileSearch, filetype)
{
	if(needFileSearch)
	{
		return googleFiletypeKeyword + filetype;
	}
	return "";
}

function getExactlyOperator(needExactlyPhraseSearch, query)
{
	if(needExactlyPhraseSearch)
	{
		return '"' + query + '"';
	}
	return query;
}