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

			// show the player default controlls - provided by the browser.
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

        	if(settings.control_bar_position == "top"){
        		controlBar.style.top = "0px";        		
        	}else{
        		controlBar.style.bottom = "0px";
        	}



        	if(settings.controls.play){

        	window.playButton = document.createElement("div"); // global play button
        	window.pauseButton = document.createElement("div"); // global pause button

        	playButton.setAttribute("id","rvideo-playbutton");
        	playButton.setAttribute("class","rcontrolbutton rvideo-playbutton");
        	playButton.innerHTML = "<i class='fa fa-play'></i>";

        	pauseButton.setAttribute("id","rvideo-pausebutton");
        	pauseButton.setAttribute("class","rcontrolbutton rvideo-pausebutton");
        	pauseButton.innerHTML = "<i class='fa fa-pause'></i>";


        	playButton.addEventListener("click", onPlayButtonClick);
        	pauseButton.addEventListener("click", onPauseButtonClick);
        	pauseButton.style.display = "none"; // hide pause button by default

        	controlBar.appendChild(playButton);
        	controlBar.appendChild(pauseButton);

        	}





        	// append the control bar inside the wrapper
        	videoWrapper.appendChild(controlBar);

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