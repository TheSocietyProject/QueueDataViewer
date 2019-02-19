




function setup() {
	createCanvas(displayWidth / 2, displayHeight);
	
	bg = color(0);
	queueLine = color(125, 125, 0);
	estTimeLine = color(255, 0, 0);
	borderCol = color(128);
	
	loadPos();
	
}

// minor showing var
let size = 2;


// showing/frame

let minTime = 150000;
let maxTime = 151000;

let minPos = 0;
let maxPos = 100;

let minEstTime = 0;
let maxEstTime = 10; // in mins


// colors
let bg;
let queueLine;
let estTimeLine;
let borderCol;


let borderStart = 0;
let borderStepEt = 2;
let borderStepPos = 10;

// data
var pos = [];


function loadPos(){
	let ll = new LinkedList(new QueuePos(150000, 75), true);
	ll.add(new QueuePos(150700, 100));
	ll.add(new QueuePos(151000, 50));
	this.pos.push(ll);
	
	
	ll = new LinkedList(new QueuePos(150000, 9), false);
	ll.add(new QueuePos(150300, 5));
	ll.add(new QueuePos(151000, 3));
	this.pos.push(ll);
	
	
}


function draw() {
	background(bg);
	
	renderBorder();
	
	renderQueue();
}

function renderBorder(){
	stroke(borderCol);
	line(0, getY(0), width, getY(0));
	
	let i = borderStart;
	
	
}

function renderQueue(){
	
	for(let i = 0; i < pos.length; i ++){
		this.pos[i].render();
	}
	
}


function getY(y, pos){
	if(pos)
		return (maxPos - y) * height / (maxPos - minPos);
	return (maxEstTime - y) * height / (maxEstTime - minEstTime);
}


function getX(x){
	return (x - minTime) * width / (maxTime - minTime);
}




class LinkedList {
	
	
	constructor(first, pos){
		first.setWetherPos(pos);
		
		this.head = first;
		this.tail = first;
		
		this.pos = pos;
	}
	
	
	add(toAdd){
		toAdd.setWetherPos(this.pos);
		
		toAdd.setLast(this.tail);
		this.tail.setNext(toAdd);
		this.tail = toAdd;
	}
	
	getFrom(start){
		// TODO return right thing
		return this.head;
	}
	
	render(){
		this.getFrom(minTime).renderTill(maxTime);
	}
	
	
}


class QueuePos {
	
	
	constructor(time, val){
		this.time = time; // long
		this.val = val; // int
		
		// also pos
		
		// also last + next
	}
	
	setWetherPos(pos){
		this.pos = pos;
	}
	
	setLast(last){
		this.last = last;
	}
	
	setNext(next){
		this.next = next;
	}
	
	renderTill(till){
		
		
		this.render();
		
		if(this.next != null && this.time < till)
			this.next.renderTill(till);
	}
	
	
	render(){
		fill(estTimeLine);
		stroke(estTimeLine);
		if(this.pos){
			fill(queueLine);
			stroke(queueLine);
		}
		
		
		if(this.last != null)
			line(getX(this.last.time), getY(this.last.val, this.last.pos), getX(this.time), getY(this.val, this.pos));
		
		ellipse(getX(this.time), getY(this.val, this.pos), 2 * size, 2 * size);
	}
	
	
	
}




/*

		// TODO and avg and u can decide how long and where to display the result (eg avg from 1day back + 1 in future, or avg for last hour)
		
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
