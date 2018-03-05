var volumeControll = document.createElement("div");
	volumeControll.setAttribute("class","rvideo-volume-control");
	volumeControll.setAttribute("id","rvideo-volume-control");

var volumeProgress = document.createElement("div");
	volumeProgress.setAttribute("class","rvideo-volume-progress");

var volumeNiddle = document.createElement("div");
	volumeNiddle.setAttribute("class","rvideo-bolume-niddle");

function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left + window.scrollX,
    top: el.top + window.scrollY
  }
}

function onVolumeNiddleMove(e){

var pxdiff = 0;

/*
if(e.clientX > this.currentPositionLeft){
	pxdiff = e.clientX - volumeNiddle.currentPositionLeft;
}else{
	pxdiff = volumeNiddle.currentPositionLeft - e.clientX ;
}
*/

var xlimit = getOffset(volumeControll).left;
var xlimitend = xlimit +  volumeControll.offsetWidth;
var currentPos = e.clientX - volumeControll.offsetLeft;


if(currentPos <= xlimit){
	currentPos = xlimit;
}else if(currentPos >= xlimitend){
	currentPos = xlimitend;
}


console.log(xlimit + " " + xlimitend + " " + currentPos);






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










