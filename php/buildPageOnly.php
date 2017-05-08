<?php
    //$db->close();
    require "config.php";

    $firstDate = $_GET['firstDate'];
    $secondDate = $_GET['secondDate'];
    //$onlyDated = $_GET['onlyDated'];
    $dateType = $_GET['dateType'];
    $sortChoice = $_GET['sortChoice'];

    // build new query to get all urls of page imgs
    $pagequery='SELECT * FROM manuscripttable';
    //runs query

    
    $pagequery .= " WHERE Date NOT IN ('')";
   


    $pageresult = $db->query($pagequery);

    $date = array();
    // $manuname=array();
    // turn page url into an array
    // while($row = $pageresult->fetch_assoc()){
    //     array_push($page, $row['Date']);
    //     array_push($manuname, $row['Manuscript_no']);
    // }
    $manu=array();
        while($throw = $pageresult->fetch_assoc()) {
        //creates variables to add to associative array
        $manus = $throw['Manuscript_no'];
        $dates = $throw['Date'];

        //adds elements to array
        //elements can be accessed like: foreach($manu as $m=>$m_date)
        $manu[$manus] = $dates;
        //echo "$dates";
    }

        // get the correct data
        foreach($manu as $m=>$m_date) {

        //get rid of spaces
        $fm = str_replace(" ", "", $m_date);
        $manu[$m] = $fm;

        //get length
        $l = strlen($m_date);

        if ($l == 3 || $l == 4 || $l==5) {
            //round value
            $new = intval($m_date);
            $manu[$m] = $new;
        }
    }

    // turn the data range into value
        foreach ($manu as $m => $m_date) {
        $both = $m;

        if (strpos($m_date, '-') != false) {
            $index = strrpos($manu[$m], "-");
            $firstValue = substr($manu[$m], 0, $index);
            $index++;
            $secondValue = substr($manu[$m], $index);

            $average = ($firstValue + $secondValue) / 2;
//            ChromePhp::log($average);

            $finalManuscriptList[$both] = $average;
        }

        else {
            $finalManuscriptList[$both] = $m_date;
        }
    }



    //mysqli_close ($db);
    $db->close();
    require "config.php";

    // build new query to get all urls of page imgs
    $pagequery='SELECT * FROM pagetable
                GROUP BY Manuscript_No';
    //runs query
    $result = $db->query($pagequery);

    $manuurl=array();

    while($row = $result->fetch_assoc()) {
        //creates variables to add to associative array
        $name = $row['Manuscript_No'];
        $url = $row['Image_Name'];
        $both = $name."+".$url;
        array_push($manuurl, $both);
        //echo "$dates";
    }
    



?>