//
// Video
//

'use strict';

var video = (function(){
    if($(".video-banner").length > 0){
        $(".video-banner").ready(function(){
            // console.log("play video");
            setTimeout(function(){
                var video= $(".video-banner").get(0);
                if ( video.paused ) {
                    video.muted=false;
                    video.play();
                }
            },3000)
        });
    }
})();