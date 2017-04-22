<?php
 
	//mysqli_close ($db);
	$db->close();
	require "config.php";

    // build new query to get all urls of page imgs
    $pagequery='SELECT * FROM pagetable';
    //runs query
    $pageresult = $db->query($pagequery);

    $page = array();
    $manuname=array();
    // turn page url into an array
    while($row = $pageresult->fetch_assoc()){
        array_push($page, $row['Image_Name']);
        array_push($manuname, $row['Manuscript_No']);
    }


?>
