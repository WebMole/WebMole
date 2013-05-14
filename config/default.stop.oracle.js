// Default Stop Oracle
// Return true to Stop
// Note: you must keep "stopOracleFunction" as the function Name

stopOracleFunction = function(doc)
{
	var e = doc.getElementsByTagName("h1")[0];

	if (e.innerText.indexOf("Stop on this page") == -1)
		return false;
	else
		return true;
}