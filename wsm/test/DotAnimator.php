<?php
/**************************************************************************
    DOT animator
    Copyright (C) 2013  Sylvain Hallé
    
    Animate DOT graphs produced by µ-Crawler
    
    Author:  Sylvain Hallé
    Date:    2013-07-30
    
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
**************************************************************************/

$usage_string = <<<EOD

DOT animator - Animate DOT graphs produced by µ-Crawler
Usage: php DotAnimator.php [--help] [options] inputfile outputfile

Options:
  --delay x    Set delay of x/100 sec for the animation
  --title x    Set title of x to the graph

EOD;
/*----------------------*/

// Option defaults {{{
$params = array();
$params["inputfile"] = "";
$params["outputfile"] = "";
$params["delay"] = 50;
$params["title"] = "";
// }}}

// Parse command line options {{{
$to_set = "";
if (count($argv) < 2)
{
  show_help();
  exit(1);
}
for ($i = 1, $value = $argv[$i]; $i < count($argv) && $value = $argv[$i]; $i++)
{
  if ($value === "--help" || $value === "-h")
  {
    show_help_long();
    exit(1);
  }
  if ($value === "--delay")
  {
    $to_set = "delay";
  }
  elseif ($value === "--title")
  {
    $to_set = "title";
  }
  elseif ($to_set !== "")
  {
    $params[$to_set] = $value;
    $to_set = "";
  }
  elseif ($to_set === "")
  {
    if ($params["inputfile"] === "")
      $params["inputfile"] = $value;
    $params["outputfile"] = $value;
  }
}
if ($params["inputfile"] === "")
{
  echo "No input file specified";
  exit(1);
}

if ($params["outputfile"] === "")
{
  echo "No output file specified";
  exit(1);
}
// }}}

$input_dot = file_get_contents($params["inputfile"]);
$tempdir = tempdir();

$dot_file_prefix = "$tempdir/out-";
$image_file_prefix = "$tempdir/out-";
for ($i = 0; $i < 100; $i++)
{
  $out = transform_dot($input_dot, $i);
  if ($out === "")
  {
    // We are done
    break;
  }
  $dot_filename = $dot_file_prefix . sprintf("%04d", $i) . ".dot";
  $image_filename = $image_file_prefix . sprintf("%04d", $i) . ".png";
  echo "Writing to $dot_filename\n";
  file_put_contents($dot_filename, $out);
  echo "Converting as $image_filename\n";
  exec("dot -Tpng $dot_filename > $image_filename");
}
exec("convert -delay ".$params["delay"]." -loop 1 $image_file_prefix*.png ".$params["outputfile"]);
rrmdir($tempdir);
exit(0);


function transform_dot($s, $step_num)
{
  global $params;
  $out = "";
  $at_least_one = false;
  $lines = explode("\n", $s);
  foreach ($lines as $line)
  {
    if (substr($line, 0, 7) === "digraph")
    { 
      $out .= $line."\n";
      $out .= "  label=\"".$params["title"]." $step_num\";\n";
      continue;
    }
    if ($line[0] === "}")
    {
      $out .= $line."\n";
      continue;
    }
    list($dot, $comments) = explode("##", $line);
    $comments = trim($comments);
    $steps = explode(",", $comments);
    $on_step = -1;
    for ($i = 0; $i < count($steps); $i++)
    {
      if ($steps[$i] == $step_num)
      {
        $on_step = 1;
        // At least one animation step is greater than or equal to the current step
        $at_least_one = true;
        break;
      }
      elseif ($steps[$i] < $step_num)
      {
        $on_step = 0;
      }
      else
      {
        // At least one animation step is greater than or equal to the current step
        $at_least_one = true;
      }
    }
    if (strpos($line, "->") !== false)
    {
      // We are colouring an edge
      switch ($on_step)
      {
        case -1:
          // Edge not visited yet
          $line = preg_replace("/\\[/", "[color=grey,", $line, 1);
          break;
        case 0:
          // Edge visited in the past
          $line = preg_replace("/\\[/", "[color=black,", $line, 1);
          break;
        case 1:
          // Edge currently being visited
          $line = preg_replace("/\\[/", "[color=red,", $line, 1);
          break;
      }
    }
    else
    {
      // We are colouring a vertex
      if (strpos($line, "shape=none") === false) // To avoid colouring the fake initial node
      {
        switch ($on_step)
        {
          case -1:
            // Edge not visited yet
            $line = preg_replace("/\\[/", "[style=filled,color=grey,fillcolor=white,", $line, 1);
            break;
          case 0:
            // Edge visited in the past
            $line = preg_replace("/\\[/", "[style=filled,color=black,fillcolor=white,", $line, 1);
            break;
          case 1:
            // Edge currently being visited
            $line = preg_replace("/\\[/", "[style=filled,color=black,fillcolor=red,", $line, 1);
            break;
        }
      }
    }
    $out .= $line."\n";
  }
  if ($at_least_one)
    return $out;
  else
    return "";
}

function tempdir($dir=false,$prefix='php') {
    $tempfile=tempnam(sys_get_temp_dir(),'');
    if (file_exists($tempfile)) { unlink($tempfile); }
    mkdir($tempfile);
    if (is_dir($tempfile)) { return $tempfile; }
}

// When the directory is not empty:
function rrmdir($dir) {
 if (is_dir($dir)) {
   $objects = scandir($dir);
   foreach ($objects as $object) {
     if ($object != "." && $object != "..") {
       if (filetype($dir."/".$object) == "dir") rmdir($dir."/".$object); else unlink($dir."/".$object);
     }
   }
   reset($objects);
   rmdir($dir);
 }
}

// Useful functions {{{

function show_help()
{
  show_help_long();
}

function show_help_long()
{
  global $usage_string;
  $fh = fopen("php://stderr", "w");
  fputs($fh, $usage_string);
  fclose($fh);
}

// }}}

/* :mode=php:wrap=none:folding=explicit: */
?>
