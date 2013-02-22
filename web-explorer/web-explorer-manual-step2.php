<?php
/*
    WebMole, an automated explorer and tester for Web 2.0 applications
    Copyright (C) 2012-2013 Gabriel Le Breton, Fabien Maronnaud,
    Sylvain Hallé et al.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
        <button class="btn btn-success"  onclick="webExplorer_manualGoToOriginalNode();">
            <i class="icon-backward icon-white"></i> Go to original node
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
        