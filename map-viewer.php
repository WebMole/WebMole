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

<div class="row" id="map-viewer">
	<div class="span8">
		<h2>The Circular Map
			<div class="pull-right">
				<div class="btn-group">
					<a class="btn" data-toggle="modal" href="#source_modal" ><i class="icon-edit"></i> Insert map manually</a>
					<a class="btn btn-info" data-toggle="modal" href="#upload_modal" ><i class="icon-upload"></i> Upload map</a>
				</div>
			</div>
		</h2>

		<div id="infovis"><?php /* Map is generated here */ ?></div>

		<div class="btn-group-centered spacer">
			<div class="btn-group">
				<button class="btn circular-map active">Circular map</button>
				<button class="btn force-directed">Force Directed</button>
			</div>	
		</div>
	</div>
	<div class="span4">
		<div id="status" class="alert alert-info"><?php /* status will be written here */ ?></div>
		<h2>Nodes Info</h2>

		<table class="table table-bordered table-striped">
			<colgroup>
				<col class="span2"></col>
				<col class="span2"></col>
			</colgroup>
			<thead>
				<tr>
					<th>Properties</th>
					<th>Values</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<code>Name</code>
					</td>
					<td id="jit-data-name"><?php // name will be written here ?></td>
				</tr>
				<tr>
					<td>
						<code>Id</code>
					</td>
					<td id="jit-data-id"><?php // id will be written here ?></td>
				</tr>
				<tr>
					<td>
						<code>Type</code>
					</td>
					<td id="jit-data-type"><?php // type will be written here ?></td>
				</tr>
				<tr>
					<td>
						<code>Path</code>
					</td>
					<td id="jit-data-path"><?php // path will be written here ?></td>
				</tr>
				<tr>
					<td>
						<code>Weight</code>
					</td>
					<td id="jit-data-weight"><?php // weight will be written here ?></td>
				</tr>
			</tbody>
		</table>

		<div id="adjencies"><?php // adjencies will be written here ?></div>

		<div class="btn-group-centered spacer">
			<div class="btn-group">
				<button class="btn btn-danger"><i class="icon-minus-sign"></i> Delete</button>
				<button class="btn btn-inverse"><i class="icon-tint icon-white"></i> Restore</button>
			</div>	
		</div>
	</div>
</div><!-- /#map-viewer -->
