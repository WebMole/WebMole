<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>
<div class="btn-group spacer web-explorer" id="web-explorer-automatic-step2">
	<button type="button" class="btn btn-info" id="web-explorer-btn-automatic-view-map" onclick="">
    	<i class="icon-globe icon-white"></i> View map
    </button>
    <button type="button" class="btn btn-info" id="web-explorer-btn-automatic-extract-map" onclick="webExplorer_nodeToJson();">
    	<i class="icon-download-alt icon-white"></i> Extract map
    </button>
    <button type="button" class="btn btn-danger" id="web-explorer-btn-automatic-stop" onclick="">
    	<i class="icon-stop icon-white"></i> Stop
    </button>
    <button class="btn btn-inverse"  onclick="webExplorer_go('automatic-step1');">
    	<i class="icon-share-alt icon-white"></i> Back
    </button>        
</div> 
        