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
            <h2>Infos</h2>
            <table class="table table-bordered table-striped">
                <colgroup>
                    <col class="span2"></col>
                    <col class="span2"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <code>Normal nodes</code>
                        </td>
                        <td>
                        	<input type="text" class="span1 uneditable-input" id="web-explorer-node-n-number" value="0" /> 
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>Javascript nodes</code>
                        </td>
                        <td>
                        	<input type="text" class="span1 uneditable-input" id="web-explorer-node-j-number" value="0" /> 
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>Ajax nodes</code>
                        </td>
                        <td>
                        	<input type="text" class="span1 uneditable-input" id="web-explorer-node-a-number" value="0" /> 
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>Extarnal links</code>
                        </td>
                        <td>
                        	<input type="text" class="span1 uneditable-input" id="web-explorer-el-number" value="0" /> 
                        </td>
                    </tr>                   
                </tbody>
            </table>
            <h2>Captions</h2>
            <div class="alert alert-success" style="margin-bottom:2px;">
            	<a href="#" style="text-decoration:none;">
                	<i class="icon-certificate"></i> <strong>Normal node</strong> 
                </a>               
            </div>
            <div class="alert alert-success" style="margin-bottom:2px;">
            	<a href="#" style="text-decoration:none;">
                	<i class="icon-repeat"></i> <strong>Javascript node</strong> 
                </a>               
            </div>
            <div class="alert alert-success" style="margin-bottom:2px;">
            	<a href="#" style="text-decoration:none;">
                	<i class="icon-cog"></i> <strong>Ajax node</strong> 
                </a>               
            </div>
            <div class="alert alert-info" style="margin-bottom:2px;">
            	<a href="#" style="text-decoration:none;">
                	<i class="icon-arrow-right icon-white"></i> <strong>External link</strong> 
                </a>               
            </div>
            <div class="alert alert-error" style="margin-bottom:2px;">
                <a href="#" style="text-decoration:none;">
                    <i class="icon-certificate"></i> <strong>Stop node</strong> 
                </a>               
            </div>
            <div class="alert alert-warning" style="margin-bottom:2px;">
                <a href="#" style="text-decoration:none;">
                    <i class="icon-certificate"></i> <strong>Flagged test node</strong> 
                </a>               
            </div>
            <div class="alert alert-teststop" style="margin-bottom:2px;">
                <a href="#" style="text-decoration:none;">
                    <i class="icon-certificate"></i> <strong>Flagged test and Stop node</strong> 
                </a>               
            </div>
        </div>
    </div>    
</div><!-- /#web-explorer -->
