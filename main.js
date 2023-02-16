song = "";
objects = [];
status = "";

function preload(){
    song = loadSound('JOE BABY.mp3'); 
}
function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects"
}
function modelLoaded(){
    console.log("model loaded")
    status = true;
   
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status!=""){
        objectDetector.detect(video, gotResult);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status: objects detected";
            fill("purple");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15); 
            noFill();
            stroke("purple");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person"){
                document.getElementById("no_of_objects").innerhtml = "person found"
                song.stop();
            }
            else{
                document.getElementById("no_of_objects").innerhtml = "person not found"
                song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("no_of_objects").innerhtml = "person not found"
                song.play();
        }
    }
}