let circles = [];
let song;
let dia = 50;
let volume = 0;
let maxDistance;
let size = 0;
let font;
let textX, textY;
let isMouseDragged = false;
let wellDoneVisible = false;

function preload() {
	song = loadSound('Steven Beddall - Restless Mind (Instrumental Version).mp3');
	font= loadFont ('AdobeClean-Bold.otf')

}


function setup() {
	textFont(font);
	
	createCanvas(windowWidth, windowHeight);
	//maximum distance from the top-left corner to the bottom-right corner of canvas (for scaling)
	maxDistance = dist(0, 0, width, height)
	background(0);
	//text position
	textX = 30;
  textY = height - 20;
	Text();
	// nested loop for class circle Loop intervals between circles
	for (let one = dia; one < width - dia; one += dia + dia / 4) {
		for (let two = dia; two < height - dia; two += dia + dia / 4) {
			let d = dia;
			circles.push(new Circle_Loop(one, two, d, color(255)));
		}
	}
	
}


function draw() {
	noStroke();
	//loop for circle
	for (let i = 0; i < circles.length; i++) {
		//calculate where the circle is
		let d = dist(mouseX, mouseY, circles[i].x, circles[i].y);
		size = dia /2.5 + d / maxDistance * dia;
		gradient = map(size, 0, 60, 255, 0)
		circles[i].setColor(color(gradient, 0, 0))
		circles[i].resize(size);
		circles[i].display();
		
	}

}

//interaction_1
function mouseClicked() {
  if (wellDoneVisible) {
    // If "Well done" text is visible, do nothing
    return;}

	let clicked = false;
  for (let i = 0; i < circles.length; i++) {
    let d = dist(mouseX, mouseY, circles[i].x, circles[i].y);
    size = dia / 2 + d / maxDistance * dia;
    gradient = map(size, 0, 60, 255, 0);

    if (d < circles[i].diameter / 2) {
    // Check if the audio is already playing
 
				//random volume and displayed number
        volume = floor(random(101));
        song.setVolume(volume / 100);
        circles[i].setColor(color(255, 0, 0));
        circles[i].setRandomNo(volume);
        clicked = true;
			  if (!song.isPlaying()) {
      		  song.loop();  // Play the audio only if it's not already playing
				}
    } else {
      circles[i].setColor(color(gradient, 0, 0));
      circles[i].setRandomNo("");
    }
    circles[i].resize(size);
  }

  if (!clicked) {
    song.pause();
  }
}

//interaction_2
function mouseDragged() {
  if (!wellDoneVisible) {
    song.rate(0.6);
    isMouseDragged = true;
  }
}

//release songrate
function mouseReleased() {
  if (isMouseDragged) {
    // Return to normal rate only when the mouse was dragged
    song.rate(1);
    isMouseDragged = false;
  }
}

//text
function Text(){
	fill(0);
	textSize(20);
	fill('#A61212');
	stroke('#610000');
	strokeWeight(3);
	text('Adjust the volume to 50% ',textX, textY);

}

class Circle_Loop {
	constructor(x, y, d, col) {
		
  this.x = x;
  this.y = y;
  this.diameter = d;
  this.color = col;
	this.randomNumber = null; 
	}
	
	//if randomNumber=!null, = number center of the circle
  display() {
 	strokeWeight(0.5)
   fill(this.color);
	 ellipse(this.x, this.y, this.diameter);
		
		 if (this.randomNumber !== null) {
			stroke(3);
      fill(0); 
      textAlign(CENTER, CENTER);
      textSize(13); 
      text(this.randomNumber, this.x, this.y);
			
			 //if zahl 50 erscheint dann erscheinen
if (parseInt(this.randomNumber) === 50) {
	      wellDoneVisible = true; 
        fill(0);
        textSize(20);
       	fill('#A61212');
				stroke('#610000');
				strokeWeight(3);
        text('Well done!', this.x, this.y - 20);
      }
    }
  }
	
	setColor(c) {
		this.color = c;
	}
	setRandomNo(randomNo) {
		this.randomNumber = randomNo;
	}
	
	resize(d) {
		this.diameter = d;
	}

}