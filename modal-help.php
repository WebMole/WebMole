<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>

<div class="modal hide fade" id="help_modal">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">×</button>
		<h3>Don't panic, everything's ok!</h3>
	</div>
	<div class="modal-body">

		<p>Basically, this is an utility for managing some <span class="label label-info">urlset generated maps</span> in a smooth and easy way. Maps are usually in <span class="label label-info">xml</span> format.
		<p>For further details, you can read the <a href="ReadMe.md">readme</a>.</p>
		<p>Here is an example of a valid xml file:</p>

		<pre class="prettyprint"><code class="language-xml"><?php echo htmlspecialchars(file_get_contents("example.xml"), ENT_QUOTES); ?></code></pre>

		<p>Just insert this sample code and see the result, simple as that ;)</p>
	</div>
	<div class="modal-footer">
		<a class="btn btn-primary" data-dismiss="modal" href="#">Alright!</a>
	</div>
</div>
