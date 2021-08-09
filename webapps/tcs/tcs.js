// 场地
var ground = document.getElementById('ground')
// 死
var si = document.getElementById('si')
var score = document.getElementById('score')

// 方向
var moveD = ''
var lastMoveD = ''
var arrayD = ['l','u','r','d']
// 身体
var sbodys = []
// 食物位置
var foodPosition=['','']
// 头
var head = document.createElement('div')
head.id='head'
head.className = 'sbody'
head.style.top = '250px'
head.style.left = '250px'
head.lastTop = head.style.top
head.lastLeft = head.style.left
ground.appendChild(head)
sbodys.push(head)

// 头位置
var headPosition
saveHP()
// 创建食物

function foodOnBody(){
	for (var i = 0; i < sbodys.length; i++) {
		if ([sbodys[i].style.top,sbodys[i].style.left].toString() == foodPosition.toString()){
			 return false
		}
	}
	return true
}
function createFood(){
	foodPosition[0] = Math.floor(Math.random()*(48-1+1)+1)*10
	foodPosition[1] = Math.floor(Math.random()*(48-1+1)+1)*10
	var food = document.createElement('div')
	food.id='food'
	food.className = 'sbody'
	if (foodOnBody()==true) {
		food.style.top = foodPosition[0]+'px'
		food.style.left = foodPosition[1]+'px'
		ground.appendChild(food)
		return
	} else {
		createFood()
		return
	}
}
createFood()

// 监听键盘
document.body.addEventListener('keydown',function(e){
	lastMoveD = moveD
	if (e.keyCode==37) {//左
		moveD = 'l'
	} else if (e.keyCode==38) {//上
		moveD = 'u'
	} else if (e.keyCode==39) {//右
		moveD = 'r'
	} else if (e.keyCode==40) {//下
		moveD = 'd'
	}
	if ([37,38,39,40].indexOf(e.keyCode) != -1 && si.innerHTML != "死"){
		move(moveD)
	}
})

var fxs = document.getElementsByClassName('fx')
fxs[0].style.left = (document.body.scrollWidth/2-100)+'px'
fxs[1].style.left = ((document.body.scrollWidth-400)/3)+'px'
fxs[2].style.right = ((document.body.scrollWidth-400)/3)+'px'
fxs[3].style.left = (document.body.scrollWidth/2-100)+'px'

for (var i = 0; i < fxs.length; i++) {
	fxs[i].addEventListener('click',function(){
		moveD = this.id
	})
}

var cs = "@keyframes ssi {0% {top: 279px;}20% {font-size: 120px;top: "+(document.body.scrollHeight/2-60).toString()+"px;}40% {font-size: 20px;top: "+(document.body.scrollHeight/2-10).toString()+"px;}60% {font-size: 110px;top: "+(document.body.scrollHeight/2-55).toString()+"px;}80% {font-size: 40px;top: "+(document.body.scrollHeight/2-20).toString()+"px;}100% {font-size: 100px;top: "+(document.body.scrollHeight/2-50).toString()+"px;}}"
document.getElementById('cs').innerHTML = cs
// 游戏结束
function over(y){
	window.clearInterval(st)
	if (y == 0) {
		si.innerHTML = "死"
	} else {
		si.innerHTML ='赢!得分是' + score.innerHTML
	}
	console.log(12)
	si.style.width = document.body.scrollWidth+"px"
	si.style.animationPlayState = 'running';
}

