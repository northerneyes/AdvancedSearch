
var googleSiteSearch = " site:";

function getSearchGoogleQuery(query){
	return getGoogleUrl() + "\\?q=" + query;
}

function getSearchGoogleQueryForSite (query, site) {
	var result = site.split("/");
	var domainSite = result[0] + "//" + result[2];
	return getSearchGoogleQuery(query) + googleSiteSearch + domainSite;
}

function getGoogleUrl () {
	return "http://www.google.com";
}