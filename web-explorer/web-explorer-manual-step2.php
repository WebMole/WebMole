<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>
<div class="web-explorer" id="web-explorer-manual-step2">
	<div class="btn-group spacer control-group">
        <button type="button" class="btn btn-info" id="web-explorer-btn-manual-view-map" onclick="">
            <i class="icon-globe icon-white"></i> View map
        </button>
        <button type="button" class="btn btn-info" id="web-explorer-btn-manual-extract-map" onclick="webExplorer_nodeToJson();">
            <i class="icon-download-alt icon-white"></i> Extract map
        </button>
        <button class="btn btn-inverse"  onclick="webExplorer_go('manual-step1');">
            <i class="icon-share-alt icon-white"></i> Back
        </button> 
	</div> 
    <div class="controls spacer">
    	<table class="table table-condensed">
        	<tr>
            	<th>&nbsp;</th>
                <th>&nbsp;</th>
                <th style="text-align:center;">
                	Elements visited
                </th>
                <th>&nbsp;</th>
                <th style="text-align:center;">
                	External links
                </th>
                <th>&nbsp;</th>
                <th style="text-align:center;">
                	External links visited
                </th>
            </tr>
            <tr>
            	<td>
                	background
                </td>
            	<td>
                	<input type="checkbox" class="web-explorer-manual-color-c" id="web-explorer-manual-color-background-em-c" onclick="webExplorer_manualActiveColor('background-em');" checked="checked" css-type="background" link-type="em" />
                </td>
				<td style="text-align:center;">
                	<div class="web-explorer-manual-color" id="web-explorer-manual-color-background-em" /></div>
                </td>
            	<td>
                	<input type="checkbox" class="web-explorer-manual-color-c" id="web-explorer-manual-color-background-el-c" onclick="webExplorer_manualActiveColor('background-el');" checked="checked" css-type="background" link-type="el" />
                </td>
				<td style="text-align:center;">
                	<div class="web-explorer-manual-color" id="web-explorer-manual-color-background-el" /></div>
                </td>
            	<td>
                	<input type="checkbox" class="web-explorer-manual-color-c" id="web-explorer-manual-color-background-elv-c" onclick="webExplorer_manualActiveColor('background-elv');" checked="checked" css-type="background" link-type="elv" />
                </td>
				<td style="text-align:center;">
                	<div class="web-explorer-manual-color" id="web-explorer-manual-color-background-elv" /></div>
                </td>
            </tr>
            	<td>
                	border
                </td>
            	<td>
                	<input type="checkbox" class="web-explorer-manual-color-c" id="web-explorer-manual-color-border-em-c" onclick="webExplorer_manualActiveColor('border-em');" checked="checked" css-type="border" link-type="em" />
                </td>
				<td style="text-align:center;">
                	<div class="web-explorer-manual-color" id="web-explorer-manual-color-border-em" /></div>
                </td>
            	<td>
                	<input type="checkbox" class="web-explorer-manual-color-c"id="web-explorer-manual-color-border-el-c" onclick="webExplorer_manualActiveColor('border-el');" checked="checked" css-type="border" link-type="el" />
                </td>
				<td style="text-align:center;">
                	<div class="web-explorer-manual-color" id="web-explorer-manual-color-border-el" /></div>
                </td>
            	<td>
                	<input type="checkbox" class="web-explorer-manual-color-c" id="web-explorer-manual-color-border-elv-c" onclick="webExplorer_manualActiveColor('border-elv');" checked="checked" css-type="border" link-type="elv" />
                </td>
				<td style="text-align:center;">
                	<div class="web-explorer-manual-color" id="web-explorer-manual-color-border-elv" /></div>
                </td>
            </tr>
            	<td>
                	text
                </td>
            	<td>
                	<input type="checkbox" class="web-explorer-manual-color-c" id="web-explorer-manual-color-text-em-c" onclick="webExplorer_manualActiveColor('text-em');" checked="checked" css-type="text" link-type="em" />
                </td>
				<td style="text-align:center;">
                	<div class="web-explorer-manual-color" id="web-explorer-manual-color-text-em" /></div>
                </td>
            	<td>
                	<input type="checkbox" class="web-explorer-manual-color-c" id="web-explorer-manual-color-text-el-c" onclick="webExplorer_manualActiveColor('text-el');" checked="checked" css-type="text" link-type="el" />
                </td>
				<td style="text-align:center;">
                	<div class="web-explorer-manual-color" id="web-explorer-manual-color-text-el" /></div>
                </td>
            	<td>
                	<input type="checkbox" class="web-explorer-manual-color-c" id="web-explorer-manual-color-text-elv-c" onclick="webExplorer_manualActiveColor('text-elv');" checked="checked" css-type="text" link-type="elv" />
                </td>
				<td style="text-align:center;">
                	<div class="web-explorer-manual-color" id="web-explorer-manual-color-text-elv" /></div>
                </td>
            </tr>
        </table>
	</div>        
</div> 
        