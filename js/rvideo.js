function rvideolog(msg){
	
	console.log(msg);
	
}

window.onload = function(){
	
	return;
	//rvideolog(rvideo);
	
	var videoTag = document.getElementById(rvideo_id);

	
    if (rvideo.canPlayType("video/mp4")) {
        rvideo.setAttribute("src","videos/mov_bbb.mp4");
    } else {
        rvideo.setAttribute("src","videos/mov_bbb.ogg");
    }


	rvideolog(videoTag);
	
	
    videoTag.setAttribute("width", "320");
    videoTag.setAttribute("height", "240");
    videoTag.setAttribute("controls", "controls");
    //document.getElementById(rvideo_wrapper_id).appendChild(rvideo);

	
};



(function($) {

    $.fn.html5rvedio = function( options ) {

        // Establish our default settings
        var settings = $.extend({
            mp4         : 'videos/mov_bbb.mp4',
            ogg         : 'videos/mov_bbb.ogg',
            width    	: 0,
			height		: 0,
			playlist	: [],
			playlist_container_id : "rvideo-playlist",
			
			
        }, options);

        return this.each( function() {            
			// the selector elements
			var rvideo = this;
			
			if (rvideo.canPlayType("video/mp4")) {
				rvideo.setAttribute("src",settings.mp4);
			} else {
				rvideo.setAttribute("src",settings.ogg);
			}			
			
			rvideo.setAttribute("controls", "controls");
			
			
        });

    }

}(jQuery));