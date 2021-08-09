var page = 1

var image = document.getElementById('ground')
image.style.backgroundImage = "url('./mobilefile/"+page+".jpg')"
image.style.width = document.body.scrollWidth+'px'
image.style.height = document.body.scrollHeight+'px'

var buttonBox = document.getElementById('buttonBox')
var last = document.getElementById('last')
var next = document.getElementById('next')

buttonBox.style.width = document.body.scrollWidth+'px'

last.style.width = (document.body.scrollWidth/2-30)+'px'
next.style.width = (document.body.scrollWidth/2-30)+'px'

last.addEventListener('click',function(){
	if(page >= 2){
		page -= 1
	}else{
		page = 8
	}
	image.style.backgroundImage = "url('./mobilefile/"+page+".jpg')"
	console.log(page)
})
next.addEventListener('click',function(){
	if(page <= 6){
		page += 1
	}else{
		page = 1
	}
	image.style.backgroundImage = "url('./mobilefile/"+page+".jpg')"
	console.log(page)
})