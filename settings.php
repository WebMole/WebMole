<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>

<?php //Settings example ?>
<div id="settings">
	<form class="form-horizontal">
		<fieldset>
			<div class="control-group">
				<label class="control-label" for="application_directory">Application directory</label>
				<div class="controls">
					<input type="text" class="input-xlarge" id="application_directory" placeholder="<?php echo $CONFIG["General"]["application_directory"]; ?>">
				</div>
			</div>
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
				<button type="submit" class="btn btn-primary">Save changes</button>
				<button class="btn">Cancel</button>
			</div>
		</fieldset>
	</form>
</div><!-- /#settings -->
