var socket;
var sword;

var button1, button2, button3, button4, button5;
var circleSize;

function setup() {
  createCanvas(1200, 800);
  background(100,200,255);
  socket = io.connect('http://localhost:3000');

  //broadcast handling
  socket.on('channel', newDrawing);

  circleSize = 20;
  button1 = select('#pic1');
  button2 = select('#pic2');
  button3 = select('#pic3');
  button4 = select('#pic4');
  button5 = select('#pic5');

}

function newDrawing(data){
ellipse(data.x,data.y,55,55);
}

function draw() {
 sword = loadImage('pics/sword.png');

 
  circle(width/2, height/2,20);
}

function mouseDragged(){

  ellipse(mouseX, mouseY,25,25);

//enables communication between clients
  var data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('channel', data);

}
