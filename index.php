<?php
/* This is to prevent direct access to other php files */
$access = 'authorized';

include('config.php');
/**
 * Read configuration file
 */
$CONFIG = read_config_file(CONFIG_FILE);
$application_directory = dirname($_SERVER['PHP_SELF']);

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Urlset Manager Project</title>

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
	<script language="javascript" type="text/javascript" src="js/ump-jit-manip.js"></script>
	<script language="javascript" type="text/javascript" src="js/ump-init.js"></script>
    
    <?php /* Web-explorer */ ?>
    <script language="javascript" type="text/javascript">
		var webExplorer_applicationDirectory = "<?php echo $application_directory ?>";
	</script>
    <script language="javascript" type="text/javascript" src="js/web-explorer.js"></script>
	<?php //include('js/web-explorer.js.php'); ?>

</head>

<body>
	<div class="container">
		<div class="page-header">
			<h1>Urlset Manager Project
				<small>Utility made on Twitter bootstrap with some awesome code</small>
				<a class="btn pull-right" data-toggle="modal" href="#help_modal" ><i class="icon-question-sign"></i> Help!</a>
			</h1>
		</div>
		
		<?php //@Todo: set this to show if cookies does not exist ;) ?>
		<div class="alert alert-info">
			<button class="close" data-dismiss="alert">×</button>
			<strong>Hello there!</strong> Looks like it's your first time here, click on help for more info ;).
		</div>
		
		<ul id="main-tab-controller" class="nav nav-tabs">
			<li class="active"><a href="#tab-map-viewier" data-toggle="tab">Map Viewer</a></li>
			<li><a href="#tab-web-explorer" data-toggle="tab">Web Explorer</a></li>
			<li><a href="#tab-settings" data-toggle="tab">Settings</a></li>
		</ul>
		<div id="main-tab-content" class="tab-content">
			<div class="tab-pane fade active in" id="tab-map-viewier">

				<?php include('map-viewer.php'); ?>

			</div>
			<div class="tab-pane fade" id="tab-web-explorer">
				
				<?php include('web-explorer.php'); ?>

			</div>
			<div class="tab-pane fade" id="tab-settings">

				<?php include('settings.php'); ?>

			</div>
		</div>

		<div class="footer">
			<a class="pull-right" href="https://github.com/GabLeRoux/Urlset-Manager-Project"><img src="img/github_logo_social_coding_outlined.png" alt="View project on GitHub" height="66" width="149" /></a>
			<p>Designed and built with <a href="http://twitter.github.com/bootstrap/" target="_blank">Twitter Bootstrap</a>, using <a href="http://code.google.com/p/google-code-prettify/" target="_blank">Prettifier</a> and <a href="http://thejit.org/" target="_blank">JavaScript InfoVis Toolkit</a>.</p>
			<p>By <a href="http://www.gableroux.com" target="_blank">GabLeRoux</a> and <a href="mailto:fabien.maronnaud@gmail.com">Fabien Maronnaud</a>, in collaboration with with <a href="http://www.leduotang.com/sylvain/">Sylvain Hallé</a>, Professor at <a href="http://www.uqac.ca/">Université du Québec à Chicoutimi</a>. </p>
			<p>Code licensed under the <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License v2.0</a>.</p>
		</div><!-- /.footer -->

	</div><!-- /.container -->

	<?php /* Hidden elements below */ ?>

	<?php /* Help Modal */ ?>
	<?php include("modals/modal-help.php") ?>

	<?php /* Source form Modal */ ?>
	<?php include("modals/modal-source-form.php") ?>

	<?php /* Upload Modal */ ?>
	<?php include("modals/modal-source-upload.php") ?>

	<?php // Those are the image used on the map ?>
	<div id="images" style="display:none;position:absolute">
		<img id="homepage-icon" src="img/nodes/homepage.png" alt="Icon" />
	</div><!-- #images -->

</body>
</html>
