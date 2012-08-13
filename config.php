<?php
/* Prevent direct access to this file. */
if ($access != 'authorized')
    die('You are not allowed to view this file');

define("CONFIG_FILE", "config_data.ini");


/**
 * Read a structured configuration file and puts it into an
 * array. Tweaked from http://www.codewalkers.com/c/a/Miscellaneous/Configuration-File-Processing-with-PHP/2/
 */

function read_config_file($filename) // {{{
{
  $comment = ";";
  $group = "NONE";
  $config_values = array();
  $fp = fopen($filename, "r");
  while (!feof($fp)) {
    $line = trim(fgets($fp));
    if ($line && !preg_match("/^$comment/", $line)) {
      if (preg_match("/^\[/", $line) && preg_match("/\]$/", $line)) {
        $line = trim($line,"[");
        $line = trim($line, "]");
        $group = trim($line);
      } else {
        $pieces = explode("=", $line);
        $pieces[0] = trim($pieces[0] , "\"");
        $value = "";
        for ($i = 1; $i < count($pieces); $i++)
          $value .= ($i == 1 ? "" : "=").$pieces[$i];
        $option = trim($pieces[0]);
        $value = trim($value);
        $config_values[$group][$option] = $value;
      }
    }
  }
  fclose($fp);
  return $config_values;
} // }}}

/*
read_config_file usage: 
$CONFIG = read_config_file(CONFIG_FILE);

Example ini file:
;configs below
[general]
my_setting = true
other_setting = http://www.google.ca/

echo $CONFIG["general"]["my_setting"]; // true
echo $CONFIG["general"]["other_setting"]; // http://www.google.ca/


/*
 *  Write whole ini file
 *  @todo: Modifier la fonction pour qu'elle puisse modifier le fichier plutot que de reecrire le fichier.
 *  More info here: http://stackoverflow.com/questions/1268378/create-ini-file-write-values-in-php
 */
function write_ini_file($assoc_arr, $path, $has_sections=FALSE) { 
    $content = ""; 
    if ($has_sections) { 
        foreach ($assoc_arr as $key=>$elem) { 
            $content .= "[".$key."]\n"; 
            foreach ($elem as $key2=>$elem2) { 
                if(is_array($elem2)) 
                { 
                    for($i=0;$i<count($elem2);$i++) 
                    { 
                        $content .= $key2."[] = \"".$elem2[$i]."\"\n"; 
                    } 
                } 
                else if($elem2=="") $content .= $key2." = \n"; 
                else $content .= $key2." = \"".$elem2."\"\n"; 
            } 
        } 
    } 
    else { 
        foreach ($assoc_arr as $key=>$elem) { 
            if(is_array($elem)) 
            { 
                for($i=0;$i<count($elem);$i++) 
                { 
                    $content .= $key2."[] = \"".$elem[$i]."\"\n"; 
                } 
            } 
            else if($elem=="") $content .= $key2." = \n"; 
            else $content .= $key2." = \"".$elem."\"\n"; 
        } 
    } 

    if (!$handle = fopen($path, 'w')) { 
        return false; 
    } 
    if (!fwrite($handle, $content)) { 
        return false; 
    } 
    fclose($handle); 
    return true; 
}

/*
write_ini_file Usage :
$sampleData = array(
                'first' => array(
                    'first-1' => 1,
                    'first-2' => 2,
                    'first-3' => 3,
                    'first-4' => 4,
                    'first-5' => 5,
                ),
                'second' => array(
                    'second-1' => 1,
                    'second-2' => 2,
                    'second-3' => 3,
                    'second-4' => 4,
                    'second-5' => 5,
                ));
write_ini_file($sampleData, './data.ini', true);
*/

?>