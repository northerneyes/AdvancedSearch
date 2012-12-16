var googleSiteSearchKeyword = " site:";
var googleFiletypeKeyword = " filetype:";
var googleUrl = "http://www.google.com";
var googleRelatedSite = "related:";

function getSearchGoogleQuery(query){
	return googleUrl + "\\search?q=" + query;
}

function getRelatedSearchQuery(url)
{
	var domainSite = getDomainName(url);
	var resultQuery = googleRelatedSite + domainSite;
	return getSearchGoogleQuery(resultQuery);
}

function getSearchQuery(url, query, filetype, queryOptions)
{
	var siteOperator =  getSiteOperator(queryOptions.onSiteSearch, url);
	query = getExactlyOperator(queryOptions.exactlyPhrase, query);
	var fileOperator = getFileOperator(queryOptions.fileSearch, filetype);

	var resultQuery = query + siteOperator + fileOperator;
	
	return getSearchGoogleQuery(resultQuery);
}

function getDomainName (url) {
	var result = url.split("/");
	var domainSite = result[0] + "//" + result[2];
	return domainSite;
}
function getSiteOperator(needSiteSearch, url)
{
	if(needSiteSearch)
	{
		var domainSite = getDomainName(url);
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