// 移动
function move(D){
	head.lastTop = head.style.top
	head.lastLeft = head.style.left
	
	// 碰边死
	/* if (head.style.top == '-10px' ||
		head.style.left == '-10px' ||
		head.style.top == '500px' ||
		head.style.left == '500px'){
		over(0)
		return
	} */
	// 碰边穿越
	if (head.style.top == '0px' && D == 'u'){
		head.style.top = '500px'
		saveHP()
	} else if (head.style.left == '0px' && D == 'l'){
		head.style.left = '1000px'
		saveHP()
	} else if (head.style.top == '490px' && D == 'd'){
		head.style.top = '-10px'
		saveHP()
	} else if (head.style.left == '990px' && D == 'r'){
		head.style.left = '-10px'
		saveHP()
	}
	// 手动转向+移动头
	if ((D =='l' && lastMoveD != 'r') ||
		(D == 'u' && lastMoveD != 'd') ||
		(D == 'r' && lastMoveD != 'l') ||
		(D == 'd' && lastMoveD != 'u')){
		moveW(D)
	} else {
		D = moveD = lastMoveD
		moveW(D)
	}
	// moveW(D)
	
	// 移动身体
	for (var i = 1; i < sbodys.length; i++) {
		sbodys[i].lastTop = sbodys[i].style.top
		sbodys[i].lastLeft = sbodys[i].style.left
		sbodys[i].style.top = sbodys[i-1].lastTop
		sbodys[i].style.left = sbodys[i-1].lastLeft
	}
	// 吃到食物长身体
	if (foodPosition.toString() == headPosition.toString()){
		food.remove()
		createFood()
		var sbody = document.createElement('div')
		sbody.className = 'sbody'
		sbody.id = 'sbody'
		sbody.style.top = sbodys[sbodys.length-1].lastTop
		sbody.style.left = sbodys[sbodys.length-1].lastLeft
		sbody.lastTop = sbody.style.top
		sbody.lastLeft = sbody.style.left
		sbodys.push(sbody)
		ground.appendChild(sbody)
		score.innerHTML = sbodys.length-1
		if (sbodys.length >= 100){
			score.innerHTML = sbodys.length
			over(1)
			return
		}
	}
	// 如果吃自己死
	for (var j = 1; j < sbodys.length; j++) {
		if (head.style.top == sbodys[j].style.top && head.style.left == sbodys[j].style.left){
			over(0)
			return
		}
	}
}

// 移动头
function moveW(W){
	// 手动
	if (W =='l') {
		head.style.left = getNewPx(headPosition[1],1)
		saveHP()
	} else if (W == 'u') {
		head.style.top = getNewPx(headPosition[0],1)
		saveHP()
	} else if (W == 'r') {
		head.style.left = getNewPx(headPosition[1],0)
		saveHP()
	} else if (W == 'd') {
		head.style.top = getNewPx(headPosition[0],0)
		saveHP()
	}
	// 自动
	/* if (headPosition[0] != foodPosition[0]){
		if (headPosition[0] < foodPosition[0] &&
		W != 'u'){
			moveD = 'd'
			head.style.top = getNewPx(headPosition[0],0)
			saveHP()
		} else if (headPosition[0] > foodPosition[0] &&
		 W != 'd'){
			moveD = 'u'
			head.style.top = getNewPx(headPosition[0],1)
			saveHP()
		} else {
			nMove(W)
		}
		
	} else if (headPosition[1] != foodPosition[1]) {
		if (headPosition[1] < foodPosition[1] &&
		W != 'l'){
			moveD = 'r'
			head.style.left = getNewPx(headPosition[1],0)
			saveHP()
		} else if (headPosition[1] > foodPosition[1] &&
		W != 'r'){
			moveD = 'l'
			head.style.left = getNewPx(headPosition[1],1)
			saveHP()
		} else {
			nMove(W)
		}
	} */
}

function getNewPx(px,tp) {
	if (tp == 0) {
		px = parseInt(px)+10
		return px
	} else {
		px = parseInt(px)-10
		return px
	}
}

function nMove(N){
	if (N =='l') {
		head.style.left = getNewPx(headPosition[1],1)
		saveHP()
	} else if (N == 'u') {
		head.style.top = getNewPx(headPosition[0],1)
		saveHP()
	} else if (N == 'r') {
		head.style.left = getNewPx(headPosition[1],0)
		saveHP()
	} else if (N == 'd') {
		head.style.top = getNewPx(headPosition[0],0)
		saveHP()
	}
}

function saveHP(){
	headPosition = [parseInt(head.style.top.replace('px','')),parseInt(head.style.left.replace('px',''))]
}

var st = self.setInterval('move(moveD)',200)