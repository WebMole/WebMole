// Simple Ajax Request
function ajaxCall(actionNumber)
{
	// 1st time ajax call
	if($("#ajaxResponse").html() == "")
	{
		$.post("./ajax/action.php", {
			action: "ajax" + actionNumber
		},function(data) {
			$("#ajaxResponse").html(data);
		});
	}
	// Other times
	else
	{
		$("#ajaxResponse").html("<p>You have clicked the button more than once!</p>");
	}
}