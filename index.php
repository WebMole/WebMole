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

/* This is to prevent direct access to other php files */
$access = 'authorized';

include('config/config.php');
/**
 * Read configuration file
 */
$CONFIG = read_config_file(CONFIG_FILE);

$application_url = "http://" . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
$explorer_default_url = $CONFIG["Explorer"]["default_adress"];

if( strpos($explorer_default_url, "http://") === false )
	$explorer_default_url = $application_url . $explorer_default_url;

$CONFIG["Explorer"]["default_adress"] = $explorer_default_url;
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>WebMole</title>


	<?php /* --- Libraries --- */ ?>
	
	<?php /* jQuery */ ?>
	<script language="javascript" type="text/javascript" charset="utf-8" src="library/js/jquery-1.9.1.min.js"></script>
    
    <?php /* Twitter Bootstrap (Amazing layout and style, etc.) */ ?>
	<link type="text/css" href="library/css/bootstrap.min.css" rel="stylesheet" />
	<script language="javascript" type="text/javascript" charset="utf-8" src="library/js/bootstrap.min.js"></script>
	<script language="javascript" type="text/javascript" charset="utf-8" src="library/js/bootstrapx-clickover.js"></script>

    <?php /* ColorPicker */ ?>
	<link type="text/css" href="library/css/colorpicker.css" rel="stylesheet" />
	<script language="javascript" type="text/javascript" charset="utf-8" src="library/js/colorpicker.js"></script>

	<?php /* JIT Library */ ?>
	<script language="javascript" type="text/javascript" charset="utf-8" src="library/js/jit.js"></script>

	<?php /* Ace Editor (Syntax highliter at the same time) */ ?>
	<script language="javascript" type="text/javascript" charset="utf-8" src="library/js/ace/ace.js"></script>

	<?php /* JSON conversion (from and to string) */ ?>
	<script language="javascript" type="text/javascript" charset="utf-8" src="library/js/json2.js"></script>

	<?php /* --- Libraries end --- */ ?>

	<?php /* --- Application related scripts and style --- */ ?>

	<?php /* CSS */ ?>
	<link type="text/css" href="css/style.css" rel="stylesheet" />

	<?php /* Application Manips */ ?>
	<script language="javascript" type="text/javascript" src="js/jit-manip.js"></script>
	<script language="javascript" type="text/javascript" src="js/init.js"></script>
    
    <?php /* Web-explorer */ ?>
    <script language="javascript" type="text/javascript">
		var webExplorer_applicationDirectory = "<?php echo $application_url ?>";
	</script>
    <script language="javascript" type="text/javascript" src="js/web-explorer.js"></script>

	<?php /* --- Application related scripts and style end --- */ ?>

</head>

<body>
	<div class="container">
		<div class="page-header">
			<h1>WebMole
				<small>Automated Exploration and Analysis of Ajax Web Applications</small>
				<a class="btn pull-right" data-toggle="modal" href="#about_modal" ><i class="icon-question-sign"></i> About!</a>
			</h1>
		</div>
		
		<div id="firstTimeAlert" class="alert alert-info">
			<button class="close" data-dismiss="alert">×</button>
			<strong>Hello there!</strong> This is a new session, if you need help, read the documentation ;).
		</div>
		
		<ul id="main-tab-controller" class="nav nav-tabs">
			<li><a href="#tab-map-viewier" data-toggle="tab">Map Viewer</a></li>
			<li class="active"><a href="#tab-web-explorer" data-toggle="tab">Web Explorer</a></li>
			<li><a href="#tab-oracle-test" data-toggle="tab">Test Oracle</a></li>
			<li><a href="#tab-oracle-stop" data-toggle="tab">Stop Oracle</a></li>
			<li><a href="#tab-settings" data-toggle="tab">Settings</a></li>
			<li><a href="#tab-documentation" data-toggle="tab">Documentation</a></li>
		</ul>
		<div id="main-tab-content" class="tab-content">
			<div class="tab-pane fade" id="tab-map-viewier">

				<?php include('map-viewer.php'); ?>

			</div>
			<div class="tab-pane active fade in" id="tab-web-explorer">
				
				<?php include('web-explorer.php'); ?>

			</div>
			<div class="tab-pane fade" id="tab-oracle-test">

				<?php include('oracle-test.php'); ?> 

			</div>
			<div class="tab-pane fade" id="tab-oracle-stop">

				<?php include('oracle-stop.php'); ?> 

			</div>
			<div class="tab-pane fade" id="tab-settings">

				<?php include('settings.php'); ?>

			</div>
			<div class="tab-pane fade" id="tab-documentation">

				<?php include('documentation.php'); ?> 

			</div>
		</div>

		<div class="footer">
			<a class="pull-right" href="https://github.com/GabLeRoux/webmole"><img src="img/github_logo_social_coding_outlined.png" alt="View project on GitHub" height="66" width="149" /></a>
			<p>By <a href="http://www.gableroux.com" target="_blank">GabLeRoux</a> and <a href="mailto:fabien.maronnaud@gmail.com">Fabien Maronnaud</a>, in collaboration with <a href="http://www.leduotang.com/sylvain/">Sylvain Hallé</a>, Professor at <a href="http://www.uqac.ca/">Université du Québec à Chicoutimi</a>. </p>
			<p>Code licensed under the <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License v2.0</a>.</p>
		</div><!-- /.footer -->

	</div><!-- /.container -->

	<?php /* Hidden elements below */ ?>

	<?php /* Help Modal */ ?>
	<?php include("modals/modal-about.php") ?>

	<?php /* Source form Modal */ ?>
	<?php include("modals/modal-source-form.php") ?>

	<?php /* Upload Modal */ ?>
	<?php include("modals/modal-source-upload.php") ?>

	<?php // Those are the pictures used for the map's nodes ?>
	<div id="images" style="display:none;position:absolute">
		<img id="homepage-icon" src="img/nodes/homepage.png" alt="Icon" />
	</div><!-- #images -->

</body>
</html>
