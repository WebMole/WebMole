// Default Test Oracle
// Return true to add test flag
// Note: you must keep "testOracleFunction" as the function Name

testOracleFunction = function(doc)
{
	var e = doc.getElementsByTagName("h1")[0];
	if(e === undefined) return true;
    
	if(testOracleFunction.lastx !== undefined)
	{
        if (e.style.width != testOracleFunction.lastx)
            return true;
	}
	testOracleFunction.lastx = e.style.width;
	return false;
}