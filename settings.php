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

<?php //Settings example ?>
<div id="settings">
	<form class="form-horizontal">
		<fieldset>
			<div class="control-group">
				<label class="control-label" for="default_graph_engine">Graph engine</label>
				<div class="controls">
					<input type="text" class="input-xlarge" id="default_graph_engine" placeholder="<?php echo $CONFIG["Viewer"]["default_graph_engine"]; ?>">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="default_adress">Default Explorer Adress</label>
				<div class="controls">
					<input type="text" class="input-xlarge" id="default_adress" placeholder="<?php echo $CONFIG["Explorer"]["default_adress"]; ?>">
				</div>
			</div>
			<div class="controls">
				<div class="control-group">
					<label class="checkbox">
						<input type="checkbox" id="Test-Ocale-default_enabled" checked="<?php echo $CONFIG["Test-Oracle"]["default_enabled"]; ?>"> Use Test Oracle
					</label>
				</div>
				<div class="control-group">
					<label class="checkbox">
						<input type="checkbox" id="Stop-Oracle-default_enabled" checked="<?php echo $CONFIG["Stop-Oracle"]["default_enabled"]; ?>"> Use Test Oracle
					</label>
				</div>
			</div>

			<div class="form-actions">
				<a class="btn btn-primary disabled">Save changes</a>
				<a class="btn disabled">Cancel</a>
				<!-- <button type="submit" class="btn btn-primary">Save changes</button> -->
				<!-- <button class="btn">Cancel</button> -->
				@Todo, save preferences in cookie
			</div>
		</fieldset>
	</form>
</div><!-- /#settings -->
