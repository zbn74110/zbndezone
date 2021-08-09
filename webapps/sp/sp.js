var sz = document.getElementById('my-player')
sz.style.width = document.body.scrollWidth+'px'
sz.style.height = (document.body.scrollHeight-100)+'px'
var player = videojs('my-player');
var options = {};

var player = videojs('my-player', options, function onPlayerReady() {
  videojs.log('Your player is ready!');

  // In this context, `this` is the player that was created by Video.js.

  // How about an event listener?
  this.on('ended', function() {
    videojs.log('Awww...over so soon?!');
  });
});

var bu = document.getElementsByClassName('vjs-big-play-button')
bu[0].style.position = 'fixed'
bu[0].style.top = ((document.body.scrollHeight/2)-24)+'px'
bu[0].style.left = ((document.body.scrollWidth/2)-45)+'px'
var cz = document.getElementById('cz')
cz.style.width = document.body.scrollWidth+'px'
cz.addEventListener('click',function(){
	try {
		sz.firstChild.src = './1.mp4'
		document.body.children[0].firstChild.src = './1.mp4'
	} catch(e){
		document.body.children[0].firstChild.src = './1.mp4'
	}
	
})