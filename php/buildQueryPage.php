<?php
 
	//mysqli_close ($db);
	$db->close();
	require "config.php";

    // build new query to get all urls of page imgs
    $pagequery='SELECT * FROM pagetable';
    //runs query
    $pageresult = $db->query($pagequery);

    $page = array();


?>
