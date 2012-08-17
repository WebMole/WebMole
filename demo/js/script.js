//Charge la page désirée dans l'iframe et injecte le script de prototypage xmlhttprequest
function ajax1(){
	/*if($("#ajaxResponse").html()==""){
		$("#ajaxResponse").html("<li><a href='p16.html'>p16</a></li><li><a href='p18.html'>p18</a></li>");
	}
	else{
		$("#ajaxResponse").html("");
	}*/
	if($("#ajaxResponse").html()==""){
		$.post("./ajax/action.php",{
			action:"ajax1"
		},function(data){
			$("#ajaxResponse").html(data);
		});
	}
	else{
		$("#ajaxResponse").html("<li><a href='p16.html'>p16</a></li><li><a href='p18.html'>p18</a></li>");
	}
}