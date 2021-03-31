var socket;
var sword;

var button1, button2, button3, button4, button5;
var circleSize;

var slider;

console.log("success");

function preload(){
  sword = loadImage('picz/sword.png');
  //pic1 = loadImage('picz/');
}

function setup() {
  createCanvas(1200, 800);

  colorMode(RGB, 900, 900, 255, 1);
  

  socket = io.connect('http://localhost:3000');

  //broadcast handling
  socket.on('channel', newDrawing);
  socket.on('pixel', newPixelDrawing);

  circleSize = 20;
  button1 = select('#pic1');
  button2 = select('#pic2');
  button3 = select('#pic3');
  button4 = select('#pic4');
  button5 = select('#pic5');

  button1.mousePressed(changetoPic1);
  button2.mousePressed(changetoPic2);
  button3.mousePressed(changetoPic3);
  button4.mousePressed(changetoPic4);
  // button5.mousePressed(changetoPic5);


  slider = createSlider(0,360,0);
}

function changetoPic1(){
circleSize = 5;
}

function changetoPic2(){
  circleSize = 50;
}

function changetoPic3(){
  circleSize = 100;
}

function changetoPic4(){
  circleSize = 150;
}

function newPixelDrawing(data){
  fill(data.colorz, 100,100);
  if (data.img == 1){
    
    image(sword, data.x, data.y, data.size, data.size);
  }
}

function newDrawing(data){
ellipse(data.x, data.y, data.size, data.size);
}

function draw() {
  background(mouseY,mouseX,255);
  image(sword, mouseX, mouseY); //make it fade away
 
  circle(width/2, height/2,20);
}

function mouseDragged(){
  

  ellipse(mouseX, mouseY,circleSize,circleSize);

//enables communication between clients
  var data = {
    x: mouseX,
    y: mouseY,
    size: circleSize
    
  }

  socket.emit('channel', data);

}

function mouseClicked() {
  fill(slider.value(), 100,100);

  var data = {
    x: mouseX,
    y: mouseY,
    img: 1,
    colorz: slider.value()
  }

  socket.emit('pixel', data);
}