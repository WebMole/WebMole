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
<div class="btn-group spacer web-explorer" id="web-explorer-automatic-step2">
	<button type="button" class="btn btn-info" id="web-explorer-btn-automatic-view-map" onclick="">
    	<i class="icon-globe icon-white"></i> View map
    </button>
    <button type="button" class="btn btn-info" id="web-explorer-btn-automatic-extract-map" onclick="webExplorer_nodeToJson();">
    	<i class="icon-download-alt icon-white"></i> Extract map
    </button>
    <button type="button" class="btn btn-danger" id="web-explorer-btn-automatic-stop" onclick="webExplorer_setStop();">
    	<i class="icon-stop icon-white"></i> Stop
    </button>
    <button class="btn btn-inverse"  onclick="webExplorer_go('automatic-step1');">
    	<i class="icon-share-alt icon-white"></i> Back
    </button>        
</div> 
        