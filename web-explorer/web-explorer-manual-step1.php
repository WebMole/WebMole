<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>
<div class="control-group spacer web-explorer" id="web-explorer-manual-step1">
	<div class="input-append">
    	<input type="text" class="span6" id="web-explorer-manual-url" value="http://localhost:8888/GitHub/Urlset-Manager-Project/demo<?php //echo $CONFIG["Explorer"]["default_adress"]; ?>" /><button type="button" class="btn btn-success" id="web-explorer-btn-manual-start" onclick="webExplorer_start('manual');"><i class="icon-play icon-white"></i> Start exploration</button><button class="btn btn-inverse"  onclick="webExplorer_go('type');"><i class="icon-share-alt icon-white"></i> Back</button>       
	</div>
</div> 
        