// Default Stop Oracle
// Return true to Stop
// Note: you must keep "stopOracleFunction" as the function Name

stopOracleFunction = function(doc)
{
	var e = doc.getElementsByTagName("h1")[0];

	if (e.innerText.indexOf("Stop on this page") == -1)
	{
		stopOracleFunction.answer = false;
		if (doc.getElementById("cart") === undefined)
		{
			// we could stop here if the cart couldn't be found for exemple.
			// return true;
		}
	}
	else
	{
		stopOracleFunction.answer = true;
	}

	return stopOracleFunction.answer;
}