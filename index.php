<?php
/* This is to prevent direct access to other php files */
$access = 'authorized';
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Urlset Map Viewer</title>

	<?php /* CSS */ ?>
	<link type="text/css" href="css/style.css" rel="stylesheet" />

	<?php /* jQuery */ ?>
	<script language="javascript" type="text/javascript" src="js/jquery-1.7.2.min.js"></script>

	<?php /* Twitter Bootstrap (Amazing layout and style, etc.) */ ?>
	<link type="text/css" href="css/bootstrap.min.css" rel="stylesheet" />
	<script language="javascript" type="text/javascript" src="js/bootstrap.min.js"></script>

	<?php /* Prettyprint (Syntax highlighting) */ ?>
	<link type="text/css" href="css/prettify.css" rel="stylesheet" />
	<script type="text/javascript" src="js/prettify.js"></script>

	<?php /* JIT Library */ ?>
	<script language="javascript" type="text/javascript" src="js/jit.js"></script>

	<?php /* Noty Library (Growl Like jQuery notifications) */ ?>
	<script language="javascript" type="text/javascript" src="js/noty/jquery.noty.js"></script>
	<script language="javascript" type="text/javascript" src="js/noty/layouts/topLeft.js"></script>
	<script language="javascript" type="text/javascript" src="js/noty/layouts/topRight.js"></script>
	<script language="javascript" type="text/javascript" src="js/noty/layouts/top.js"></script>
	<script language="javascript" type="text/javascript" src="js/noty/themes/default.js"></script>

	<?php /* Application Manips */ ?>
	<script language="javascript" type="text/javascript" src="js/umv-jit-manip.js"></script>
	<script language="javascript" type="text/javascript" src="js/umv-init.js"></script>

</head>

<body>
	<div class="container">
		<div class="page-header">
			<h1>Urlset Map Viewer
				<small>A SiteHopper Utility made with jit and Twitter bootstrap</small>
				<a class="btn pull-right" data-toggle="modal" href="#help_modal" ><i class="icon-question-sign"></i> Help!</a>
			</h1>
		</div>
		
		<div class="alert alert-info">
			<button class="close" data-dismiss="alert">×</button>
			<strong>Hello there!</strong> Looks like it's your first time here, click on help for more info ;).
		</div>
		
		<div class="row">
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
				<h2>Nodes Info</h2>
			</div>
		</div>
		
		<div class="footer">
			<p>Designed and built with <a href="http://twitter.github.com/bootstrap/" target="_blank">Twitter Bootstrap</a>, using <a href="http://code.google.com/p/google-code-prettify/" target="_blank">Prettifier</a> and <a href="http://thejit.org/" target="_blank">JavaScript InfoVis Toolkit</a>.</p>
			<p>By <a href="http://www.gableroux.com" target="_blank">GabLeRoux</a></p>
			<p>Code licensed under the <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License v2.0</a>.</p>
		</div>

	</div>
	
	<?php /* Hidden elements below */ ?>

	<?php /* Log */ ?>
	<div id="log"></div>

	<?php /* Source code Modal */ ?>
	<div class="modal hide fade" id="source_modal">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">×</button>
			<h3>Manually insert the data</h3>
		</div>
		<div class="modal-body">
			<textarea class="source_input">Insert your data here</textarea>
			<div class="clear"></div>
			<a href="#" class="btn action_clear">Clear</a>
		</div>
		<div class="modal-footer">
			<a href="#" class="btn" data-dismiss="modal">Close</a>
			<a class="btn btn-primary action_compute" data-dismiss="modal" href="#"><i class="icon-fire"></i> Compute</a>
		</div>
	</div>

	<?php /* Help Modal */ ?>
	<div class="modal hide fade" id="help_modal">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">×</button>
			<h3>Don't panic, everything's ok!</h3>
		</div>
		<div class="modal-body">
			<p>Basically, this is an utility for viewing some <span class="label label-info">urlset generated maps</span> in a smooth and easy way. Maps are usually in <span class="label label-info">xml</span> formats and here is an example:</p>

			<pre class="prettyprint"><code class="language-xml"><?php echo htmlspecialchars(file_get_contents("example.xml"), ENT_QUOTES); ?></code></pre>

			<p>Just insert this sample code and see the result, simple as that ;)</p>
		</div>
		<div class="modal-footer">
			<a class="btn btn-primary" data-dismiss="modal" href="#">Alright!</a>
		</div>
	</div>

	<?php /* Upload Modal */ ?>
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
</body>
</html>
