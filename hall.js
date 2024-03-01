img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("hall.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    status = true;
    console.log("Model Loaded")
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        objectDetector.detect(img, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "The Model has detected " + objects.length + " objects.";

            fill("#d9a215");
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#d9a215");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function back() {
    window.location = "index.html";
}