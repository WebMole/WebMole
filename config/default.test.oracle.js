// Default Test Oracle
// Return false to add test flag
// Note: you must keep "testOracleFunction" as the function Name

testOracleFunction = function(doc)
{
	/* Previous test: we are able to compare with previous page's data */

	// var e = doc.getElementsByTagName("h1")[0];
	// if(e === undefined) return false;

	// if(testOracleFunction.lastx !== undefined)
	// {
	//     if (e.style.width != testOracleFunction.lastx)
	//         return false;
	// }
	// testOracleFunction.lastx = e.style.width;
	// return true;

	
	/* Let's just flag when we see an id="flag" */
	if (doc.getElementById("flag"))
	{
		return false;
	}
	else
	{
		return true;
	}
}