/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Main

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

// Make canvas size of window
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

var canvas = {
		width: window.innerWidth,
		mid_y: window.innerHeight/2,
		height: window.innerHeight
	};

var segmentLength = 18; // How long each segment of a horison is
var segmentCount = Math.ceil(canvas.width/segmentLength); // Determine how many segments fit on screen
var horizonCount = 12;
var horizonStartY = canvas.mid_y;
var staticHorizonStartY = canvas.mid_y;
var horizonStartX = 0;
var horizonChangeMax = 15; // Amount by which points on horizon can vary +/- vertically
var horizonDeltaY = 10; // Amount by which different horizons differ vertically
var horizonSmootheningFactor = 4; // Amount by which nearer horizons become smoother
var horizonNeareningFactor = 1; // Amount by which nearer horizons get lower

drawSky();

for (h = 0; h < horizonCount; h++) {
	//console.log("Horizon " + h + " Start Y: " + horizonStartY);
	drawHorizon();
	
	// Set / reset parameters for next horizon
	horizonStartY = staticHorizonStartY + (h * horizonDeltaY) + (Math.ceil(Math.random()*2*horizonDeltaY)) - horizonDeltaY; // Make next horizon lower down
	horizonStartX = 0; // Start back at left hand end
	segmentLength = segmentLength + horizonSmootheningFactor; // Make closer horizons smoother
	horizonDeltaY = horizonDeltaY + horizonNeareningFactor;

}

// ******************************************************************************
//                              FUNCTIONS
// ******************************************************************************

function drawSky() {
	
	context.beginPath();
	var sky = context.createLinearGradient(0, 0, 0, canvas.height/2);
	sky.addColorStop(0, "#80aaff");
	sky.addColorStop(0.4, "#ffd1b3");
	sky.addColorStop(1, "orange");
	context.fillStyle = sky;
	context.fillRect(0, 0, canvas.width, canvas.height*2/3);
	
	
}

function drawHorizon() {
    
	context.beginPath();
	context.moveTo(horizonStartX, horizonStartY);
	for (s = 0; s < segmentCount; s++) {
		
		horizonStartX = horizonStartX + segmentLength;
		horizonStartY = horizonStartY + (Math.ceil(Math.random()*2*horizonChangeMax)) - horizonChangeMax;
		
		context.lineTo(horizonStartX, horizonStartY); // Draw segment
		
	}
	
	// Draw bottom corners
	context.lineTo(canvas.width, canvas.height); // Bottom right
	context.lineTo(0, canvas.height); // Bottom left
	
	context.closePath();
	
	context.fillStyle = generateSegmentColor(h);
		
	context.fill();
     
}

function generateSegmentColor(horizonCount) {
    
	// Generates a slowly darkening gray color hex string

	//console.log("Horizon Count: " + horizonCount);
	var value = 14 - horizonCount;
   
    color = "#" + value.toString(16) + value.toString(16) + value.toString(16);

    console.log("Segment Color: " + color);

    return color;
    
}
