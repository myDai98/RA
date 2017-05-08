<?php

//    ChromePhp::log("text") to print to console if uncommented:
//include 'ChromePhp.php';

//require "config.php"; //conect to database
//require "buildQueryPage.php"; //initial SQL query
require "buildPageOnly.php"; 

?>

<br>


 <div id="manuscriptOptions">
    <!-- this div id class is specific to bootstrap, allows us to collapse selection -->
    <h2  data-toggle = "collapse" data-target = "#collapseManuscriptChoices" class = "dropDown" id = "openManuscript" onClick="flipSecond()">
        <img src="images/openTriangle.png" width=15px id="img2">
        Edit Manuscript and Letter Options
    </h2>

    <div id="collapseManuscriptChoices" class = "collapse in">
        <div class="col-sm-4" name = "manuscriptOptions">
            <h4>Choose manuscripts: </h4>
            <form action="" method="post">
                <h5>Manuscript Name(Sorted by Shelfmark): </h5>
            	<select id="manuname" class="form-control" onchange="correlate(this.value);">
                    <?php
                        ksort($manu);
                        //should be sorted before we get here

                        // have a placeholder
                        echo "<option value='{null}'></option>";
                        foreach($manu as $name=>$date) {

                            echo "<option value='{$name}'>{$name}</option>";
                        }
                        //var aaa=count($page);
                        //echo "<option value='{ffef}'>{aaa}</option>";
                    ?>

                </select>
                <br>

                <h5>Manuscript Date(Sorted Chronologically): </h5>
                 <select id="manudate" class="form-control" onchange="correlate(this.value);">
                    <?php
                        asort($manu);
                        //should be sorted before we get here
                        echo "<option value='{null}'></option>";
                        foreach($manu as $name=>$date) {

                            echo "<option value='{$name}'>{$date}</option>";
                        }
                        //var aaa=count($page);
                        //echo "<option value='{ffef}'>{aaa}</option>";
                    ?>

                </select>

                <br>

                <select id="manuurl" class="form-control" style='display:none;'>
                    <?php
                        //
                        //should be sorted before we get here
                        foreach($manuurl as $both) {

                            echo "<option value='{$both}'>{$both}</option>";
                        }
                        //var aaa=count($page);
                        //echo "<option value='{ffef}'>{aaa}</option>"; 
                    ?>

                </select>

                <input type="button" onclick="showPage()" value="Submit" data-target="#collapseManuscriptChoices" onClick=toggleBoth()> <br>


        </div>
        <br>
        <br> 
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>


            </form>
        </div>
    </div>
</div>

