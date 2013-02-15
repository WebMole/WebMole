<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>

<div class="row" id="Documentation">
	<div class="span12">        
        <h2>Map Viewer</h2>        
        <p>Here is an example of a valid json file:</p>

        <div id="json-example" class="editor readonly json"><?php echo htmlspecialchars(file_get_contents("data-map-example.json"), ENT_QUOTES); ?></div>

        <p>Just insert this sample code and see the result, simple as that ;)</p>
    </div> 
    
</div><!-- /#Documentation -->
