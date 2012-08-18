<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>

<div class="modal hide fade" id="source_modal">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">×</button>
		<h3>Manually insert the data</h3>
	</div>
	<div class="modal-body">
		<textarea class="source_input">Insert json here or clear and compute for a default graph</textarea>
		<div class="clear"></div>
		<a href="#" class="btn action_clear">Clear</a>
	</div>
	<div class="modal-footer">
		<a href="#" class="btn" data-dismiss="modal">Close</a>
		<a class="btn btn-primary action_compute" href="#"><i class="icon-fire"></i> Compute</a>
	</div>
</div>
