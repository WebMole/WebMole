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
<div class="controls spacer web-explorer web-explorer-automatic-option" id="web-explorer-automatic-option-specify">
    <p>Webmole will click only on the <span class="label label-info">checked</span> elements below. Selecting only a small number of these could result in a <span class="label label-success">faster exploration</span>.</p>
    <span><a onclick="webExplorer_selectAllCheckbox('web-explorer-specify-element','true');">Select all</a> / <a onclick="webExplorer_selectAllCheckbox('web-explorer-specify-element','false');">Unselect all</a></span>
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