var socket;
var sword;

var button1, button2, button3, button4, button5;
var circleSize;

var slider1;
var slider2;
var slider3;

var shapes =[];

var x = 900; //for color


console.log("success");

function preload(){
  sword = loadImage('picz/sword.png');
  //pic1 = loadImage('picz/');
}

function setup() {
  createCanvas(1200, 800);
  background(mouseY,mouseX,255);
  colorMode(RGB, x, x, 255, 1);
  
  socket = io.connect('https://localhost:3000');
  // socket = io.connect('https://hw7-drawing-time.herokuapp.com/');

  //broadcast handling
  socket.on('channel', newDrawing);
  socket.on('pixel', newPixelDrawing);
  socket.on('clear', function(){
    background(mouseY,mouseX,255);
  });

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


  slider1 = createSlider(0,x,x/2);
  slider2 = createSlider(0,x,x/2);
  slider3 = createSlider(0,x,x/2);

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
  fill(data.colorz1, data.colorz2,data.colorz3);

  if (data.img == 1){
    
    image(sword, data.x, data.y, data.size, data.size);
  }
}

function newDrawing(data){
  fill(mouseX,mouseY,mouseX,1);
ellipse(data.x, data.y, data.size, data.size);
}

function draw() {
  
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
  fill(slider1.value(), slider2.value(),slider3.value());


  var data = {
    x: mouseX,
    y: mouseY,
    img: 1,
    colorz1: slider1.value(),
    colorz2: slider2.value(),
    colorz3: slider3.value()
  }

  socket.emit('pixel', data);
}


function keyPressed() {
  if(keyCode == ENTER){
    background(mouseY,mouseX,255);

    socket.emit('clear');
  }
}