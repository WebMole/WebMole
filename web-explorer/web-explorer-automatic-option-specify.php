<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
	die('You are not allowed to view this file');
?>
<div class="controls spacer web-explorer web-explorer-automatic-option" id="web-explorer-automatic-option-specify">
    <p>orem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet aliquam tellus. Morbi aliquam sollicitudin posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum at diam lorem, ac consequat nibh. Phasellus commodo vulputate tellus. Mauris vel felis ipsum. Etiam non dolor justo, in rutrum justo. Fusce pulvinar aliquet facilisis. Etiam quis elit non leo luctus adipiscing non vitae nibh. Proin vitae facilisis lacus. Mauris cursus mollis lorem, eu convallis ligula placerat vitae.</p>
    <table class="table table-condensed">
        <tr>
            <th style="text-align:center;">Select</th>
            <th>Tag</th>
            <th>Description</th>
            <th style="text-align:center;">Select</th>
            <th>Tag</th>
            <th>Description</th>
        </tr>
        <?php
			$elementToSpecify_nbProperties = 0;
			$elementToSpecify_array = $CONFIG['Elements_to_specify'];
			reset($elementToSpecify_array);
			while (list($key, $val) = each($elementToSpecify_array)) {
				$elementToSpecify_nbProperties++;
				$elementToSpecify_params = explode(',',$key);
				$elementToSpecify_name = $elementToSpecify_params[0];
				if($elementToSpecify_params[1]=='true'){
					$elementToSpecify_checked = ' checked="checked"';
				}
				else{
					$elementToSpecify_checked = '';
				}
				$elementToSpecify_descr = $elementToSpecify_params[2];
				if( $elementToSpecify_nbProperties == 1 ){					
					echo '<tr>';
					echo '<td style="text-align:center;">';
					echo '<input type="checkbox" class="web-explorer-specify-element" '.$elementToSpecify_checked.' element-name="'.$elementToSpecify_name.'"/>';
					echo '</td>';
					echo '<td>'.$elementToSpecify_name.'</td>';
					echo '<td><em>'.$elementToSpecify_descr.'</em></td>';					
				}
				else if( $elementToSpecify_nbProperties == 2 ){					
					echo '<td style="text-align:center;">';
					echo '<input type="checkbox" class="web-explorer-specify-element" '.$elementToSpecify_checked.' element-name="'.$elementToSpecify_name.'"/>';
					echo '</td>';
					echo '<td>'.$elementToSpecify_name.'</td>';
					echo '<td><em>'.$elementToSpecify_descr.'</em></td>';
					echo '</tr>';		
				}
				if($elementToSpecify_nbProperties==2){
					$elementToSpecify_nbProperties = 0;
				}
			}
			if($elementToSpecify_nbProperties == 1){
				echo '<td>&nbsp;</td>';
				echo '<td>&nbsp;</td>';
				echo '<td>&nbsp;</td>';
				echo '</tr>';			
			}
		?>
     </table>
</div>