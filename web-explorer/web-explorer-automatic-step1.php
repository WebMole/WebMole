<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>
<div class="control-group spacer web-explorer" id="web-explorer-automatic-step1">
	<div class="input-append">
    	<input type="text" class="span6" id="web-explorer-url" value="<?php echo $CONFIG["Explorer"]["default_adress"]; ?>" /><button type="button" class="btn btn-success" id="web-explorer-btn-automatic-start" onclick="webExplorer_start();"><i class="icon-play icon-white"></i> Start exploration</button><button type="button" class="btn btn-info" id="web-explorer-btn-automatic-options" onclick="webExplorer_go('automatic-options');"><i class="icon-list-alt icon-white"></i> Options</button><button class="btn btn-inverse"  onclick="webExplorer_go('type');"><i class="icon-share-alt icon-white"></i> Back</button>       
	</div>
</div> 
        