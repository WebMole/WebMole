<?php
    $access = 'authorized';
    $currentPage = "Shop";
    if(!empty($_GET["item"]))
    {
        $itemNumber = intval($_GET["item"]);
        $title = $currentPage . ' - Item ' . $itemNumber;
    }
    else $title = $currentPage;


    // Config
    $width = 200;
    $height = 200;
    // $color = "00ff00";

    require('header.php');
?>
<section>

    <article>
        <header>
            <h2><?php echo $title; ?></h2>
            <hr />
        </header>
        <?
            if(!empty($_GET["item"]))
            {
                echo '<div class="four columns alpha align-center">';

                echo '<img id="shopItem-' . $itemNumber . '" class="shopItem photo"src="picture.php?width=' . $width . '&height=' . $height . '&id=' . $itemNumber;
                if (isset($color)) echo '&color=' . $color;
                echo '" alt="Image created by a PHP script" width="' . $width . '" height="' . $height . '">';
                
                echo '</div>';
                echo '<div class="description twelve columns omega">';
                echo '<h3>Sample item ' . $itemNumber . '</h3>';
                //echo $generator->getContent(70);
                echo '<p>lorem ipsum morbi pretium accumsan varius rhoncus luctus id orci aliquam, primis dictum luctus nunc justo rhoncus elit curabitur diam eleifend.</p>';
                echo '<a href="?item=' . $itemNumber . '" class="button">More info</a>';
                echo '</div>';
                echo '<div class="clear"></div>';
            }
            else
            {
            
                for ($i = 1; $i <= 10; $i++)
                {
                    echo '<div class="four columns alpha align-center">';

                    echo '<img id="shopItem-' . $i . '" class="shopItem photo"src="picture.php?width=' . $width . '&height=' . $height . '&id=' . $i;
                    if (isset($color)) echo '&color=' . $color;
                    echo '" alt="Image created by a PHP script" width="' . $width . '" height="' . $height . '">';
                    
                    echo '</div>';
                    echo '<div class="description twelve columns omega">';
                    echo '<h3>Sample item ' . $i . '</h3>';
                    //echo $generator->getContent(70);
                    echo '<p>lorem ipsum morbi pretium accumsan varius rhoncus luctus id orci aliquam, primis dictum luctus nunc justo rhoncus elit curabitur diam eleifend.</p>';
                    echo '<a href="?item=' . $i . '" class="button">More info</a>';
                    echo '</div>';
                    echo '<div class="clear"></div>';
                }
            }
            ?>
    </article>

</section>

<?php
    require('footer.php');
?>