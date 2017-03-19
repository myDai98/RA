var AJAX;
var DEBUG = false;
var firstTriangle = "open";
var secondTriangle = "open";

//General function to define AJAX global variable
function setUpAjax(divID){
    //Browser Support Code (Necessary)
    try{
        // Opera 8.0+, Firefox, Safari
        AJAX = new XMLHttpRequest();
    }catch (e){
        // Internet Explorer Browsers
        try{
            AJAX = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {

            try{
                AJAX = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e){
                // Something went wrong
            alert("AJAX error");
            return false;
            }
        }
    }

    // Create a function that will receive data
    // sent from the server and will update
    // div section in the same page.
    AJAX.onreadystatechange = function(){

        if(AJAX.readyState == 4){
            var ajaxDisplay = document.getElementById(divID);
            ajaxDisplay.innerHTML = AJAX.responseText;
        }
    };
}

function flipFirst() {

    if(firstTriangle == "open") {
        var string = window.location.href + "images/closedTriangle.png";
        document.getElementById('img').src = string;
        firstTriangle = "closed";
    }
    else {
        var string = window.location.href + "images/openTriangle.png";
        document.getElementById('img').src = string;
        firstTriangle = "open";
    }
}

function flipSecond() {

    if(secondTriangle == "open") {
        var string = window.location.href + "images/closedTriangle.png";
        document.getElementById('img2').src = string;
        secondTriangle = "closed";
    }
    else {
        var string = window.location.href + "images/openTriangle.png";
        document.getElementById('img2').src = string;
        secondTriangle = "open";
    }
}

function toggleBoth() {
    flipFirst();
    flipSecond();
}

//gets search criteria and calls manuscriptOptions
function searchByCriteria(divID) {

    document.getElementById('letterTable').innerHTML = ' <span id="hidden">---Placeholder---</span>  ';
    document.getElementById('img').src = "images/closedTriangle.png";
    firstTriangle = "closed"

    setUpAjax(divID);

    //pulls date variables from form
    var firstDate = document.getElementById('earliest').value;
    var secondDate = document.getElementById('latest').value;

    //sort Alphabetically or Numerically:
    var sort = document.getElementsByName("sort");
    for(var i = 0; i < sort.length; i++) {
        if(sort[i].checked == true) {
            var sortChoice = sort[i].value;
        }
    }

    //find whether manuscripts without dates should be included
    var dates = document.getElementById("dates");
    var onlyDated = dates.checked;

    //manufactures a range
    if(firstDate == "") {
        firstDate = 0;
    }
    if(secondDate == "") {
        secondDate = 1000000;
    }

    //creates query string to send
    var queryString = "?firstDate=" + firstDate+  "&secondDate=" + secondDate + "&onlyDated=" + onlyDated + "&sortChoice=" + sortChoice;

    //uses AJAX to call manuscriptOptions.php, sending query string
    AJAX.open("GET", "php/manuscriptOptions.php" + queryString, true);
    AJAX.send(null);
}

function processData() {

    document.getElementById('letterTable').innerHTML = ' <span id="hidden">---Placeholder---</span>  ';

    //change triangle
    var string = window.location.href + "images/closedTriangle.png";
    document.getElementById('img2').src = string;
    secondTriangle = "closed";

    var layoutType = "table";
    var layoutOptions = document.getElementsByName("layout");
    for(var i = 0; i < layoutOptions.length; i++) {
        if(layoutOptions[i].checked == true) {
            layoutType = layoutOptions[i].value;
        }
    }

    var imageStyle = getImageChoice();
    var sizeChoice = getImageSize();

    var chosenManuscripts = getChosenValuesFromList("manuscripts");
    var chosenLetters = getChosenValuesFromList("letters");

    if(chosenLetters.length > 0 && chosenManuscripts.length > 0) {
        if(layoutType == "table" ) {
            generateTable(sizeChoice, imageStyle);
        }
        else {
            generateFlow(sizeChoice, imageStyle);
        }
    }
    else {
        document.getElementById('letterTable').innerHTML = '<h4> Error: Incorrect selection </h4>  ';
    }


}

function getImageChoice() {
    var images = document.getElementsByName("images");
    var imageChoice = "raw"; //set default value
    //finds selected radio button (bw or color)
    for(var i = 0; i < images.length; i++) {
        if(images[i].checked == true) {
            imageChoice = images[i].value;
        }
    }

    return imageChoice;
}

function getImageSize() {
    //determines size of images, default is medium (200px)
    var sizes = document.getElementsByName("size");
    var sizeChoice = "small"; //set default value
    //finds selected radio button (bw or color)
    for(var i = 0; i < sizes.length; i++) {
        if(sizes[i].checked == true) {
            sizeChoice = sizes[i].value;
        }
    }

    return sizeChoice;
}

function getImageScaledSize(letter, sizeChoice) {

//    var vars = [{key:"alpha", value:"12"}];

//    var blah = {key: value, key2: value2}; // make a new dictionary with two pairs
//    then
//
//    blah.key3 = value3; // add a new key/value pair
//    blah.key2; // returns value2
//    blah['key2']; // also returns value2

    var letterScales = {"Alaph (Round)": 1,
                        "Alaph (Angular)": 1,
                        "Beth": .5,
                        "Gamal": 1,
                        "Dalath (Round)": .5,
                        "Dalath (Angular)": .5,
                        "He (Angular)": .5,
                        "He (Round)": .5,
                        "Waw": .5,
                        "Zain":.5,
                        "Heth": .5,
                        "Teth": 1.5,
                        "Yudh (Connected)": .5,
                        "Yudh (Stand-alone)": .5,
                        "Kaph": .5,
                        "Kaph (Final)":.5,
                        "Lamadh": 1,
                        "Lamadh (Final, open)" : 1,
                        "Lamadh (Final, closed)" : 1,
                        "Mim": .5,
                        "Mim (Final)": .5,
                        "Nun": .5,
                        "Nun (Final, connected)": 1,
                        "Nun (Final, unconnected)": 1,
                        "Semkath": .5,
                        "Ayin": .5,
                        "Ayin (Final, closed)": .5,
                        "Ayin (Final, open)": .5,
                        "Pe": .5,
                        "Sadhe" : 1,
                        "Qaph" : .5,
                        "Rish (Angular)" : .5,
                        "Rish (Round)" : .5,
                        "Shin" : .5,
                        "Taw (L-shaped)" : 1,
                        "Taw (Looped)" : 1,
                        "Taw (Triangular)" : 1};


    console.log(letter);
    console.log(letterScales[letter]);


    //set height to x, multiply by scaleFactor
    var scaleFactor = letterScales[letter];
    var width;

    if (scaleFactor == null) {
        scaleFactor = 1;
    }

    if(sizeChoice=="small") {
        width = 40*scaleFactor;
    }
    else if (sizeChoice =="medium") {
        width = 55*scaleFactor;
    }
    else {
        width = 70*scaleFactor;
    }

    return width;
}

//generates table of images based on chosen manuscripts
function generateTable(sizeChoice, imageChoice){

    //pulls selected manuscripts and creates array chosenManuscripts
    var chosenManuscripts = getChosenValuesFromList("manuscripts");

    //pulls letters and creates array chosenLetters
    var chosenLetters = getChosenValuesFromList("letters");

    //create the table with manuscrips, letters, and images
    document.getElementById('letterTable').innerHTML = '  ';
    chosenManuscripts.splice(0, 0, ""); //formatting
    var body = document.getElementById('letterTable');
    var tableDiv = document.createElement('div');
    tableDiv.style.width = "100%";
    tableDiv.style.height = "100%";
    tableDiv.style.overflow = "scroll";
    var tbl  = document.createElement('table');
    tbl.style.border = "1px solid black";

    var tableHead  = document.createElement('thead');
    var tableBody = document.createElement('tbody');
    for(var k = 0; k < chosenManuscripts.length; k++) {
        var th = document.createElement("th");
        th.style.border = "1px solid black";
        

        var title = chosenManuscripts[k] + " ";
        var name = title.slice(0, title.indexOf(":"));
        var date = title.slice(title.indexOf(":")+2);

        //regex that searches for first number
        var search = name.search(/\d/);
        var shelfmark = name.substring(search);
        var manuscript = name.substring(0,search);

        // bold date unbold name
        var tableDate = document.createTextNode(date);
        var spanTableDate = document.createElement('span');
        spanTableDate.style.fontWeight = "bold";
        spanTableDate.appendChild(tableDate);

        var tablemanu = document.createTextNode(manuscript);
        var tableshelf = document.createTextNode(shelfmark);
        var spanInfo = document.createElement('div');
        spanInfo.style.fontWeight = "normal";
        spanInfo.appendChild(tablemanu);
        spanInfo.appendChild(document.createElement('br'));
        spanInfo.appendChild(tableshelf);

        // margin and even width of column
        spanInfo.style.width = "119px";

        th.appendChild(spanInfo);
        //th.appendChild(document.createElement('br'));

        //th.appendChild(document.createTextNode(shelfmark));
        th.appendChild(document.createElement('br'));

        th.appendChild(spanTableDate);

        th.style.textAlign = "center";
        
    

        //tbl.appendChild(th);

        tableHead.appendChild(th);
    }
    
    tableHead.style.background = "#B8C1C8";
    tableHead.style.zIndex="2";
    tableHead.style.display="block";

    tbl.appendChild(tableHead);
    for(var i = 0; i < chosenLetters.length; i++) {
        //var tr = tbl.insertRow();
        var tr = tableBody.insertRow();
        //letter names
        var td2 = tr.insertCell();
        td2.style.border = "1px solid black";
        td2.appendChild(document.createTextNode(chosenLetters[i]));
        td2.style.width= "120px";
        tr.appendChild(td2);

        for(var j = 0; j < chosenManuscripts.length; j++){
            if(j != 0) {
                var str = chosenManuscripts[j];
                var res = str.split(":");

                //creates fileName to pull image
                var imageSrc = "images/" + imageChoice + "/" + chosenLetters[i] + "_" + res[0] + ".png";

                var td = tr.insertCell();

                var img = document.createElement("img");
                td.style.position = "relative";

                img.setAttribute("alt", chosenLetters[i]);

                img.onload = function() {

                    var letterName = this.getAttribute("alt");
                    var sizeChoice = getImageSize();

                    var width = getImageScaledSize(letterName, sizeChoice);
                    
                    this.width = width;
                };

                img.onerror = function() {
                    this.onerror = null;
                    this.src = "images/noImage.png";
                };

                img.onmousedown = function() {
                    var obj = this;

                    var letterName = this.getAttribute("alt");
                    var sizeChoice = getImageSize();

                    width = getImageScaledSize(letterName, sizeChoice);

                    obj.style.top = "0px";
                    obj.style.left = "0px";
                    obj.style.position = "absolute";
                    obj.style.width = (2*width)+"px"; //2*width;
                    obj.style.zIndex = 1;
                    obj.style.border = "5px silver outset";
                };

                img.onmouseup = function() {
                    var obj = this;

                    var letterName = this.getAttribute("alt");
                    var sizeChoice = getImageSize();

                    width = getImageScaledSize(letterName, sizeChoice);

                    obj.style.width = width+"px"; //width/2;
                    obj.style.zIndex = 0;
                    obj.style.position = "static";
                    obj.style.border = "0px";
                };


                img.setAttribute('src', imageSrc);
                //img.style.width= "100%";
                

                td.appendChild(img);
                td.style.border = "1px solid black";
                td.style.textAlign = "center";
                // fixed head (img does not cover head)
                td.style.zIndex="1";
                td.style.width= "120px";
            }
        }
        //tableBody.appendChild(tr);
    }
    // fixed head and inner scroll
    tableBody.style.display="block";
    tableBody.style.overflow="auto";
    tableBody.style.height ="500px";
   
    //alert(tableBody.style.overflow);
    tbl.appendChild(tableBody);
    tableDiv.appendChild(tbl);
    body.appendChild(tableDiv);

}

function generateFlow(sizeChoice, imageChoice) {

    //change triangle
    var string = window.location.href + "images/closedTriangle.png";
    document.getElementById('img2').innerHTML = string;
    secondTriangle = "closed";

    //pulls selected manuscripts and creates array chosenManuscripts
    var chosenManuscripts = getChosenValuesFromList("manuscripts");

    //pulls letters and creates array chosenLetters
    var chosenLetters = getChosenValuesFromList("letters");

    var body = document.getElementById('letterTable');
    var tableDiv = document.createElement('div');

    for (var i = 0; i < chosenManuscripts.length; i++) {
        for(var j = 0; j < chosenLetters.length; j++ ){
            var div = document.createElement("div");
            div.style.display = "inline-block";
            div.style.borderRight = "solid";
            div.style.padding = "10px";


            var title = chosenManuscripts[i] + " ";
            var name = title.slice(0, title.indexOf(":"));
            
            var date = title.slice(title.indexOf(":")+2);

            var manuscriptName = document.createTextNode(name);
            var lineBreak = document.createElement("br");
            var manuscriptDate = document.createTextNode(date);
            var secondLineBreak = document.createElement("br");
            var letterName = document.createTextNode(chosenLetters[j]);
            var thirdLineBreak = document.createElement("br");

            // the dates should be in bold
            var spanDate = document.createElement('span');
            spanDate.style.fontWeight = "bold";
            spanDate.appendChild(manuscriptDate);

            var str = chosenManuscripts[i];
            var res = str.split(":");

            //creates fileName to pull image
            var imageSrc = "images/" + imageChoice + "/" + chosenLetters[j] + "_" + res[0] + ".png";

            var img = document.createElement("img");

            img.onload = function() {
                var width = this.clientWidth;
                //set height to x, multiply by scaleFactor
                var scaleFactor = 2;

                if(sizeChoice=="small") {
                    this.width = 25*scaleFactor;
                }
                else if (sizeChoice =="medium") {
                    this.width = 40*scaleFactor;
                }
                else {
                    this.width = 50*scaleFactor;
                }
            };

            img.setAttribute('src', imageSrc);

            img.onerror = function() {
                this.onerror = null;
                this.src = "images/noImage.png";
            };


            div.appendChild(manuscriptName);
            div.appendChild(lineBreak);
            div.appendChild(spanDate);
            div.appendChild(secondLineBreak);
            div.appendChild(letterName);
            div.appendChild(thirdLineBreak);
            div.appendChild(img);

            div.style.textAlign = "center";
            div.style.width = "180px";

            tableDiv.appendChild(div);
            body.appendChild(tableDiv);
        }
    }
}

//function that selects all elements in a particular div (must be multi select box)
function selectAll(div) {
    var m = document.getElementById(div);
    for (var i = 0; i < m.options.length; i++) {
        m.options[i].selected = true;
    }
}

//returns an array of chosen values
function getChosenValuesFromList(divID) {
    var chosenItems = [];
    var itemDropDown = document.getElementById(divID);
    for (var i = 0; i < itemDropDown.options.length; i++) {
        if (itemDropDown.options[i].selected == true) {
            var itemName = itemDropDown.options[i].value;
            chosenItems.push(itemName);
        }
    }

    return chosenItems;
}

function checkInput(divID) {
    var input = document.getElementById(divID);
    //if matches not a number
    if (input.value.match(/\D/i)){
        // something besides a number found
        console.log("Incorrect Input");
        input.placeholder = "Please enter a number";
        input.value = "";
    }
}
