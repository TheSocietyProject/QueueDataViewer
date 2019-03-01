

function createInputs(){
	let i = 0;
	
	inputs[i] = createElement('p', 'time: ');
  inputs[i].position(0, getRenderSize());
	
	i ++;
	
	console.log(inputs[i - 1].y);
	
	inputs[i] = createInput("kek");
	inputs[i].position(inputs[i - 1].width, getRenderSize());
	
	i ++;
	
	
	
	inputs[i] = createButton("reload");
	inputs[i].mousePressed(reload);
	inputs[i].position(width - inputs[i].width * 0, getRenderSize());
	
}



function setup() {
	createCanvas(displayWidth, 3 * displayHeight / 4);
	
	createInputs();
	
	bg = color(0);
	queueLine = color(125, 125, 0);
	estTimeLine = color(255, 0, 0);
	borderCol = color(16);
	
	loadPos();
	
	ySize = height / 3;
	
}

// minor showing var
let size = 2;


// showing/frame

let minTime = 1551021181113;
let maxTime = 1551048021010;

let minPos = 0;
let maxPos = 100;

let minEstTime = 0;
let maxEstTime = 320; // in mins 60 != 240


// colors
let bg;
let queueLine;
let estTimeLine;
let borderCol;

// TODO new ll when start / stop when end


let borderStartEs = 0;
let borderStartPos = 0;
let borderStepEt = 2;
let borderStepPos = 10;

// data
var pos = [];

var inputs = [];

let ySize;


let result;

function loadPos(){
	let path = "data/QueueLength/QueueLengthLog" + year() + "-" + month() + "-" + day() + ".txt";
	path = 'data/QueueLength/QueueLengthLog.txt';
	path = "data/data.txt";
	loadStrings(path, pickString);
}

function pickString(result){
	
	
	
	let llP = new LinkedList(true);
	let llT = new LinkedList(false);
	for(let i = 1; i < result.length; i ++){
		llP.add(getInfo(result[i], true));
		llT.add(getInfo(result[i], false));
		
	}
	
	
	this.pos.push(llP);
	this.pos.push(llT);
	
	
}

function getInfo(line, boo){
	let time = line.split(": ")[0];
	if(time == "start") return;
	
	let data = line.split(": ")[1].split(" :")[0];
	if(boo){
		data = 0;
		let estT = line.split(" :: ")[1];
		// 6h 24m
		
		
		if(estT.length != 0 || estT == "already joined the server"){
				
			
			let anlz = estT.split("d");
			if(anlz.length == 2){
				data += int(anlz[0]) * 24 * 60;
				estT = anlz[1].substring(1);
			}
			
			anlz = estT.split("h");
			if(anlz.length == 2){
				data += int(anlz[0]) * 60;
				estT = anlz[1].substring(1);
			}
			
			anlz = estT.split("m");
			if(anlz.length == 2){
				data += int(anlz[0]);
				estT = anlz[1].substring(1);
			}
		}
		
	}
	
	
	let rV = new QueuePos(time, data);
	
	return rV;
}


function draw() {
	background(bg);
	
	renderBorder();
	
	renderQueue();
	
	
}

function getRenderSize(){
	return height;
	//return height - ySize - 1;
}



function reload(){
	// TODO with loading and stuff....
	// TODO bool for automatic reloading
	
}




function renderBorder(){
	stroke(borderCol);
	
	stroke(borderCol);
	
	// TODO
	let cur;
	//let i = borderStart;
	for(let i = borderStartPos; i > 0; i -= borderStepPos){
		cur = getY(i, true);
		line(0, cur, width, cur);
	}
	
	
	for(let i = borderStartPos; i < width; i += borderStepPos){
		cur = getY(i, true);
		line(0, cur, width, cur);
	}
	
	
	
}

function renderQueue(){
	
	for(let i = 0; i < pos.length; i ++){
		this.pos[i].render();
	}
	
}


function getY(y, pos){
	if(pos)
		return (maxPos - y) * getRenderSize() / (maxPos - minPos);
	return (maxEstTime - y) * getRenderSize() / (maxEstTime - minEstTime);
}


function getX(x){
	return (x - minTime) * width / (maxTime - minTime);
}




class LinkedList {
	
	
	
	constructor(pos){
		
		this.pos = pos;
	}
	
	init(first){
		first.setWetherPos(pos);
		
		this.head = first;
		this.tail = first;
		
	}
	
	add(toAdd){
		if(toAdd == null)
			return;
		
		toAdd.setWetherPos(this.pos);
		
		if(this.tail == null){
			this.init(toAdd);
			return;
		}
		
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
