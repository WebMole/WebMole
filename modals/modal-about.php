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

<div class="modal hide fade" id="about_modal">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">×</button>
		<h3>Hello World from WebMole!</h3>
	</div>
	<div class="modal-body">
		<p>What is WebMole? it is a project for helping the generation of Navigation State Machine for web applications in a smooth and easy way.</p>

		<p>Designed and built with <a href="http://twitter.github.com/bootstrap/" target="_blank">Twitter Bootstrap</a>, using <a href="http://ace.ajax.org/" target="_blank">Ace editor</a> for live editing and color syntax highliting, <a href="http://thejit.org/" target="_blank">JavaScript InfoVis Toolkit</a> for visual map generation and a bunch of custom code!</p>
		<p>For further details, you can read the <a href="ReadMe.md">readme</a> or the Documentation.</p>
	</div>
	<div class="modal-footer">
		<a class="btn btn-primary" data-dismiss="modal" href="#">Alright!</a>
	</div>
</div>
