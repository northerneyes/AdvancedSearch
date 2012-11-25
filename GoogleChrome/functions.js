
var googleSiteSearch = " site:";

function getSearchGoogleQuery(query){
	return getGoogleUrl() + "\\?q=" + query;
}

function getSearchGoogleQueryForSite (query, site) {
	return getSearchGoogleQuery(query) + googleSiteSearch + site;
}

function getGoogleUrl () {
	return "http:\\www.google.com";
}