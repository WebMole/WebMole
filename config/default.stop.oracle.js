// Default Stop Oracle
// Return true to Stop
// Note: you must keep "stopOracleFunction" as the function Name

stopOracleFunction = function(doc)
{
	var e = doc.getElementsByTagName("h1")[0];

	if (e.innerText.indexOf("Welcome,") == -1)
	{
		stopOracleFunction.loggedin = false;
		if (doc.getElementById("cart") === undefined)
		{
			// return true;
		}
	}
	else
	{
		stopOracleFunction.loggedin = true;
	}

	return stopOracleFunction.loggedin;
}