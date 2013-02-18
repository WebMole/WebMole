<?php

if(!empty($_GET["width"])) $sentWidth = htmlspecialchars($_GET["width"]);
if(!empty($_GET["height"])) $sentHeight = htmlspecialchars($_GET["height"]);
if(!empty($_GET["id"])) $id = htmlspecialchars($_GET["id"]);
if(!empty($_GET["color"])) $sentColor = htmlspecialchars($_GET["color"]);

if (!isset($sentWidth) || intval($sentWidth) <= 0 || intval($sentWidth) >= 1000)
    $width = 200;
else
    $width = intval($sentWidth);

if (!isset($sentHeight) || intval($sentHeight) <= 0 || intval($sentHeight) >= 1000)
    $height = 200;
else
    $height = intval($sentHeight);

if (!isset($sentColor))
    $color = randomColor(25);
else
{
    $color = hex2rgb($sentColor);
}
generatePicture($color, $width, $height, "Sample Item " . $id);


// Input spread
// Output generated $colors[0..2]
function randomColor($spread)
{
    for($c=0;$c<3;++$c)
    {
        $color[$c] = rand(0+$spread,255-$spread);
    }
    return $color;
}

function hex2rgb($hexcode)
{
    $redhex  = substr($hexcode,0,2);
    $greenhex = substr($hexcode,2,2);
    $bluehex = substr($hexcode,4,2);

    // Decimal fractions for R G abd B
    $values[0] = (hexdec($redhex)) / 255;
    $values[1] = (hexdec($greenhex)) / 255;
    $values[2] = (hexdec($bluehex)) / 255;
}
function rgb2hex($color)
{
    $rhex = round($color[0] / 255);
    $ghex = round($color[1] / 255);
    $bhex = round($color[2] / 255);

    return $rhex.$ghex.$bhex;
}

// Input is $var_r, $var_g and $var_b from above expressed as fractions of 1
// Output is HSL equivalent as $h, $s and $l — these are again expressed as fractions of 1
// More info at http://serennu.com/colour/rgbtohsl.php
function rgb2hsl($var_r, $var_g, $var_b)
{
    $var_min = min($var_r,$var_g,$var_b);
    $var_max = max($var_r,$var_g,$var_b);
    $del_max = $var_max - $var_min;

    $l = ($var_max + $var_min) / 2;

    if ($del_max == 0)
    {
        $h = 0;
        $s = 0;
    }
    else
    {
        if ($l < 0.5)
        {
            $s = $del_max / ($var_max + $var_min);
        }
        else
        {
            $s = $del_max / (2 - $var_max - $var_min);
        }

        $del_r = ((($var_max - $var_r) / 6) + ($del_max / 2)) / $del_max;
        $del_g = ((($var_max - $var_g) / 6) + ($del_max / 2)) / $del_max;
        $del_b = ((($var_max - $var_b) / 6) + ($del_max / 2)) / $del_max;

        if ($var_r == $var_max)
        {
            $h = $del_b - $del_g;
        }
        elseif ($var_g == $var_max)
        {
            $h = (1 / 3) + $del_r - $del_b;
        }
        elseif ($var_b == $var_max)
        {
            $h = (2 / 3) + $del_g - $del_r;
        }

        if ($h < 0)
        {
            $h += 1;
        }

        if ($h > 1)
        {
            $h -= 1;
        }
    }

    $hsl[0] = $h;
    $hsl[1] = $s;
    $hsl[2] = $l;
    return $hsl;
}

// Calculate the opposite hue (h)
function oppositeHue($hsl)
{
    $hsl[0] = $hsl[0] + 0.5;

    if ($hsl[0] > 1)
    {
        $hsl[0] -= 1;
    }
    return $hsl;
}

// Input is HSL value of complementary colour, held in $hsl as fractions of 1
// Output is RGB in normal 255 255 255 format, held in $colors[0..2]
// Hue is converted using function hue2rgb, shown at the end of this code
function hsl2rgb($hsl)
{
    $h = $hsl[0];
    $s = $hsl[1];
    $l = $hsl[2];

    if ($s == 0)
    {
        $color[0] = $l * 255;
        $color[1] = $l * 255;
        $color[2] = $l * 255;
    }
    else
    {
        if ($l < 0.5)
        {
            $var_2 = $l * (1 + $s);
        }
        else
        {
            $var_2 = ($l + $s) - ($s * $l);
        }

        $var_1 = 2 * $l - $var_2;
        $color[0] = 255 * hue2rgb($var_1,$var_2,$h + (1 / 3));
        $color[1] = 255 * hue2rgb($var_1,$var_2,$h);
        $color[2] = 255 * hue2rgb($var_1,$var_2,$h - (1 / 3));
    }
    return $color;
}

// Function to convert hue to RGB, called from above

function hue2rgb($v1,$v2,$vh)
{
    if ($vh < 0)
    {
        $vh += 1;
    }

    if ($vh > 1)
    {
        $vh -= 1;
    }

    if ((6 * $vh) < 1)
    {
        return ($v1 + ($v2 - $v1) * 6 * $vh);
    }

    if ((2 * $vh) < 1)
    {
        return ($v2);
    }

    if ((3 * $vh) < 2)
    {
        return ($v1 + ($v2 - $v1) * ((2 / 3 - $vh) * 6));
    }

    return ($v1);
}

function contrastColor($color)
{
    // rgb2hsl needs franctions, didn't edit the original function ;)
    $hsl = rgb2hsl($color[0]/255, $color[1]/255, $color[2]/255);
    $hsl = oppositeHue($hsl);
    return hsl2rgb($hsl);
}

function generatePicture($color, $width, $height, $string)
{

    $contrastedColor = contrastColor($color);

    $my_img = imagecreate( $width, $height );
    $background = imagecolorallocate( $my_img, $color[0], $color[1], $color[2] );
    $text_colour = imagecolorallocate( $my_img, $contrastedColor[0], $contrastedColor[1], $contrastedColor[2] );
    $line_colour = imagecolorallocate( $my_img, $contrastedColor[0], $contrastedColor[1], $contrastedColor[2] );
    imagestring( $my_img, 4, 30, 25, $string, $text_colour );
    imagesetthickness ( $my_img, 5 );
    imageline( $my_img, 30, 45, 165, 45, $line_colour );

    header( "Content-type: image/png" );
    imagepng( $my_img );
    imagecolordeallocate( $line_color );
    imagecolordeallocate( $text_color );
    imagecolordeallocate( $background );
    imagedestroy( $my_img );
}

?>