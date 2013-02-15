<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>

<div id="oracle-test">
	<p>The javascript inserted in the following input will be executed on each node to create a navigation filter if activated.</p>
    
    <div id="test-oracle-editor" class="editor"><?php echo htmlspecialchars(file_get_contents("config/default.test.oracle.js"), ENT_QUOTES); ?></div>
    <br />

    <label class="checkbox">
      <input type="checkbox" checked="<?php echo $CONFIG["Test-Oracle"]["default_enabled"]; ?>"> Enable Test Oracle
    </label>
</div><!-- /#oracle-test -->
