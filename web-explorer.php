<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>

<div class="row" id="web-explorer">
	<div class="span12 web-explorer-controls">        
        <?php include ("web-explorer/web-explorer-type.php");?>        
        <?php include ("web-explorer/web-explorer-automatic-step1.php");?>        
        <?php include ("web-explorer/web-explorer-automatic-step2.php");?>         
        <?php include ("web-explorer/web-explorer-manual-step1.php");?>           
        <?php include ("web-explorer/web-explorer-manual-step2.php");?>               
        <?php include ("web-explorer/web-explorer-automatic-options.php");?>        
        <?php include ("web-explorer/web-explorer-automatic-option-specify.php");?>        
        <?php include ("web-explorer/web-explorer-automatic-option-computed.php");?>         
    </div>   
    <div id="web-explorer-viewer" class="web-explorer">
        <div class="span5">
            <h2>Console</h2>        
            <div id="web-explorer-console"></div>        
        </div>
        <div class="span7">
            <h2>Viewer</h2>
            <div id="sh_explorer_frame_container">
            	<iframe id="sh_explorer_frame"></iframe>
            </div>
        </div>
    </div>    
</div><!-- /#web-explorer -->
