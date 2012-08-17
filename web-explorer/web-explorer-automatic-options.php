<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>
<div class="control-group spacer web-explorer" id="web-explorer-automatic-options">
    <div class="controls">
        <div class="btn-group">
        	<button class="btn btn-info" onclick="webExplorer_automaticOption('specify');">
            	<i class="icon-pencil icon-white"></i> Specify the elements to go
            </button>
            <button class="btn btn-info"  onclick="webExplorer_automaticOption('computed');">
            	<i class="icon-pencil icon-white"></i> Set computed style
            </button>
            <button class="btn btn-inverse"  onclick="webExplorer_go('automatic-step1');">
            	<i class="icon-share-alt icon-white"></i> Back
            </button>                    
        </div>            	
    </div>
</div> 
        