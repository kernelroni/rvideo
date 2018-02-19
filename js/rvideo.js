function rvideolog(msg){
	
	console.log(msg);
	
}



(function($) {


    $.fn.rvideo = function( options ) {

    	// Establish our default settings
        var settings = $.extend({
            mp4url         : 'videos/mov_bbb.mp4',
            oggurl         : 'videos/mov_bbb.ogg',
            width    	: 0,
			height		: 0,
			playlist	: [],
			playlist_container_id : "rvideo-playlist",
			default_controls : false,
			control_bar_position : "bottom",
			autoplay : false,

			controls : {
				play : true,
				//pause : true,
				stop : true,
				fullscreen : true,
				volume : true
			},

			icon_colors : {
				play_icon_color : "#FF0055",
				pause_icon_color : "#FF0055",
				stop_icon_color : "#FF0055",
				fullscreen_icon_color : "#FF0055",
				volume_icon_color : "#FF0055"

			},
			
			
        }, options);


        var init = function(videoWrapper){

			// the selector elements
			rvideolog(videoWrapper);

			// global rplayer
			window.rplayer = document.createElement("video");
			videoWrapper.appendChild(rplayer);
			
			// integrate settings with the video player for future use.
			window.rplayer.settings = settings;
			
			
			rvideolog(rplayer);

			rplayer.setAttribute("id","rvideo-player");
        	rplayer.setAttribute("class","rvideo-player");

			
			if (rplayer.canPlayType("video/mp4")) {
				rplayer.setAttribute("src",settings.mp4url);
			} else {
				rplayer.setAttribute("src",settings.oggurl);
			}			

			// show the player default controls - provided by the browser.
			if(settings.default_controls){
				rplayer.setAttribute("controls", "controls");
			}else if(!settings.default_controls){
				// add custom controll bar inside the video wrapper
				addControlBar(settings,videoWrapper);

			}

			// autoplay settings
			if(settings.autoplay){
				rplayer.setAttribute("autoplay",settings.autoplay);
			}


        };

        // add control bar function defination
        var addControlBar = function(settings,videoWrapper){

        	var controlBar = document.createElement("div");
        	controlBar.setAttribute("id","rvideo-controlbar");
        	controlBar.setAttribute("class","rvideo-controlbar");

        	var controlBarLeftPanel = document.createElement("div");
        	controlBarLeftPanel.setAttribute("id","rvideo-controlBarLeftPanel");
        	controlBarLeftPanel.setAttribute("class","rvideo-controlBarLeftPanel");

        	var controlBarRightPanel = document.createElement("div");
        	controlBarRightPanel.setAttribute("id","rvideo-controlBarRightPanel");
        	controlBarRightPanel.setAttribute("class","rvideo-controlBarRightPanel");


        	if(settings.control_bar_position == "top"){
        		controlBar.style.top = "0px";        		
        	}else{
        		controlBar.style.bottom = "0px";
        	}


        	// add play pause buttons
        	if(settings.controls.play){

        	window.playPaushWrapper = document.createElement("div"); // play pause button wrapper
			playPaushWrapper.setAttribute("id","rvideo-playPaushWrapper");
        	playPaushWrapper.setAttribute("class","rleft rvideo-playPaushWrapper");        	

        	window.playButton = document.createElement("div"); // global play button
        	window.pauseButton = document.createElement("div"); // global pause button

        	playButton.setAttribute("id","rvideo-playbutton");
        	playButton.setAttribute("class","rcontrolbutton rvideo-playbutton");
        	playButton.innerHTML = "<i class='fas fa-play'></i>";

        	pauseButton.setAttribute("id","rvideo-pausebutton");
        	pauseButton.setAttribute("class","rcontrolbutton rvideo-pausebutton");
        	pauseButton.innerHTML = "<i class='fas fa-pause'></i>";



        	pauseButton.style.display = "none"; // hide pause button by default



        	playPaushWrapper.appendChild(playButton);
        	playPaushWrapper.appendChild(pauseButton);

			controlBarLeftPanel.appendChild(playPaushWrapper);
        	

        	} // // play pause buttons  end


        	// add volume buttons
        	if(settings.controls.volume){


        	window.rvideoVolumeWrapper = document.createElement("div");
			rvideoVolumeWrapper.setAttribute("id","rvideo-rvideoVolumeWrapper");
        	rvideoVolumeWrapper.setAttribute("class","rleft rvideo-rvideoVolumeWrapper");

        	window.volumeplusminusWrapper = document.createElement("div"); // play pause button wrapper
			volumeplusminusWrapper.setAttribute("id","rvideo-volumeplusminusWrapper");
        	volumeplusminusWrapper.setAttribute("class","rleft rvideo-volumeplusminusWrapper");     


        	window.volumeWrapper = document.createElement("div");
			volumeWrapper.setAttribute("id","rvideo-volumewrapper");
        	volumeWrapper.setAttribute("class","rleft rvideo-volumewrapper");   





        	window.volumeButton = document.createElement("div");
        	window.volumeMute = document.createElement("div") ;
        	window.plusButton = document.createElement("div"); 
        	window.minusButton = document.createElement("div"); 


        	volumeButton.setAttribute("id","rvideo-volumeButton");
        	volumeButton.setAttribute("class","rcontrolbutton rleft rvideo-volumebutton");
        	volumeButton.innerHTML = "<i class='fas fa-volume-up'></i>";

        	volumeMute.setAttribute("id","rvideo-volumeMute");
        	volumeMute.setAttribute("class","rcontrolbutton rleft rvideo-volumemutebutton");
        	volumeMute.innerHTML = "<i class='fas fa-volume-off'></i>";

        	minusButton.setAttribute("id","rvideo-minusButton");
        	minusButton.setAttribute("class","rcontrolbutton rleft rvideo-volumebutton");
        	minusButton.innerHTML = "<i class='fas fa-minus-square'></i>";

        	plusButton.setAttribute("id","rvideo-plusButton");
        	plusButton.setAttribute("class","rcontrolbutton rleft rvideo-volumemutebutton");
        	plusButton.innerHTML = "<i class='fas fa-plus-square'></i>";

        	volumeMute.style.display = "none"; // hide pause button by default

			volumeplusminusWrapper.appendChild(minusButton); 
        	volumeplusminusWrapper.appendChild(plusButton); 
        	


        	volumeWrapper.appendChild(volumeButton); 
        	volumeWrapper.appendChild(volumeMute);         	       	

        	rvideoVolumeWrapper.appendChild(volumeWrapper);
        	rvideoVolumeWrapper.appendChild(volumeplusminusWrapper);


        	controlBarLeftPanel.appendChild(rvideoVolumeWrapper);


        	}        	



			// add fullscreen button
        	if(settings.controls.fullscreen){

        	window.fullscreenButton = document.createElement("div");
			fullscreenButton.setAttribute("id","rvideo-fullscreenButton");
        	fullscreenButton.setAttribute("class","rcontrolbutton rright rvideo-fullscreenButton");
        	fullscreenButton.innerHTML = "<i class='fas fa-expand-arrows-alt'></i>"; 


			controlBarRightPanel.appendChild(fullscreenButton);

        	}


        	// add left control panel
        	controlBar.appendChild(controlBarLeftPanel);

        	// add right control panel 
			controlBar.appendChild(controlBarRightPanel);



        	// append the control bar inside the main wrapper
        	videoWrapper.appendChild(controlBar);




        	// apply all control button event listeners
        	applyAllEventListener();

        }


        // all the event listener is applied from this function.
        function applyAllEventListener(){

        	playButton.addEventListener("click", onPlayButtonClick);
        	pauseButton.addEventListener("click", onPauseButtonClick);


        }



        var onPlayButtonClick = function(e){

        	rplayer.play();
        	playButton.style.display = "none";
        	pauseButton.style.display = "block";

        }

        var onPauseButtonClick = function(e){

        	rplayer.pause();
        	playButton.style.display = "block";
        	pauseButton.style.display = "none";        	

        }



        return this.each( function(i,videoWrapper) {
        	// initialize plugin only for once. block redundent calling 
        	wrapperObject = jQuery(this);
        	if(!wrapperObject.data("init")){
        		// rvideolog("initializing");
	            var instance = new init( videoWrapper );
	            wrapperObject.data( "init", instance );        		
        	} 
        	// 			

			
        });
        

    } // end of plugin defination

}(jQuery));