<?php
    // Retrieve data from Query String
    $firstDate = $_GET['firstDate'];
    $secondDate = $_GET['secondDate'];
    //$onlyDated = $_GET['onlyDated'];
    $dateType = $_GET['dateType'];
    $sortChoice = $_GET['sortChoice'];


    //build query
    $query = 'SELECT * FROM manuscripttable';

    // build new query to get all urls of page imgs
    //$pagequery='SELECT Image_Name FROM pagetable';

    //selects only dated manuscripts
    // if ($onlyDated == "true") {
    //     //$query .= " WHERE Date NOT IN ('')";
    //     $query .= " WHERE Date IN ('')";
    // }
    
    if($dateType=="dated"){
        $query .= " WHERE Date NOT IN ('')";
    }
    elseif ($dateType=="nondated") {
        $query .= " WHERE Date IN ('')";
    }

    //runs query
    $result = $db->query($query);
    //$pageurl = $db->query($pagequery);
    $manu = array();
    //$page = array();


?>
