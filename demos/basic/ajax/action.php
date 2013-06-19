<?php
	$action = $_POST["action"];
	if($action == "ajax1")
	{
		echo "<h3>Ajax Answer</h3>";
		echo "<ul>";
		echo "<li><a href='p3.html'>Page 3</a></li>";
		echo "</ul>";
	}

	else if($action == "ajax2")
	{
		echo "<h3>Ajax Answer</h3>";
		echo "<ul>";
		echo "<li><a href='p5.html'>Page 5</a></li>";
		echo "<li><a href='p6.html'>Page 6</a></li>";
		echo "</ul>";
	}
?>