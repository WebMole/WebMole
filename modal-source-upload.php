<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>

<div class="modal hide fade" id="upload_modal">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">×</button>
		<h3>Manually insert the data</h3>
	</div>
	<div class="modal-body">
		<p>
			<input id="files-upload" type="file" multiple>
		</p>
		<p id="drop-area">
			<!-- <span class="drop-instructions">or drag and drop files here</span> -->
			<span class="drop-over">Drop files here!</span>
		</p>
		<p>Or just do it the good old way ;)</p>
		<input type="file" name="datafile"></input>
		<input type="submit"></input>
	</div>
	<div class="modal-footer">
		<a href="#" class="btn" data-dismiss="modal">Close</a>
	</div>
</div>
