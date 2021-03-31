var socket;


function setup() {
  createCanvas(1200, 800);
  background(100,200,255);
  socket = io.connect('http://localhost:3000');
}

function draw() {
 
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
