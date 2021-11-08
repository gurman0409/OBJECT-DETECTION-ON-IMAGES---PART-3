status = "";
objects = [];
function preload()
{
    img = loadImage("curtains.jpg");
}
function setup()
{
  canvas = createCanvas(550,500);
  canvas.center();
  ObjectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded()
{
  console.log("modelLoaded");
  status = true;
  ObjectDetector.detect(img, gotResults)
}

function gotResults(error, results)
{
  if (error){
    console.log(error);
  } else {
    console.log(results);
    objects = results;
  }
}

function draw()
{
    image(img,0,0,550,500);

   
    if (status != "")
    {
      document.getElementById("status").innerHTML = "Status : Objects detected";
      for (i = 0; i < objects.length; i++) {
        fill("#ff0404");
        percent = floor(objects[i].confidence * 100);
        text( objects[i].label + " " + percent + " % " , objects[i].x , objects[i].y );
        noFill();
        stroke('#ff0404');
        rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height );
      }
    }
}