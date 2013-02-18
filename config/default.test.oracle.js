// Default Test Oracle
// Return false to add test flag
// Note: you must keep "testOracleFunction" as the function Name

testOracleFunction = function(doc)
{
	// var e = doc.getElementsByTagName("h1")[0];
	// if(e === undefined) return false;

	// if(testOracleFunction.lastx !== undefined)
	// {
	//     if (e.style.width != testOracleFunction.lastx)
	//         return false;
	// }
	// testOracleFunction.lastx = e.style.width;
	// return true;


	if(doc.getElementById("flag") != undefined) return false;
	else return true;
}