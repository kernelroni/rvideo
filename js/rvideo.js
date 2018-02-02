function rvideolog(msg){
	
	console.log(msg);
	
}



(function($) {

    $.fn.rvideo = function( options ) {

        // Establish our default settings
        var settings = $.extend({
            mp4url         : 'videos/mov_bbb.mp4',
            oggurl         : 'videos/mov_bbb.ogg',
            width    	: 320,
			height		: 240,
			playlist	: [],
			playlist_container_id : "rvideo-playlist",
			
			
        }, options);

        return this.each( function(i,wrapper) {            
			// the selector elements
			rvideolog(wrapper);
			var rplayer = jQuery(wrapper).children("video")[0];
			
			rvideolog(rplayer);
			
			if (rplayer.canPlayType("video/mp4")) {
				rplayer.setAttribute("src",settings.mp4url);
			} else {
				rplayer.setAttribute("src",settings.oggurl);
			}			

			
			rplayer.setAttribute("controls", "controls");
			
			
        });

    }

}(jQuery));