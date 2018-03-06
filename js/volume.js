var volumeControll = document.createElement("div");
	volumeControll.setAttribute("class","rvideo-volume-control");
	volumeControll.setAttribute("id","rvideo-volume-control");

var volumeProgress = document.createElement("div");
	volumeProgress.setAttribute("class","rvideo-volume-progress");

var volumeNiddle = document.createElement("div");
	volumeNiddle.setAttribute("class","rvideo-bolume-niddle");



function onVolumeNiddleMove(e){

	var pxdiff = 0;

	var xlimit = volumeControll.offsetLeft;
	var xlimitend = xlimit +  volumeControll.offsetWidth;
	var currentPos = e.clientX;// - volumeControll.offsetLeft;


	if(currentPos <= xlimit){
		currentPos = xlimit;
	}else if(currentPos >= xlimitend){
		currentPos = xlimitend;
	}

	currentPos = currentPos - volumeControll.offsetLeft;

	volumeNiddle.style.left = currentPos + "px";
//console.log(e);

}


function onVolumeNiddleDown(e){


	console.log(volumeControll.position);
	this.currentPositionLeft = e.clientX;
	document.addEventListener("mousemove",onVolumeNiddleMove);
	document.addEventListener("mouseup",onVolumeNiddleUp);
	

}

function onVolumeNiddleUp(e){

	//this.currentPositionLeft = e.clientX;
	document.removeEventListener("mousemove",onVolumeNiddleMove);

	console.log(e);
	

}




volumeNiddle.addEventListener("mousedown",onVolumeNiddleDown);






volumeControll.appendChild(volumeProgress);
volumeControll.appendChild(volumeNiddle);


console.log(volumeControll);

document.getElementById("parentelement").appendChild(volumeControll);










