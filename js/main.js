var AJAX;
var DEBUG = false;
var firstTriangle = "open";
var secondTriangle = "open";

// for searching alternative for different forms of same letters
var twoAlt ={
    "Alaph (Round)":"Alaph (Angular)",
    "Alaph (Angular)":"Alaph (Round)",
    "Dalath (Round)": "Dalath (Angular)",
    "Dalath (Angular)":"Dalath (Round)",
    "He (Angular)": "He (Round)",
    "He (Round)":"He (Angular)",
    "Yudh (Connected)":"Yudh (Stand-alone)",
    "Yudh (Stand-alone)":"Yudh (Connected)",
    "Kaph":"Kaph (Final)",
    "Kaph (Final)":"Kaph",
    "Mim": "Mim (Final)",
    "Mim (Final)":"Mim",
    "Rish (Angular)":"Rish (Round)",
    "Rish (Round)":"Rish (Angular)"

};

var thrAlt={
    "Lamadh":["Lamadh (Final, open)","Lamadh (Final, closed)"],
    "Lamadh (Final, open)":["Lamadh","Lamadh (Final, closed)"],
    "Lamadh (Final, closed)":["Lamadh","Lamadh (Final, open)"],
    "Ayin":["Ayin (Final, closed)","Ayin (Final, open)"],
    "Ayin (Final, closed)":["Ayin","Ayin (Final, open)"],
    "Ayin (Final, open)":["Ayin (Final, closed)","Ayin"],
    "Nun":["Nun (Final, connected)","Nun (Final, unconnected)"],
    "Nun (Final, connected)":["Nun","Nun (Final, unconnected)"],
    "Nun (Final, unconnected)":["Nun (Final, connected)","Nun"],
    "Taw (L-shaped)":["Taw (Looped)","Taw (Triangular)"],
    "Taw (Looped)":["Taw (L-shaped)","Taw (Triangular)"],
    "Taw (Triangular)":["Taw (Looped)","Taw (L-shaped)"]
}
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
    var dates = document.getElementsByName("dates");
    //var onlyDated = dates.checked;
    // change to radio 
    for(var i = 0; i < dates.length; i++) {
        if(dates[i].checked == true) {
            var dateType = dates[i].value;
        }
    }

    //manufactures a range
    if(firstDate == "") {
        firstDate = 0;
    }
    if(secondDate == "") {
        secondDate = 1000000;
    }

    //creates query string to send
    //var queryString = "?firstDate=" + firstDate+  "&secondDate=" + secondDate + "&onlyDated=" + onlyDated + "&sortChoice=" + sortChoice;
    var queryString = "?firstDate=" + firstDate+  "&secondDate=" + secondDate + "&dateType=" + dateType + "&sortChoice=" + sortChoice;
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

    //var imageStyle = getImageChoice();
    // just binary
    var imageStyle = "binaryrep";
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

// scale zaynes, all the versions of yod, and the non-final nuns to be about 30% smaller
function getImagePixelSize(sizeChoice,letter) {
    //get the size in pixel : 120,160,200
    // make all of them smaller: 100 120 160
    var chosenWidth=0;
    var scalegroup=["Zain","Nun","Yudh (Connected)","Yudh (Stand-alone)"];
    var scale=1;
    if(scalegroup.indexOf(letter)!=-1){
        scale=0.75;
    }
    // set up size for sizechoice
    if(sizeChoice=="small") {
        //width = 40*scaleFactor;
        chosenWidth = 100*scale;
    }
    else if (sizeChoice =="medium") {
        chosenWidth = 120*scale;
    }
    else {
        chosenWidth = 160*scale;
        //width = 55*scaleFactor;
    }

    return chosenWidth;
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
    //var scaleFactor = 10;
    if (scaleFactor == null) {
        scaleFactor = 1;
    }

    if(sizeChoice=="small") {
        //width = 40*scaleFactor;
        width = 55*scaleFactor;
    }
    else if (sizeChoice =="medium") {
        width = 55*scaleFactor;
    }
    else {
        width = 70*scaleFactor;
        //width = 55*scaleFactor;
    }

    return width;
}

// test if src excists
function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}

