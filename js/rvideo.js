function rvideolog(msg){
	
	console.log(msg);
	
}



(function($) {


    $.fn.rvideo = function( options ) {

    	// Establish our default settings
        var settings = $.extend({
            id             : "rplayer_0", // default video object name. no space and any special char allowed, something like a variable name.
            title          : "Video title goes here",
            mp4url         : 'videos/mov_bbb.mp4',
            oggurl         : 'videos/mov_bbb.ogg',
            width    	: "650px",
			height		: "340px",
            volume      : 0.5,   
			playlist	: [],
			playlist_container_id : "rvideo-playlist",
			default_controls : false,
			control_bar_position : "bottom",
			autoplay : false,
			logo : {
				url : "icons/logo/rvideologo.png",
				left : 10,
				top : 10
			},
            control_bar_logo : "<a href='http://kernelroni.com' target='_blank'><img src='icons/logo/rvideologo.png' /></a>",
            poster : "icons/logo/rvideoposter.png",
            poster_play_pause_button : {
                visible : true,
                play_button_url : "icons/play.png",
                pause_button_url : "icons/pause.png",
                left : 0,
                top : 0

            },

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

            videoWrapper.setAttribute("data-rplayer-id", settings.id);
            videoWrapper.style.position = "relative";

            
            var player_id = settings.id;
            window[player_id] = {}; // instance object : eg window['rplayer_0'] by default
            window[player_id].settings = settings;
            window[player_id].isInFullScreen = 0;

            window[player_id].videoWrapper = videoWrapper;
            

			// the selector elements
			rvideolog(videoWrapper);



			// global rplayer
			window[player_id].player = document.createElement("video");
			videoWrapper.appendChild(window[player_id].player);

            var video_title = document.createElement("div");
            video_title.setAttribute("id", "rvideo-title");
            video_title.setAttribute("class", "rvideo-title");

            var video_title_span = document.createElement("span");
            video_title_span.setAttribute("id", "rvideo-title-text");
            video_title_span.setAttribute("class", "rvideo-title-text");

            video_title_span.innerHTML = settings.title;

            video_title.appendChild(video_title_span);

            window[player_id].video_title = video_title;

            videoWrapper.appendChild(video_title);
			
			// integrate settings with the video player for future use.
			
			
			
			rvideolog(window[player_id]);

			window[player_id].player.setAttribute("id","video_"+player_id);
        	window[player_id].player.setAttribute("class","video_"+player_id);

            

            if(settings.width.toString().length > 0 ){
                window[player_id].videoWrapper.style.width = settings.width.toString();    
            }else{
                window[player_id].videoWrapper.style.width = "100%";
            }
            

            if(settings.height.toString().length > 0 ){
                window[player_id].videoWrapper.style.height = settings.height;    
            }else{
                window[player_id].videoWrapper.style.height = "100%";
            }
            
            window[player_id].player.style.width = "100%";
            window[player_id].player.style.height = "100%";

			
			if (window[player_id].player.canPlayType("video/mp4")) {
				window[player_id].player.setAttribute("src",window[player_id].settings.mp4url);
			} else {
				window[player_id].player.setAttribute("src",window[player_id].settings.oggurl);
			}			

			// show the player default controls - provided by the browser.
			if(window[player_id].settings.default_controls){
				window[player_id].player.setAttribute("controls", "controls");
			}else if(!window[player_id].settings.default_controls){
				// add custom controll bar inside the video wrapper
				addControlBar(window[player_id].settings);

			}


            // autoplay settings
			if(window[player_id].settings.autoplay){
				window[player_id].player.setAttribute("autoplay",settings.autoplay);
			}

            // rplayer set volume level
            if(!isNaN(window[player_id].settings.volume)){

                var volume = parseFloat(window[player_id].settings.volume);
                if(volume >= 0.0 && volume <=  1.0 ){
                    window[player_id].player.volume = volume;
                }else{
                    window[player_id].player.volume = 1;
                }

            }else{
                window[player_id].player.volume = 1;
            }
            // volume setup end

			// autoplay settings
			if(window[player_id].settings.logo){
				var logo = window[player_id].settings.logo;
				addLogo(logo,videoWrapper);
			}

            // poster settings
            if(window[player_id].settings.poster){
                window[player_id].player.setAttribute("poster",window[player_id].settings.poster);
            }


 

			
			
        };
		
        var addPosterPlayPauseButton = function(ppimg){

            var player_id = settings.id;

            window[player_id].poster_play_button = new Image();
            window[player_id].poster_play_button.src = ppimg.play_button_url;
            window[player_id].poster_play_button.id = "poster_play_button";
            window[player_id].poster_play_button.className = "poster_play_button";
            window[player_id].poster_play_button.style.position = "absolute";


            window[player_id].poster_pause_button = new Image();
            window[player_id].poster_pause_button.src = ppimg.pause_button_url;
            window[player_id].poster_pause_button.id = "poster_pause_button";
            window[player_id].poster_pause_button.className = "poster_pause_button";
            window[player_id].poster_pause_button.style.position = "absolute";
            

            if(ppimg.left > 0){
            window[player_id].poster_play_button.style.left = ppimg.left + "px";
            window[player_id].poster_play_button.style.top = ppimg.top + "px";

            window[player_id].poster_pause_button.style.left = ppimg.left + "px";
            window[player_id].poster_pause_button.style.top = ppimg.top + "px";

            window[player_id].poster_play_button.style.display = "block";
            window[player_id].videoWrapper.appendChild(window[player_id].poster_play_button);
            window[player_id].videoWrapper.appendChild(window[player_id].poster_pause_button);


            }else{




                window[player_id].poster_play_button.onload = function(){

                
                window[player_id].videoWrapper.appendChild(window[player_id].poster_play_button);
                window[player_id].videoWrapper.appendChild(window[player_id].poster_pause_button);                     

                    //alert("play load");

                var wrapperWidth = window[player_id].videoWrapper.offsetWidth;
                var wrapperHeight = window[player_id].videoWrapper.offsetHeight;

                var playbtnWidth = this.clientWidth;
                var playbtnHeight = this.clientHeight;

                //console.log(playbtnWidth + " " + playbtnHeight);




                playButtonX = (wrapperWidth / 2)  - (playbtnWidth /2 );
                playButtonY = (wrapperHeight / 2)  - (playbtnHeight /2 );

                window[player_id].poster_play_button.style.left = playButtonX + "px";
                window[player_id].poster_play_button.style.top = playButtonY + "px";

                window[player_id].poster_pause_button.style.left = playButtonX + "px";
                window[player_id].poster_pause_button.style.top = playButtonY + "px";
    
               



                };

                
                

            }




        }



		// add logo function defination
		var addLogo = function(logo,videoWrapper){
			var logoImg = new Image();
            logoImg.src = logo.url;
            logoImg.id = "rvideo-logo";
            logoImg.className = "rvideo-logo";
            logoImg.style.position = "absolute";
            logoImg.style.left = logo.left + "px";
            logoImg.style.top = logo.top + "px";

            videoWrapper.appendChild(logoImg);
			
		}

        // add control bar function defination
        var addControlBar = function(settings,videoWrapper){

            var player_id = settings.id;

            

            // progress Bar
        	window[player_id].progressBar = document.createElement("div");
            window[player_id].progressBar.setAttribute("id","progressBar"+player_id);
            window[player_id].progressBar.setAttribute("class","rvideo-progressBar progressBar"+player_id);
            window[player_id].progressBar.style.position = "relative";
            window[player_id].progressBar.style.width = "100%";
            window[player_id].progressBar.style.height = "3px";
            window[player_id].progressBar.style.backgroundColor  = "rgba(200,200,200,0.5)";



            window[player_id].progressBarProgress = document.createElement("div");
            window[player_id].progressBarProgress.setAttribute("id","progressBarProgress"+player_id);
            window[player_id].progressBarProgress.setAttribute("class","rvideo-progressBarProgress progressBarProgress"+player_id);
            window[player_id].progressBarProgress.style.position = "absolute";
            window[player_id].progressBarProgress.style.width = "0px";
            window[player_id].progressBarProgress.style.height = "3px";

            window[player_id].progressBarProgress.style.backgroundColor  = "rgba(255,0,0,0.8)";





            // append progress bar progress 
            window[player_id].progressBar.appendChild( window[player_id].progressBarProgress );


            window[player_id].controlBar = document.createElement("div");
        	window[player_id].controlBar.setAttribute("id","controlBar_"+player_id);
        	window[player_id].controlBar.setAttribute("class","rvideo-controlbar controlbar_"+player_id);

        	var controlBarLeftPanel = document.createElement("div");
        	controlBarLeftPanel.setAttribute("id","rvideo-controlbarLeftPanel");
        	controlBarLeftPanel.setAttribute("class","rvideo-controlbarLeftPanel");

        	var controlBarRightPanel = document.createElement("div");
        	controlBarRightPanel.setAttribute("id","rvideo-controlbarRightPanel");
        	controlBarRightPanel.setAttribute("class","rvideo-controlbarRightPanel");


            window[player_id].controlBar.leftPanel = controlBarLeftPanel;
            window[player_id].controlBar.rightPanel = controlBarRightPanel;


        	if(window[player_id].settings.control_bar_position == "top"){
        		window[player_id].controlBar.style.top = "0px";        		
        	}else{
        		window[player_id].controlBar.style.bottom = "0px";
        	}



            window[player_id].controlBar.btn = {}; // all control bar button collection 

        	// add play pause buttons
        	if(window[player_id].settings.controls.play){            

        	window[player_id].controlBar.playPauseWrapper = document.createElement("div"); // play pause button wrapper
			window[player_id].controlBar.playPauseWrapper.setAttribute("id","rvideo-playPauseWrapper");
        	window[player_id].controlBar.playPauseWrapper.setAttribute("class","rleft rvideo-playPauseWrapper");  



        	window[player_id].controlBar.btn.playButton = document.createElement("div"); // global play button
        	window[player_id].controlBar.btn.pauseButton = document.createElement("div"); // global pause button

        	window[player_id].controlBar.btn.playButton.setAttribute("id","rvideo-playbutton");
        	window[player_id].controlBar.btn.playButton.setAttribute("class","rcontrolbutton rvideo-playbutton");
        	window[player_id].controlBar.btn.playButton.innerHTML = "<i class='fas fa-play'></i>";

        	window[player_id].controlBar.btn.pauseButton.setAttribute("id","rvideo-pausebutton");
        	window[player_id].controlBar.btn.pauseButton.setAttribute("class","rcontrolbutton rvideo-pausebutton");
        	window[player_id].controlBar.btn.pauseButton.innerHTML = "<i class='fas fa-pause'></i>";



        	window[player_id].controlBar.btn.pauseButton.style.display = "none"; // hide pause button by default



        	window[player_id].controlBar.playPauseWrapper.appendChild ( window[player_id].controlBar.btn.playButton );
        	window[player_id].controlBar.playPauseWrapper.appendChild ( window[player_id].controlBar.btn.pauseButton );

			controlBarLeftPanel.appendChild ( window[player_id].controlBar.playPauseWrapper );
        	

        	} // // play pause buttons  end


        	// add volume buttons
        	if(window[player_id].settings.controls.volume){


        	window[player_id].controlBar.volumeWrapper = document.createElement("div");
			window[player_id].controlBar.volumeWrapper.setAttribute("id","rvideo-volumeWrapper");
        	window[player_id].controlBar.volumeWrapper.setAttribute("class","rleft rvideo-volumeWrapper");

        	window[player_id].controlBar.plusMinusWrapper = document.createElement("div"); // play pause button wrapper
			window[player_id].controlBar.plusMinusWrapper.setAttribute("id","rvideo-plus_minus_wrapper");
        	window[player_id].controlBar.plusMinusWrapper.setAttribute("class","rleft rvideo-plus_minus_wrapper");
            window[player_id].controlBar.plusMinusWrapper.style.display = "none";



        	window[player_id].controlBar.soundWrapper = document.createElement("div");
			window[player_id].controlBar.soundWrapper.setAttribute("id","rvideo-soundWrapper");
        	window[player_id].controlBar.soundWrapper.setAttribute("class","rleft rvideo-soundWrapper");   





        	window[player_id].controlBar.btn.volumeUpButton = document.createElement("div");
        	window[player_id].controlBar.btn.muteButton = document.createElement("div") ;        	
        	window[player_id].controlBar.btn.minusButton = document.createElement("div");
            window[player_id].controlBar.btn.plusButton = document.createElement("div");  


        	window[player_id].controlBar.btn.volumeUpButton.setAttribute("id","rvideo-volumeUpButton");
        	window[player_id].controlBar.btn.volumeUpButton.setAttribute("class","rcontrolbutton rleft rvideo-volumeUpButton");
        	window[player_id].controlBar.btn.volumeUpButton.innerHTML = "<i class='fas fa-volume-up'></i>";

        	window[player_id].controlBar.btn.muteButton.setAttribute("id","rvideo-muteButton");
        	window[player_id].controlBar.btn.muteButton.setAttribute("class","rcontrolbutton rleft rvideo-muteButton");
        	window[player_id].controlBar.btn.muteButton.innerHTML = "<i class='fas fa-volume-off'></i>";

        	window[player_id].controlBar.btn.minusButton.setAttribute("id","rvideo-minusButton");
        	window[player_id].controlBar.btn.minusButton.setAttribute("class","rcontrolbutton rleft rvideo-minusButton");
        	window[player_id].controlBar.btn.minusButton.innerHTML = "<i class='fas fa-minus-square'></i>";

        	window[player_id].controlBar.btn.plusButton.setAttribute("id","rvideo-plusButton");
        	window[player_id].controlBar.btn.plusButton.setAttribute("class","rcontrolbutton rleft rvideo-plusButton");
        	window[player_id].controlBar.btn.plusButton.innerHTML = "<i class='fas fa-plus-square'></i>";

        	window[player_id].controlBar.btn.muteButton.style.display = "none"; // hide pause button by default



            // volume progress 

        var volumeControl = document.createElement("div");
            volumeControl.setAttribute("class","rvideo-volume-control");
            volumeControl.setAttribute("id","rvideo-volume-control");

        var volumeProgress = document.createElement("div");
            volumeProgress.setAttribute("class","rvideo-volume-progress");

        var volumeNiddle = document.createElement("div");
            volumeNiddle.setAttribute("class","rvideo-bolume-niddle");            

            window[player_id].controlBar.btn.volumeControl = volumeControl; 
            window[player_id].controlBar.btn.volumeProgress = volumeProgress; 
            window[player_id].controlBar.btn.volumeNiddle = volumeNiddle; 


            if(!isNaN(window[player_id].settings.volume)){

                    if(window[player_id].settings.volume >= 0.0 && window[player_id].settings.volume <= 1.0){

                            var progressWidth = 100 * window[player_id].settings.volume ;
                            window[player_id].controlBar.btn.volumeProgress.style.width = progressWidth + "px";
                            window[player_id].controlBar.btn.volumeNiddle.style.left = progressWidth + "px";


                    }
            }




                window[player_id].controlBar.btn.volumeControl.appendChild(window[player_id].controlBar.btn.volumeProgress);
                window[player_id].controlBar.btn.volumeControl.appendChild(window[player_id].controlBar.btn.volumeNiddle);


                window[player_id].controlBar.plusMinusWrapper.appendChild(volumeControl);



            	window[player_id].controlBar.soundWrapper.appendChild ( window[player_id].controlBar.btn.volumeUpButton ); 
            	window[player_id].controlBar.soundWrapper.appendChild ( window[player_id].controlBar.btn.muteButton );         	       	



            	window[player_id].controlBar.volumeWrapper.appendChild( window[player_id].controlBar.soundWrapper );
            	window[player_id].controlBar.volumeWrapper.appendChild( window[player_id].controlBar.plusMinusWrapper );


            	window[player_id].controlBar.leftPanel.appendChild( window[player_id].controlBar.volumeWrapper );


        	}       	

            






			// add fullscreen button
        	if(settings.controls.fullscreen){

        	window[player_id].controlBar.btn.fullscreenButton = document.createElement("div");
			window[player_id].controlBar.btn.fullscreenButton.setAttribute("id","rvideo-fullscreenButton");
        	window[player_id].controlBar.btn.fullscreenButton.setAttribute("class","rcontrolbutton rright rvideo-fullscreenButton");
        	window[player_id].controlBar.btn.fullscreenButton.innerHTML = "<i class='fas fa-expand'></i>"; 


            window[player_id].controlBar.btn.closeFullscreenButton = document.createElement("div");
            window[player_id].controlBar.btn.closeFullscreenButton.setAttribute("id","rvideo-closeFullscreenButton");
            window[player_id].controlBar.btn.closeFullscreenButton.setAttribute("class","rcontrolbutton rright rvideo-closeFullscreenButton");
            window[player_id].controlBar.btn.closeFullscreenButton.innerHTML = "<i class='fas fa-compress'></i>"; 
            window[player_id].controlBar.btn.closeFullscreenButton.style.display = "none";



			window[player_id].controlBar.rightPanel.appendChild(window[player_id].controlBar.btn.fullscreenButton);
            window[player_id].controlBar.rightPanel.appendChild(window[player_id].controlBar.btn.closeFullscreenButton);

        	}


            if(settings.control_bar_logo){

                window[player_id].controlBar.btn.control_bar_logo = document.createElement("div");
                window[player_id].controlBar.btn.control_bar_logo.innerHTML = settings.control_bar_logo;
                window[player_id].controlBar.btn.control_bar_logo.setAttribute("class","rvideo-control_bar_logo rright");
                window[player_id].controlBar.rightPanel.appendChild(window[player_id].controlBar.btn.control_bar_logo);


            }

           // on screen play button - on poster screen

            if(window[player_id].settings.poster_play_pause_button.visible){

                addPosterPlayPauseButton(window[player_id].settings.poster_play_pause_button);
            }


            // add progress progressBar
            window[player_id].controlBar.appendChild( window[player_id].progressBar );


        	// add left control panel
        	window[player_id].controlBar.appendChild(window[player_id].controlBar.leftPanel);

        	// add right control panel 
			window[player_id].controlBar.appendChild( window[player_id].controlBar.rightPanel );



        	// append the control bar inside the main wrapper
        	window[player_id].videoWrapper.appendChild( window[player_id].controlBar );




        	// apply all control button event listeners
        	applyAllEventListener();

        }



        function onVolumeNiddleMove(e){

            var pxdiff = 0;
            var player_id = settings.id;

            var xlimit = window[player_id].controlBar.btn.volumeControl.offsetLeft;
            var xlimitend = xlimit +  window[player_id].controlBar.btn.volumeControl.offsetWidth;
            var currentPos = e.clientX;// - volumeControll.offsetLeft;


            if(currentPos <= xlimit){
                currentPos = xlimit;
            }else if(currentPos >= xlimitend){
                currentPos = xlimitend;
            }

            currentPos = currentPos - window[player_id].controlBar.btn.volumeControl.offsetLeft;

            window[player_id].controlBar.btn.volumeNiddle.style.left = (currentPos-2) + "px";


            // update player volume here
            if(currentPos > 0){
                window[player_id].player.volume = currentPos / 100 ;
                window[player_id].controlBar.btn.muteButton.style.display = "none";
                window[player_id].controlBar.btn.volumeUpButton.style.display = "block";


            }else {
                window[player_id].player.volume = 0;
                window[player_id].controlBar.btn.muteButton.style.display = "block";
                window[player_id].controlBar.btn.volumeUpButton.style.display = "none";  

            }


            // update the volume progress bar
            window[player_id].controlBar.btn.volumeProgress.style.width = currentPos + "px";

            




        }


        function onVolumeNiddleDown(e){
            
            this.currentPositionLeft = e.clientX;
            document.addEventListener("mousemove",onVolumeNiddleMove,{rvideo:true});
            document.addEventListener("mouseup",onVolumeNiddleUp,{rvideo:true});
            

        }


        // remove the event handeler when mouse release.
        function onVolumeNiddleUp(e){
            
            document.removeEventListener("mousemove",onVolumeNiddleMove,{rvideo:true});            
            document.removeEventListener("mouseup",onVolumeNiddleUp,{rvideo:true}); 
            
        }



        // all the event listener is applied from this function.
        function applyAllEventListener(){

            var player_id = settings.id;

        	window[player_id].controlBar.btn.playButton.addEventListener("click", onPlayButtonClick);
        	window[player_id].controlBar.btn.pauseButton.addEventListener("click", onPauseButtonClick);


            window[player_id].controlBar.btn.fullscreenButton.addEventListener("click", onFullScreenButtonClick);
            window[player_id].controlBar.btn.closeFullscreenButton.addEventListener("click", onCloseFullscreenButtonClick);


            window[player_id].controlBar.volumeWrapper.addEventListener("mouseenter",function(){
                window[player_id].controlBar.plusMinusWrapper.style.display = "block";
            });
            
            window[player_id].controlBar.volumeWrapper.addEventListener("mouseleave",function(){
                window[player_id].controlBar.plusMinusWrapper.style.display = "none";
            });

            //window[player_id].videoWrapper.addEventListener("mouseenter", onPlayerMouseOver);
            //window[player_id].videoWrapper.addEventListener("mouseleave", onPlayerMouseOut);

            window[player_id].controlBar.btn.volumeNiddle.addEventListener("mousedown", onVolumeNiddleDown);

            if(window[player_id].settings.poster_play_pause_button.visible){
            window[player_id].poster_play_button.addEventListener("click", changePlayerState.bind(window[player_id].player));
            window[player_id].poster_pause_button.addEventListener("click", changePlayerState.bind(window[player_id].player)); 
            }



            // player event
            window[player_id].player.addEventListener("timeupdate", updateProgressBarProgress );

            window[player_id].progressBar.addEventListener("click", onProgressBarProgressClick,true);


            // the player click event listener
            window[player_id].player.addEventListener("click", changePlayerState.bind(window[player_id].player));

            // default hide the close full screen button
            window[player_id].controlBar.btn.closeFullscreenButton.style.display = "none";

            //console.log(window[player_id].poster_play_button);

        }


        var changePlayerState = function(){



            if(this.paused){
                //this.play();
                onPlayButtonClick(this);

            }else{
                //this.pause();
                onPauseButtonClick(this);
            }


        }


        var onPlayerMouseOver = function(){
            var player_id = settings.id; 

            $(window[player_id].video_title).slideDown();
            $(window[player_id].controlBar).slideDown();


        }


        var onPlayerMouseOut = function(){
            var player_id = settings.id; 

            $(window[player_id].video_title).slideUp();
            $(window[player_id].controlBar).slideUp();

        }


        var onVolumeUnitClick = function(e){






        }


        var updatePosterPlayPauseButtonPosition =  function(player_id){


                var wrapperWidth = window[player_id].videoWrapper.offsetWidth;
                var wrapperHeight = window[player_id].videoWrapper.offsetHeight;

                var playbtnWidth = window[player_id].poster_play_button.clientWidth;
                var playbtnHeight = window[player_id].poster_play_button.clientHeight;

                //console.log(playbtnWidth + " " + playbtnHeight);
                console.log(wrapperWidth + " " + wrapperHeight);



                playButtonX = (wrapperWidth / 2)  - (playbtnWidth /2 );
                playButtonY = (wrapperHeight / 2)  - (playbtnHeight /2 );

                window[player_id].poster_play_button.style.left = playButtonX + "px";
                window[player_id].poster_play_button.style.top = playButtonY + "px";

                window[player_id].poster_pause_button.style.left = playButtonX + "px";
                window[player_id].poster_pause_button.style.top = playButtonY + "px";

                //alert("Update poster button");
                //console.log(window[player_id].poster_pause_button);
                //console.log(player_id);

        }

        // on full screen button click
        var onFullScreenButtonClick = function(){
            var player_id = settings.id; 
                


                if(window[player_id].videoWrapper.requestFullscreen){
                    window[player_id].videoWrapper.requestFullscreen();
                } 
                else if (window[player_id].videoWrapper.webkitRequestFullscreen){
                    window[player_id].videoWrapper.webkitRequestFullscreen();
                }
                else if (window[player_id].videoWrapper.mozRequestFullScreen){
                    window[player_id].videoWrapper.mozRequestFullScreen();
                }
                else if (window[player_id].videoWrapper.msRequestFullscreen){
                    window[player_id].videoWrapper.msRequestFullscreen();
                }   

            window[player_id].controlBar.btn.fullscreenButton.style.display = "none";
            window[player_id].controlBar.btn.closeFullscreenButton.style.display = "inline-block";

            
            // on full screen apply : chrome hack
            window[player_id].videoWrapper.style.width = "100%";
            window[player_id].videoWrapper.style.height = "100%";


            window[player_id].isInFullScreen = 1;
             
             // update the poster play pause button after 1 sec. 
             setTimeout(function(){
                updatePosterPlayPauseButtonPosition(player_id);
             },1000);

        }


        // on close full screen button click
        var onCloseFullscreenButtonClick = function(){
            var player_id = settings.id; 
                
            var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
            (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
            (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
            (document.msFullscreenElement && document.msFullscreenElement !== null);

            var docElm = document.documentElement;


            if(isInFullScreen){

                    if (document.exitFullscreen) {
                      document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                      document.msExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                      document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                      document.webkitExitFullscreen();
                    }

             window[player_id].controlBar.btn.fullscreenButton.style.display = "inline-block";
             window[player_id].controlBar.btn.closeFullscreenButton.style.display = "none";  


             // on full screen close - chrome hack
            window[player_id].videoWrapper.style.width = settings.width;
            window[player_id].videoWrapper.style.height = settings.height;
            window[player_id].isInFullScreen = 0;



             // update the poster play pause button after 1 sec. 
             setTimeout(function(){
                updatePosterPlayPauseButtonPosition(player_id);
             },1000);

            }





        }





        // on progress bar click, update video current time and progress bar width.
        var onProgressBarProgressClick = function(e){

            var player_id = settings.id;             
            var clickX = parseFloat(e.clientX);
            var totalWidth = parseFloat(e.target.offsetWidth);

            var currentTime = parseFloat(window[player_id].player.currentTime);
            var totalDuration  = parseFloat(window[player_id].player.duration);

            var timePosition = ( clickX / totalWidth  )  * totalDuration
            
            window[player_id].player.currentTime = timePosition;

            //alert(e.clientX + " " + e.target.offsetWidth);

            // update the progress bar
            updateProgressBarProgress();

        }

        // update the progress bar
        var updateProgressBarProgress = function(e){

            var player_id = settings.id; 
            var currentTime = parseFloat(window[player_id].player.currentTime);
            var totalDuration  = parseFloat(window[player_id].player.duration);
            var progressMaxWdith = 100; // %

            var currentWidth = (currentTime / totalDuration) * progressMaxWdith;
            currentWidth = currentWidth + "%"

            //console.log(currentWidth);

            // updating the progress bar
            window[player_id].progressBarProgress.style.width  = currentWidth;



        }

        // on play button click
        var onPlayButtonClick = function(e){

            var player_id = settings.id; 
        	window[player_id].player.play();
            //window[player_id].poster_play_button.style.display = "none";
            window[player_id].poster_play_button.className = "poster_play_button hide_play_button";
            window[player_id].poster_pause_button.className = "poster_pause_button";
            

           

        }

        // on pause button click
        var onPauseButtonClick = function(e){

            var player_id = settings.id; 

        	window[player_id].player.pause();

            //window[player_id].poster_play_button.style.display = "block"; 
            window[player_id].poster_play_button.className = "poster_play_button";
            window[player_id].poster_pause_button.className = "poster_pause_button hide_pause_button";                	

        }


        // apply the plugin
        return this.each( function(i,videoWrapper) {

            rvideolog(videoWrapper);
        	// initialize plugin only for once. block redundent calling 
        	wrapperObject = jQuery(this);
        	if(!wrapperObject.data("init")){
        		// rvideolog("initializing");
	            var instance = new init( videoWrapper ); // invoke the first funtion 
	            wrapperObject.data( "init", instance );        		
        	} 
        	// 			

			
        });
        

    } // end of plugin defination

}(jQuery));