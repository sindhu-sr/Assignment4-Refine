
var song1;
var song2;
//Grow and Shrink
let centerBoxGrowShrink = 50;
let growth = 1;

// Box dissappears
let boxColor = 255;
let colorChange = 1;
let bgColor = 0;
let rectSize = 1;
let lineAngle = 1;
let x = 0; //squarespeed
let logoSize = 1;
let xPosBeforeClicked = 0
let mouseClicked = false //Mouse clicked status


function preload(){
  song1=loadSound("sound1.mp3");
  song2=loadSound("sound2.mp3")
}

function setup() {
    createCanvas(600, 600);
    angleMode(DEGREES);
}
function mousePressed(){
  mouseClicked = true
  if (song1.isPlaying()){song1.stop()}
  song2.play();
}

function draw() {
	background(255);

	if(mouseClicked == false) {
		beforeMouseClickedDraw()
	} else {
		afterMouseClickedDraw()
	}
}

function afterMouseClickedDraw() {
	//Center ellipses growing full screen
	push();
	fill(0);
	y = 325;
	for(let i = 0; i < 5; i++) {
		ellipse(300, y, logoSize + 8, logoSize + 8);
		y = y - 12;
		logoSize = logoSize + 0.1;
	}
	pop();

	//Red rect rotate
	push();
	fill(150, 0, 0);
	rectMode(CENTER);
	translate(width / 2, height / 2);
	translate(p5.Vector.fromAngle(millis() / 1000, 240));
	if(rectSize < 400) {
		rect(0, 0, rectSize + 10, rectSize + 10, 25);
		rectSize = rectSize + 1;
	} else {
		rectSize = rectSize * -1;
	}
	pop();

	//Center box color change
	if(boxColor > 255 || boxColor < bgColor) {
		colorChange = -colorChange;
	}
	boxColor = boxColor + colorChange;
	fill(boxColor);
	if(centerBoxGrowShrink > 200 || centerBoxGrowShrink < 2.5) {
		growth = growth * -1;
	}
	centerBoxGrowShrink = centerBoxGrowShrink + growth;
	noStroke();
	rectMode(CENTER);
	rect(mouseX, mouseY, centerBoxGrowShrink, centerBoxGrowShrink);

	//Watch band as lines
	push();
	stroke(100);
	strokeWeight(5);
	//Upper band
	for(let i = 0; i < 9; i++) {
		rotate(-(lineAngle - 0.5));
		line(250 + i * 5, 240 - i * 20, 350 - i * 5, 240 - i * 20);
	}

	//Lower band
	for(let i = 0; i < 9; i++) {
		rotate(-(lineAngle + 0.5));
		line(250 + i * 5, 340 + i * 20, 350 - i * 5, 340 + i * 20);
	}
	lineAngle = lineAngle + 0.2; //Controlling rotation speed
	pop();

	//Flickering red rectangles in the center
	rectMode(CENTER);
	fill(255, 0, 0);
	if(x % 480 == 0) {
		rect(random(250, 300), random(250, 300), random(10, 30), random(10, 30));
	}
}

function beforeMouseClickedDraw() {
	fill(0)
  if (song1.isPlaying()==false){song1.play()}
	rectMode(CENTER)
	xPosBeforeClicked = xPosBeforeClicked + 2

	if(xPosBeforeClicked < 220) {
      //Black rectangles joining the center
		rect(50 + xPosBeforeClicked, 50 + xPosBeforeClicked, 60, 60)
		rect(50 + xPosBeforeClicked, 550 - xPosBeforeClicked, 60, 60)
		rect(550 - xPosBeforeClicked, 550 - xPosBeforeClicked, 60, 60)
		rect(550 - xPosBeforeClicked, 50 + xPosBeforeClicked, 60, 60)
	} else {

		rect(300, 300, 120, 120, 25) //Merged center rectangle

		if(xPosBeforeClicked > 325) {
          //Flickering center rect - small
			fill(random(255))
			rect(300, 300, 10, 8)
		}

		if(xPosBeforeClicked > 500) {
          //Watch bands as lines
			for(let i = 0; i < 9; i++) {
				strokeWeight(5)
				line(250 + i * 5, 240 - i * 20, 350 - i * 5, 240 - i * 20)
				line(250 + i * 5, 340 + i * 20, 350 - i * 5, 340 + i * 20)
			}
		}

		rectMode(CENTER)
		fill(255, 0, 0)

      //Random red rectangles every repetition
		if(xPosBeforeClicked % 120 == 0) {
			rect(random(250, 350), random(250, 350), random(5, 30), random(5, 30))
		}
	}
}
