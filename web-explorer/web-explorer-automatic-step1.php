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
<div class="control-group spacer web-explorer" id="web-explorer-automatic-step1">
	<div class="input-append">
    	<input type="text" class="span6" id="web-explorer-automatic-url" value="<?php echo $CONFIG["Explorer"]["default_address"]; ?>" /><button type="button" class="btn btn-success" id="web-explorer-btn-automatic-start" onclick="webExplorer_start('automatic');"><i class="icon-play icon-white"></i> Start exploration</button><button type="button" class="btn btn-info" id="web-explorer-btn-automatic-options" onclick="webExplorer_go('automatic-options');"><i class="icon-list-alt icon-white"></i> Options</button><button class="btn btn-inverse"  onclick="webExplorer_go('type');"><i class="icon-share-alt icon-white"></i> Back</button>       
	</div>
</div> 
        