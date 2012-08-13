<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>

<div class="row" id="web-explorer">
	<div class="span12">
		<div class="control-group spacer">
			<div class="controls">
				<div class="input-append">
					<?php /* inline links for sticked buttons */ ?>
					<input type="text" class="span7" id="sh_url_start" value="<?php echo $CONFIG["Explorer"]["default_adress"]; ?>"/><button type="button" class="btn btn-info" id="sh_url_start_btn" onclick="webExplorer_start();"><i class="icon-play icon-white"></i> Start exploration</button><button type="button" class="btn btn-info" id="sh_url_start_btn" onclick="nomDeLappli_start();"><i class="icon-globe icon-white"></i> View map</button><button type="button" class="btn btn-danger" id="sh_url_start_btn" onclick="nomDeLappli_start();"><i class="icon-stop icon-white"></i> Cancel</button>
				</div>
			</div>
		</div>
	</div>

	<div class="span5">
		<h2>Console</h2>

		<div id="web-explorer-console">
		</div>

	</div>
	<div class="span7">
		<h2>Viewer</h2>
		<iframe id="sh_explorer_frame"></iframe>  

	</div>
</div><!-- /#web-explorer -->
