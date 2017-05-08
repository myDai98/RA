<?php
	include 'ChromePhp.php';

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
?>