//generates table of images based on chosen manuscripts
function generateTable(sizeChoice, imageChoice){
    //pulls selected manuscripts and creates array chosenManuscripts
    var chosenManuscripts = getChosenValuesFromList("manuscripts");

    //pulls letters and creates array chosenLetters
    var chosenLetters = getChosenValuesFromList("letters");

    var chosenWidth=getImagePixelSize(sizeChoice);
    
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
        //spanInfo.style.width = "119px";
        spanInfo.style.width = (chosenWidth-1)+"px";

        th.appendChild(spanInfo);
        //th.appendChild(document.createElement('br'));

        //th.appendChild(document.createTextNode(shelfmark));
        th.appendChild(document.createElement('br'));

        th.appendChild(spanTableDate);

        th.style.textAlign = "center";
        
    

        //tbl.appendChild(th);

        tableHead.appendChild(th);
    }
    
    //tableHead.style.background = "#B8C1C8";
    tableHead.style.background = "#F5DEB3";

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
        //td2.style.width= "120px";
        //td2.style.height= "100px";
        td2.style.width=chosenWidth+"px";
        td2.style.height= chosenWidth+"px";
        td2.style.textAlign = "center";
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
                //set up for alternative
                img.setAttribute("class", res[0]);

                img.onload = function() {

                    var letterName = this.getAttribute("alt");
                    var sizeChoice = getImageSize();

                    var width =getImagePixelSize(sizeChoice,letterName);
                    
                    //this.width = width;
                    // img has same size
                    //this.width = '80';
                    //this.height='80';
                    
                    this.width = (width-40);
                    this.height=(width-40);
                };

                img.onerror = function() {
                    this.onerror = null;
                    //this.src = "images/noImage.png";
                    // handle different forms of letters
                    var letterName = this.getAttribute("alt");
                    var imgClass = this.getAttribute("class");
                    if(letterName in twoAlt){
                        /**try{
                            var altSrc = "images/" + "binaryrep" + "/" + twoAlt[letterName] + "_" + imgClass + ".png";
                            var altImg=new Image();
                            altImg.src=altSrc;
                            this.src="images/hasAlt.png";
                        }
                        catch(e){
                            this.src = "images/noImage.png";
                            
                        }*/
                        var altSrc = "images/" + "binaryrep" + "/" + twoAlt[letterName] + "_" + imgClass + ".png";
                        if(imageExists(altSrc)){
                            this.src="images/hasAlt.png";
                        }
                        else{
                            this.src = "images/noImage.png";
                        }
                    }
                    else if (letterName in thrAlt){
                        var altSrc1 = "images/" + "binaryrep" + "/" + thrAlt[letterName][0] + "_" + imgClass + ".png";
                        var altSrc2 = "images/" + "binaryrep" + "/" + thrAlt[letterName][1] + "_" + imgClass + ".png";

                        if(imageExists(altSrc1)||imageExists(altSrc2)){
                            this.src="images/hasAlt.png";
                        }
                        else{
                            this.src = "images/noImage.png";
                        }
                    }
                    else{
                        this.src = "images/noImage.png";
                    }
                };

                img.onmousedown = function() {
                    var obj = this;

                    var letterName = this.getAttribute("alt");
                    var sizeChoice = getImageSize();

                    //width = getImageScaledSize(letterName, sizeChoice);

                    obj.style.top = (-(chosenWidth-40)/4)+"px";
                    obj.style.left = (-(chosenWidth-40)/4)+"px";
                    obj.style.position = "absolute";
                    obj.style.width = (2*(chosenWidth-40))+"px"; //2*width;
                    obj.style.height = (2*(chosenWidth-40))+"px";
                    //alert(obj.style.height);
                    obj.style.zIndex = 10;
                    obj.style.border = "5px silver outset";
                    // make sure be above other img
                    obj.parentNode.style.zIndex = 10;
                };

                img.onmouseup = function() {
                    var obj = this;

                    var letterName = this.getAttribute("alt");
                    var sizeChoice = getImageSize();

                    //width = getImageScaledSize(letterName, sizeChoice);

                    //obj.style.width = width+"px"; //width/2;
                    //obj.style.width = "80px";
                    //obj.style.height = "80px";
                    var wid=getImagePixelSize(sizeChoice,letterName);
                    
                    obj.style.width = (wid-40)+"px";
                    obj.style.height = (wid-40)+"px";
                    alert(obj.style.height);
                    obj.style.zIndex = 1;
                    obj.parentNode.style.zIndex = 1;
                    obj.style.position = "static";
                    obj.style.border = "0px";
                };


                img.setAttribute('src', imageSrc);
                //img.style.width= "1";
                

                td.appendChild(img);
                td.style.border = "1px solid black";
                td.style.textAlign = "center";
                // fixed head (img does not cover head)
                td.style.zIndex="1";
                td.style.width= (chosenWidth)+"px";
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
            img.setAttribute("alt", chosenLetters[j]);
            img.setAttribute('src', imageSrc);
            img.setAttribute("class", res[0]);
            img.onload = function() {
                //var width = this.clientWidth;
                //set height to x, multiply by scaleFactor
                var letterName = this.getAttribute("alt");
                //var sizeChoice = getImageSize();
                var width =getImagePixelSize(sizeChoice,letterName);
                var scaleFactor = 2;
                this.width=width-40;
                this.height=width-40;


            };

            

            img.onerror = function() {
                //this.onerror = null;
                //this.src = "images/noImage.png";
                //handle alternative form
                var letterName = this.getAttribute("alt");
                var imgClass = this.getAttribute("class");

                    if(letterName in twoAlt){
                       
                        var altSrc = "images/" + "binaryrep" + "/" + twoAlt[letterName] + "_" + imgClass + ".png";
                        if(imageExists(altSrc)){
                            this.src="images/hasAlt.png";
                        }
                        else{
                            this.src = "images/noImage.png";
                        }
                    }
                    else if (letterName in thrAlt){
                        var altSrc1 = "images/" + "binaryrep" + "/" + thrAlt[letterName][0] + "_" + imgClass + ".png";
                        var altSrc2 = "images/" + "binaryrep" + "/" + thrAlt[letterName][1] + "_" + imgClass + ".png";

                        if(imageExists(altSrc1)||imageExists(altSrc2)){
                            this.src="images/hasAlt.png";
                        }
                        else{
                            this.src = "images/noImage.png";
                        }
                    }
                    else{
                        this.src = "images/noImage.png";
                    }
            };


            div.appendChild(manuscriptName);
            div.appendChild(lineBreak);
            div.appendChild(spanDate);
            div.appendChild(secondLineBreak);
            div.appendChild(letterName);
            div.appendChild(thirdLineBreak);
            div.appendChild(img);

            div.style.textAlign = "center";
            div.style.width = "200px";

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
