// Default Test Oracle
// Return false to add test flag
// Note: you must keep "testOracleFunction" as the function Name

testOracleFunction = function(doc)
{
	/* Let's just flag when we see an id="flag" */
	if (doc.getElementById("flag"))
		return false;
	else
		return true;
}