<!-- Main file for the website. -->

<!DOCTYPE html>
<html lang="en">

    <title>Penn-Syriac Chart Generator</title>

    <head>

        <!-- exterior files: css and javascript -->

        <!-- source: <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script> -->
        <script src="js/ajax.js"></script>
        <script src="js/jquery-1.11.3.min.js"></script>

        <!-- source: <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script> -->
        <script src="js/bootstrap.js"></script>

        <!-- source for BOOTSTRAP : <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> -->
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css">

        <!-- Local files -->
        <link href="css/main.css" rel="stylesheet" type="text/css">
        <link href="css/print.css" rel="stylesheet" media="print">
        <script src="js/main.js"></script>

        <meta charset="UTF-8">

    </head>

    <body>

        <div id = "content">
            <div class="page-header">
                <h1>Penn-Syriac Chart Generator</h1>
            </div>

            <div id = "searchOptions">

                <h2  data-toggle = "collapse" data-target = "#collapseSearch" class = "dropDown" id="openSearch" onClick = "flipFirst()">
                        <img src="images/openTriangle.png" width = 15px id="img">
                        Edit Search Options
                </h2>

                <!-- this div id class is specific to bootstrap, allows us to collapse selection -->
                <div id = "collapseSearch" class = "collapse in">
                    <form name="chronology" >
                        <br>
                        <h4>Date Range</h4>
                        <h5>
                            Earliest Date:
                            <input type="text" id="earliest" class="shortText" placeholder="No Limit" onblur="checkInput('earliest')">
                            Latest Date:
                            <input type="text" id="latest" class="shortText" placeholder="No Limit" onblur="checkInput('latest')">
                            <br><br>
                            <!-- <input type="checkbox" id="dates" value="dated" checked="checked">
                            Only display dated manuscripts -->
                            <input type="radio" name="dates" value="dated" checked="checked" >
                            Only Display Securely Dated Manuscripts&nbsp
                            <input type="radio" name="dates" value="nondated" >
                            Only Display Manuscripts Without a Secure Date&nbsp
                            <input type="radio" name="dates" value="both" >
                            Display All Manuscripts
                            <br>
                        </h5>
                        <br>

                        <h4>Sort Manuscripts By</h4>
                        <h5>
                            <input type="radio" name="sort" value="num" checked="checked" >
                            Chronologically
                            <input type="radio" name="sort" value="alp" >
                            By Manuscript Shelfmark
                        </h5>
                        <br>

                        <!-- button- onclick goes to the first javascript function-->
                        <input type='button' onclick="searchByCriteria('manuscriptOptions')" value='Search' data-toggle="collapse" data-target="#collapseSearch">
                    </form>
                </div>
            </div>

<!--            Replaced by AJAX to contain selectBox   -->
            <div id='manuscriptOptions'></div>

            <br>
<!--            Replaced by javascript to contain chart of letter images  -->
            <div id='letterTable'><span id="hidden">---Placeholder---</span> </div>

        </div>
    </body>
</html>
