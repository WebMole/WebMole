<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
    die('You are not allowed to view this file');
?>

<div id="oracle-stop">
	  <p>The javascript inserted in the following input will be executed on each nodes to create a navigation filter if activated.</p>
    
    <div id="stop-oracle-editor" class="editor"><?php echo htmlspecialchars(file_get_contents("config/default.stop.oracle.js"), ENT_QUOTES); ?></div>
    <br />

    <label class="checkbox">
      <input type="checkbox" checked="<?php echo $CONFIG["Stop-Oracle"]["default_enabled"]; ?>"> Enable Stop Oracle
    </label>
</div><!-- /#oracle-stop -->
