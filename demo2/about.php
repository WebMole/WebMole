<?php
    $access = 'authorized';
    $currentPage = "About";
    $title = $currentPage;

    include('header.php');
?>
<section>

    <article>
        <header>
            <h2><?php echo $currentPage; ?></h2>
            <hr />
        </header>
        <?
            //100 words in html format
            echo $generator->getContent(300);
        ?>
    </article>

</section>

<?php
 include('footer.php');
?>