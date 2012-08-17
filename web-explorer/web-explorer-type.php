<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>
<div class="btn-group-centered spacer web-explorer" id="web-explorer-type">
    <div class="btn-group">
        <button class="btn btn-success btn-tooltip" data-original-title="For automatic exploration blablabla" onclick="webExplorer_go('automatic-step1');">
        	<i class="icon-play icon-white"></i> Automatic
        </button>
        <button class="btn btn-success btn-tooltip" data-original-title="For manual exploration blablabla" onclick="webExplorer_go('manual');">
        	<i class="icon-hand-up icon-white"></i> Manual
        </button>
    </div>	
</div>
        