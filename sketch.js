

function createInputs(){
	let i = 0;
	
	/*
		for time, pos and estTime:
		start, end, maybe borderStart and borderStep
	*/
	
	let txtWidth = width / 12;
	let ySize;
	
	inputs[i] = createElement('p', 'time: ');
	ySize = inputs[i].height * 2;
  inputs[i].position(0, getRenderSize() + ySize / 2 - inputs[i].height);
	i ++;
	
	minTime = Date.now() - 24 * 60 * 60 * 1000;
	inputs[i] = createInput(minTime);
	inputs[i].id = "minTime";
	inputs[i].position(txtWidth, getRenderSize() + ySize / 2);
	i ++;
	
	
	maxTime = Date.now();
	inputs[i] = createInput(maxTime);
	inputs[i].position(1.5 * txtWidth + inputs[i - 1].width, getRenderSize() + ySize / 2);
	i ++;
	
	
	
	inputs[i] = createElement('p', 'pos: ');
  inputs[i].position(0, getRenderSize() + 1.5 * ySize - inputs[i].height);
	i ++;
	
	inputs[i] = createInput("0");
	inputs[i].position(txtWidth, getRenderSize() + 1.5 * ySize);
	i ++;
	
	inputs[i] = createInput(100);
	inputs[i].position(1.5 * txtWidth + inputs[i - 1].width, getRenderSize() + 1.5 * ySize);
	i ++;
	
	
	
	inputs[i] = createElement('p', 'estTime: ');
  inputs[i].position(0, getRenderSize() + 2.5 * ySize - inputs[i].height);
	i ++;
	
	inputs[i] = createInput("0");
	inputs[i].position(txtWidth, getRenderSize() + 2.5 * ySize);
	i ++;
	
	inputs[i] = createInput(320);
	inputs[i].position(1.5 * txtWidth + inputs[i - 1].width, getRenderSize() + 2.5 * ySize);
	i ++;
	
	

	
	inputs[i] = createButton("reload");
	inputs[i].mousePressed(reload);
	let fac = 1.8;
	inputs[i].size(inputs[i].widht * fac * 3, inputs[i].height * fac);
	inputs[i].position(width - inputs[i].width * 2, getRenderSize() + 1.5 * ySize);
	
	
}



function setup() {
	createCanvas(displayWidth, 3 * displayHeight / 4);
	
	createInputs();
	
	bg = color(0);
	queueLine = color(125, 125, 0);
	estTimeLine = color(255, 0, 0);
	borderCol = color(16);
	
	loadPos();
	
	
	textSize(height / 24);
	
}

// minor showing var
let size = 2;


// showing/frame

let minTime = 1550271611957;
let maxTime = 1550444399131;

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


//let borderStartEs = 0;
let borderStartPos = 0;
//let borderStepEt = 2;
let borderStepPos = 10;

// data
var pos = [];

var inputs = [];


let result;

function loadPos(){
	var date;
	let path;
	
	for(let i = minTime; i < maxTime + 24 * 60 * 60 * 1000; i += 24 * 60 * 60 * 1000){
		date = new Date(i);
		
		path = "data/QueueLengthLog" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ".txt";
		console.log(path);
		loadStrings(path, pickQueueLengthData);
	}
	
}

function pickQueueLengthData(result){
	
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
}



function reload(){
	console.log("reload");
	
	minTime = int(inputs[1].value());
	maxTime = int(inputs[2].value());
	
	minPos = inputs[4].value();
	maxPos = inputs[5].value();
	
	minestTime = inputs[7].value();
	maxEstTime = inputs[8].value();
	
	
	// TODO bool for automatic reloading
	loadPos();
	
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
		let cur = this.head;
		while(cur.time < start && cur != null){
			cur = cur.next;
		}
		
		return cur;
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
		
		if(dist(getX(this.time), getY(this.val, this.pos), mouseX, mouseY) < 3 * size){
			fill(250);
			stroke(0);
			let txt = this.time + ": " + this.val;
			if(this.pos){
				txt += " ";
			} else {
				txt += " mins ";
			}
			rect(getX(this.time), getY(this.val, this.pos) - textAscent() * 1.5, textWidth(txt), textAscent() * 2);
			fill(0);
			text(txt, getX(this.time), getY(this.val, this.pos));
		}
		
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
