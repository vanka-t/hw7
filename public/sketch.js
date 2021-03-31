var socket;
var sword;

var button1, button2, button3, button4, button5, clearButton;
var circleSize;

var slider1;
var slider2;
var slider3;
var sliderScale;

var heartz = [];
var heart;

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
  
  //socket = io.connect('https://localhost:3000');
   socket = io.connect('https://hw7-drawing-time.herokuapp.com/');

  //broadcast handling
  socket.on('channel', newDrawing);
  socket.on('pixel', newStamp);
  socket.on('heartt', function(){
    strokeWeight(2);
    for (var i=1; i<20;i++){
      push();
      heart();
      translate(mouseX*i,mouseY);
    }
  });

  socket.on('clear', function(){
    background(mouseY,mouseX,255);
  });

  circleSize = 20;
  // button1 = select('#pic1');
  // button2 = select('#pic2');
  // button3 = select('#pic3');
  // button4 = select('#pic4');
  // button5 = select('#pic5');
  clearButton = select('#clear');


 
  // button1.mousePressed(newHeartDrawing);
  // button2.mousePressed(newDrawing);
  // button3.mousePressed(newStamp);
  // button4.mousePressed(changetoPic4);
  clearButton.mousePressed(clearAll);
  // button5.mousePressed(changetoPic5);


  var yy =70 //posY for sliders
  //color red slider
  var redName = createElement ( 'h5', 'Red saturation:' );
  fill(0);
  redName.addClass ( 'labelColor' );
  redName.position ( width+60, yy );

  slider1 = createSlider(0,x,x/2);
  slider1.position(width+40, yy+10);

  //color green slider
  var greenName = createElement ( 'h5', 'Green saturation:' );
  fill(0);
  greenName.addClass ( 'labelColor' );
  greenName.position ( width+60, yy+40 );
  slider2 = createSlider(0,x,x/2);
  slider2.position(width+40, yy+50);


 //color blue slider
 var blueName = createElement ( 'h5', 'Blue saturation:' );
 fill(0);
 blueName.addClass ( 'labelColor' );
 blueName.position ( width+60, yy+80 );

  slider3 = createSlider(0,x,x/2);
  slider3.position(width+40, yy+90);


 //sizing scale slider
 var scaleName = createElement ( 'h5', 'Stroke size:' );
 fill(0);
 scaleName.addClass ( 'labelSize' );
 scaleName.position ( width+70, yy+140 );
  sliderScale = createSlider(0,2.5);
  sliderScale.position(width+40, yy+150);

}




function changetoPic3(){
  circleSize = 100;
}

function changetoPic4(){
  circleSize = 150;
}

function clearAll() {
    background(random(500),random(500),255);
    socket.emit('clear');
  
}

function newHeartDrawing(){
  strokeWeight(2);
  for (var i=1; i<20;i++){
    push();
    heart();
    translate(mouseX*i,mouseY);
  }
  
  
  socket.emit('heartt');

}


function newDrawing(data){
  fill(data.colorz1,data.colorz2,data.colorz3,1);
ellipse(data.x, data.y, data.slidersc, data.lol);

  socket.emit('channel', data);
}

function newStamp(data){
  //fill(mouseX,mouseY,mouseX,1);
image(sword, data.x, data.y, data.slidersc, data.slidersc);

  socket.emit('pixel', data);
}

function heart(){
	noStroke();
    	h = 0;
	g = 0;
			beginShape();
	curveVertex(this.h+1,this.g+3);
	curveVertex(this.h+1,this.g+3);
	curveVertex(this.h+5,this.g);
	curveVertex(this.h+9,this.g+4);
	curveVertex(this.h+10,this.g+5); //middle top part of heart
	curveVertex(this.h+11,this.g+4);
	curveVertex(this.h+15,this.g);
	curveVertex(this.h+20,this.g+3);
	curveVertex(this.h+18,this.g+12);
	curveVertex(this.h+10,this.g+22); //middle bottom part
	curveVertex(this.h+3,this.g+12);
	curveVertex(this.h+1,this.g+3);
	curveVertex(this.h+1,this.g+3);
	endShape();
	}

function draw() {


  rect(0, 0,width, 10);

noStroke();
     


}

// function mouseDragged(){
  

//   ellipse(mouseX, mouseY,sliderScale.value(),sliderScale.value());
//   fill(slider1.value(), slider2.value(),slider3.value());

//   //enables communication between clients
//   var data = {
//     x: mouseX,
//     y: mouseY,
//     size: circleSize,
//     colorz1: slider1.value(),
//     colorz2: slider2.value(),
//     colorz3: slider3.value(),
//     slidersc: sliderScale.value()
//   }

//   socket.emit('channel', data);

// }

function mouseDragged() {
  fill(slider1.value(), slider2.value(),slider3.value());

    push();
    heart();
    scale(sliderScale.value())
  
    translate(mouseX,mouseY);
  
    // ellipse(mouseX, mouseY,sliderScale.value(),random(50));
  
  
  var data = {
    x: mouseX,
    y: mouseY,
    img: 1,
    size: circleSize,
    colorz1: slider1.value(),
    colorz2: slider2.value(),
    colorz3: slider3.value(),
    slidersc: sliderScale.value(),
    lol: random(50)
  }

  socket.emit('heartt', data);
  socket.emit('channel', data);
}

function mousePressed() {

}

function mouseClicked() {
  image(sword, mouseX, mouseY); //make it fade away

  var data = {
    x: mouseX,
    y: mouseY,
    img: 1,
    size: circleSize,
    colorz1: slider1.value(),
    colorz2: slider2.value(),
    colorz3: slider3.value(),
    slidersc: sliderScale.value()

  }

  socket.emit('pixel', data);
}


