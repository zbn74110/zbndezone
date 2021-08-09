var ground = document.getElementById("ground")
var pground = document.getElementById("pground")
var sons = Array.prototype.slice.call(pground.children)
var asons = Array.prototype.slice.call(ground.children)
var moveDom
lis(sons)
map = [[-9999,parseInt(sons[0].style.left.replace('px',''))+160],
[parseInt(sons[0].style.left.replace('px',''))+160,parseInt(sons[1].style.left.replace('px',''))+160],
[parseInt(sons[1].style.left.replace('px',''))+160,parseInt(sons[2].style.left.replace('px',''))+160],
[parseInt(sons[2].style.left.replace('px',''))+160,parseInt(sons[3].style.left.replace('px',''))+160],
[parseInt(sons[3].style.left.replace('px',''))+160,9999]]

map = [[-9999,200],[200,390],[390,580],[580,770],[770,9999]]

document.addEventListener('mousedown',mouseDown, false)
document.addEventListener('mouseup', mouseUp, false)

function getMouseP(e){
	for (var i=0;i<map.length;i++){
		if (e.clientX-100 >= map[i][0] && e.clientX-100 < map[i][1]){
			return i
		}
	}
}
function mouseInG(e){
	console.log()
	if(e.clientY >= 50 && e.clientY <= 250){
		if(e.clientX >= 100 && e.clientX <= 1100){
			return true
		}else{
			return false
		}
	}else{
		return false
	}
}
function createP(dom,mouseP){
	removeP()
	var P = dom.cloneNode(true)
	P.id = 'P'
	P.style.zIndex = ''
	P.style.opacity = '0.5'
	if(mouseP==0){P.style.left = '40px'}else{P.style.left = map[mouseP][0]+25+'px'}
	P.style.top = '25px'
	P.removeEventListener('mousedown',mouseDown, false)
	P.removeEventListener('mouseup', mouseUp, false)
	ground.appendChild(P)

}

function removeP(){
	if(document.getElementById('P')){
		ground.removeChild(document.getElementById('P'))
	}else{
		return false
	}
}

function lis(arr){
	for (var i = 0; i < arr.length; i++) {
		arr[i].style.top = '25px'
		arr[i].style.left = (40*(i+1)+150*i)+'px'
	}
}

function intol(dom,arr,pst) {
	front = []
	bihand = []
	arr.splice(arr.indexOf(dom),1)
	for (var i = 0; i < arr.length; i++) {
		if (i < pst) {
			front.push(arr[i])
		} else{
			bihand.push(arr[i])
		}
	}
	front.push(dom)
	arr = front.concat(bihand)
	lis(arr)
	return arr
}

function mouseDown(e) {
	if (e.target.className == 'son') {
		moveDom = e.target
		moveDom.style.zIndex = 999
		diffX = e.clientX-moveDom.style.left.replace('px','')
		diffY = e.clientY-moveDom.style.top.replace('px','')
		if (mouseInG(e)){
			// if ()
			createP(moveDom,getMouseP(e))
		}else{
			removeP()
		}
		moveDom.innerHTML = '起飞'
		document.addEventListener("mousemove", mouseMoved, false);
	} else{
		return
	}
}

function mouseUp(e) {
	if (e.target.className == 'son') {
	removeP()
	moveDom.style.zIndex = ''
	document.removeEventListener("mousemove", mouseMoved, false);
	for (var i = 0; i < sons.length; i++){
		if(sons[i].id != sons[i].innerHTML){
			sons[i].innerHTML = sons[i].id
		}
	}
	for (var i = 0; i < map.length; i++) {
		if (e.clientX-100 >= map[i][0] && e.clientX-100 < map[i][1]) {
			sons = intol(moveDom,sons,i)
			return
		}
	}
	} else{
		return
	}
}

function mouseMoved(e) {
		moveDom.style.left = (e.clientX-diffX)+'px'
		moveDom.style.top = (e.clientY-diffY)+'px'
		if (mouseInG(e)){
			// if ()
			createP(moveDom,getMouseP(e))
		}else{
			removeP()
		}
		
}

