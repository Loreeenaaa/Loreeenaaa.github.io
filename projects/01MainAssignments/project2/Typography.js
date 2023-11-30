//font,array,x
let font;
let letters = [];
let x=30

//loading the font
function preload() {
  font = loadFont('AdobeClean-Bold.otf');
}

// text rendering, sets the text size, and then calls function
function setup() {
  createCanvas(1400, 700);
  textFont(font);
  textSize(x);
  initializeLetters();
}

//white,alpha
function draw() {
  background(255,100);
	
	//loop for each letter in array; specific position, if hidden
  for (let i = 0; i < letters.length; i++) {
      textAlign(CENTER, CENTER);
      fill(0);
      text(letters[i].letter, letters[i].x, letters[i].y);
		//spinning letters
		if (!letters[i].visible) {
			 if (frameCount%4 == 0) {
				 letters[i].letter = getRandomLetter();
				 
				 //hiding letters 
				 if(mouseIsPressed){
					 letters[i]=frameCount==0
				 }
			 }
    }
  }
}

//letters array is initialied by creating objects for each letter at grid positions
function initializeLetters() {
	
  //size of the grid,placement of letters
	let gridSize = 50;
 	for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      let newLetter = {
      	x: x + gridSize / 2,
        y: y + gridSize / 2,
        letter: getRandomLetter(),
        visible: true,
      };
      letters.push(newLetter);
    }
  }
}

//function to create the random letters
function getRandomLetter() {
	
// Random number 0-25
let randomIndex = floor(random(26));
// Convert number to ASCII letters
let randomLetter = String.fromCharCode(65 + randomIndex);
return randomLetter;
}


 
function mouseMoved() {
	//circle on cursor
	noStroke();
	fill(random(255),random(255),random(255));
	ellipse(mouseX,mouseY,20);
	//recognizing where the letters are
  for (let i = 0; i < letters.length; i++) {
		if (letters.length != 0) {
    	let d = dist(mouseX, mouseY, letters[i].x, letters[i].y);
    	if (d < 15) { //click sensitivity
			
			//hide the letters
      letters[i].visible = false;
      break; 
			}
    }
  }
}
