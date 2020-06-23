var canvas;
var drawing=[];
var currentPath=[];
var database;
var isDrawing=false;

function setup(){

    canvas=createCanvas(1246,720);
    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);

    database=firebase.database();
    //database.ref()
}

function draw(){

    background("white");
    stroke("red");
    strokeWeight(12);
    noFill();

    for(var i=0;i<drawing.length;i++){
        path=drawing[i];
        beginShape();
        for (var j=0;j<path.length;j++){
            vertex(path[j].x,path[j].y);
        }
        endShape();
    }

    //save button
    var button=createButton("SAVE");
    button.position(500,760);
    button.size(100,50);
    button.mousePressed(saveDrawing);

    //clear button
    var button1=createButton("CLEAR");
    button1.position(650,760);
    button1.size(100,50);
    button1.mousePressed(clearDrawing);
    
}

function startPath(){
    isDrawing=true;
    currentPath=[];
    drawing.push(currentPath);
}

function endPath(){
    isDrawing=false;
}

function mouseDragged(){

    if(isDrawing){
        var point={
            x:mouseX,
            y:mouseY
        }
        currentPath.push(point);
    }
}

function saveDrawing(){
    var ref=database.ref("drawings");

    var data={
        name:name,
        drawing:drawing
    }

    ref.push(data);
}

function clearDrawing(){
    drawing=[];
}