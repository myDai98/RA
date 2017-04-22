<?php

//    ChromePhp::log("text") to print to console if uncommented:
//include 'ChromePhp.php';

require "config.php"; //conect to database
require "buildQueryString.php"; //initial SQL query
//require "buildQueryPage.php"; 

// disconnect and reopen a query
require "buildQueryPage.php";
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
                <select id="manuscripts" class="form-control"  multiple size="10">
                    <?php
                        require "filterManuscripts.php";//filters and sorts

                        //displays results
                        //should be sorted before we get here
                        foreach($finalManuscriptList as $name=>$average) {
//                            ChromePhp::log($average);
                            echo "<option value='{$name}'>{$name}</option>";
                        }
                        //var aaa=count($page);
                        //echo "<option value='{ffef}'>{aaa}</option>";
                    ?>

                </select>

                <select id="page" class="form-control"  multiple size="10" style='display:none;'>
                    <?php
                        //require "filterManuscripts.php";//filters and sorts

                        //displays results
                        //should be sorted before we get here
                        foreach($page as $url) {
//                            ChromePhp::log($average);
                            echo "<option value='{$url}'>{$url}</option>";
                        }
                        //var aaa=count($page);
                        //echo "<option value='{ffef}'>{aaa}</option>";
                    ?>

                </select>

                <select id="manu" class="form-control"  multiple size="10" style='display:none;'>
                    <?php
                        //require "filterManuscripts.php";//filters and sorts

                        //displays results
                        //should be sorted before we get here
                        foreach($manuname as $manu) {
//                            ChromePhp::log($average);
                            echo "<option value='{$manu}'>{$manu}</option>";
                        }
                        //var aaa=count($page);
                        //echo "<option value='{ffef}'>{aaa}</option>";
                    ?>

                </select>


            </form>
            <br/>
            <input type="button" name="Button" value="All" onclick="selectAll('manuscripts')" >
        </div>
        <div class="col-sm-4" name = "letterOptions">
            <h4>Choose letters: </h4>
            <form action="" method="post">
                <select id="letters" class="form-control" name="letterNames[]" multiple size="10">
                    <?php
//                         $letters = array("Alaph", "Beth", "Gamal", "Dalath", "He", "Waw", "Zain", "Heth", "Teth", "Yudh", "Kaph", "Lamadh", "Mim", "Nun",  "Semkath", "Ayin", "Pe", "Sadhe", "Qaph", "Rish", "Shin", "Taw");
                        //$letters = array("Alaph (Angular)", "Alaph (Round)", "Beth", "Gamal", "Dalath (Angular)", "Dalath (Round)", "He (Angular)","He (Round)","Waw","Zain","Heth","Teth","Yudh (Connected)","Yudh (Stand-alone)","Kaph","Kaph (Final)","Lamadh","Lamadh (Final, open)","Lamadh (Final, closed)","Mim","Mim (Final)","Nun","Nun (Final, connected)","Nun (Final, unconnected)", "Semkath", "Ayin", "Ayin (Final, open)","Ayin (Final, closed)","Pe","Sadhe","Qaph","Rish (Angular)","Rish (Round)","Shin","Taw (Looped)","Taw (Triangular)","Taw (L-shaped)");
                        //remove two final ayns
                        $letters = array("Alaph (Angular)", "Alaph (Round)", "Beth", "Gamal", "Dalath (Angular)", "Dalath (Round)", "He (Angular)","He (Round)","Waw","Zain","Heth","Teth","Yudh (Connected)","Yudh (Stand-alone)","Kaph","Kaph (Final)","Lamadh","Lamadh (Final, open)","Lamadh (Final, closed)","Mim","Mim (Final)","Nun","Nun (Final, connected)","Nun (Final, unconnected)", "Semkath", "Ayin","Pe","Sadhe","Qaph","Rish (Angular)","Rish (Round)","Shin","Taw (Looped)","Taw (Triangular)","Taw (L-shaped)");
                        //syriac order of interface and table
                        //asort($letters);
                        foreach($letters as $letter) {
                            echo "<option value='{$letter}'>{$letter}</option>";
                        }
                    ?>

                </select>
            </form>
            <br>

            <input type="button" name="Button" value="All" onclick="selectAll('letters')" >
            <br>
        </div>
        <div class="col-sm-4" name = "imageOptions">

            <!-- <h4>Image type</h4>
            <h5>
                <input type="radio" name="images" value="rawrep" >
                Color
                <input type="radio" name="images" value="binaryrep" checked="checked" >
                Black and White

                <br>
                <input type="radio" name="images" value="smooth" >
                Smooth B/W

            </h5>
            <br>
 -->            <h4>Image size</h4>
            <h5>
                <input type="radio" name="size" value="small" checked="checked" >
                Small
                <input type="radio" name="size" value="medium" >
                Medium
                <input type="radio" name="size" value="large" >
                Large
            </h5>
            <br>
            <h4>Result Layout</h4>
            <h5>
                <input type="radio" name="layout" value="table" checked="checked" >
                Table
                <input type="radio" name="layout" value="flow" >
                Flow
            </h5>
            <br>
            <br>
            <br><br>
        </div>
        <input type="button" onclick="processData()" value="Submit" data-toggle="collapse" data-target="#collapseManuscriptChoices" onClick=toggleBoth()> <br>
        <br>
        <!-- Add Guidiance to choose  -->
        <p>  &nbsp&nbsp&nbsp&nbspClick for selection of single item</p>
        <p>  &nbsp&nbsp&nbsp&nbspClick while holding down shift key for selection of multiple, contiguous items</p>
        <p>  &nbsp&nbsp&nbsp&nbspClick while holding down command key for selection of multiple, non-continguous items</p>
    </div>
</div>
