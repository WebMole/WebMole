<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>

<div class="row" id="web-explorer">
	<div class="span4">
		<h2>Insert your magic stuff here</h2>

		<div class="btn-group-centered spacer">
			<div class="btn-group">
				<button class="btn active">Some stuff</button>
				<button class="btn">Cool stuff</button>
			</div>	
		</div>
	</div>
	<div class="span8">
		<h2>Here's a random table</h2>

		<?php //@todo: make this dynamic and real ;) ?>
		<table class="table table-bordered table-striped">
			<colgroup>
				<col class="span2"></col>
				<col class="span6"></col>
			</colgroup>
			<thead>
				<tr>
					<th>Hapiness</th>
					<th>Joy</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<code>blabla</code>
					</td>
					<td>
						cool
					</td>
				</tr>
				<tr>
					<td>
						<code>hey</code>
					</td>
					<td>
						<span class="label label-important">replace</span>
					</td>
				</tr>
				<tr>
					<td>
						<code>me</code>
					</td>
					<td>
						ok?
					</td>
				</tr>
				<tr>
					<td>
						<code>do it</code>
					</td>
					<td>
						<span class="badge">NOW</span>
					</td>
				</tr>
			</tbody>
		</table>
		
		<button class="btn btn-success"><i class="icon-star-empty"></i> Hello world</button>
	
	</div>
</div><!-- /#web-explorer -->
