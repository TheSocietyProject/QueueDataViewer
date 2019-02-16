




function setup() {
	createCanvas(displayWidth, displayHeight);
	
	bg = color(0);
	queueLine = color(125, 125, 0);
	
}

// minor showing var
let size = 2;


// showing/frame

let maxPos = 100;

let minTime = 150000;
let maxTime = 151000;

let minEstTime = 0;
let maxEstTime = 10; // in mins


// colors
let bg;
let queueLine;

// data
var pos = [[100, 99, 99, 50, 0, 110, 105, 65], [55, 50]];


function draw() {
	background(bg);
	
	
	renderQueue();
}

function renderQueue(){
	stroke(queueLine);
	fill(bg);
	
	for(let j = 0; j < pos.length; j ++){
		let last = getY(pos[j][0]);
		let len = pos[j].length;
		
		for(let i = 1; i < len; i ++) {
			let cur = getY(pos[j][i]);
			line(getX(i - 1, len), last, getX(i, len), cur);
			ellipse(getX(i, len), cur, 2.0 * size, 2.0 * size);
			
			last = cur;
		}
	}
	
}


function getY(i){
	return (maxPos - i) * height / maxPos;
}

function getX(i, len){
	return i * width / len;
}




class LinkedList {
	
	
	
	
}


class QueuePos {
	
	
	constructor(){
		this.time = 15000; // long
		let pos; // int
	}
	
	
	
	
	
	
	getX(){
		return this.time;
	}
	
	getY(){
		return 0;
	}
	
	
	
	
	
	
}




/*
		
		// TOOD s
		
		// TODO also somehow move the estimated time
		
	// TODO data loading (day wise)
		
	// TODO convert 15000 to act time
	
	// TODO show players below queue when data is avalible
	
	// TODO show the name for the line (like max queue pos / time, max queue pos is chat, queue speed (going thru queue normal))
	
	// TODO mark nearest data point and show data
	
	// TODO red line or sth for pos 0
	
	// TODO move + scroll of the graph...
	
	// TODO maybe show where sb must have left
	
	
	// TODO show players that r on the server,
		queue pos r in a linked list and sorted after time and origin is saved?...
		iterated to the max
		
		ant for all points the time is showed
		
		
	*/
