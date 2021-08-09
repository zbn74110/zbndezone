var clickarea = document.getElementById("clickarea")
ti = 0
var time = self.setInterval(function(){
	if (ti != 5) {
		console.log(ti)
		ti += 1
	} else{
		window.clearInterval(time)
		document.getElementById("jss").value = "结束"
		clickarea.removeEventListener("click",cl)
	}
},1000)
clickarea.addEventListener("click",cl)
function cl() {
	clickarea.innerHTML = parseInt(clickarea.innerHTML) + 1
}
