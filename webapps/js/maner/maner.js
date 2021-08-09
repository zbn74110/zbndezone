var blg = [];
var num = 10;
var idz = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

var pg = document.createElement("div");
pg.id = "pg";
pg.className = "pg";
pg.style.width = document.body.scrollWidth + "px";
pg.style.height = document.body.scrollWidth + "px";
// pg.style.left = (document.body.scrollWidth - document.body.scrollHeight) / 2 + "px";
document.body.appendChild(pg);

var bk = document.createElement("div");
bk.id = 'bk';
bk.style.height = document.body.scrollWidth + "px";
bk.style.width = document.body.scrollWidth + "px";
// bk.style.left = (document.body.scrollWidth - document.body.scrollHeight) / 2 + 'px';
document.body.appendChild(bk);

var bbk = document.createElement("div");
bbk.id = 'bbk';
bbk.style.height = document.body.scrollWidth + "px";
bbk.style.width = document.body.scrollWidth + "px";
// bbk.style.left = (document.body.scrollWidth - document.body.scrollHeight) / 2 + 'px';
document.body.appendChild(bbk);

//批量创建格子
for (var i = 0; i < 10; i++) {
	for (var j = 1; j <= 10; j++) {
		window[idz[i] + j] = document.createElement("div");
		window[idz[i] + j].id = idz[i] + j;
		window[idz[i] + j].className = "mn";
		window[idz[i] + j].isMn = false;
		window[idz[i] + j].isFlag = false;
		window[idz[i] + j].isTurn = false;
		window[idz[i] + j].setAttribute('onselectstart', "return false");
		pg.appendChild(window[idz[i] + j]);
		blg.push(window[idz[i] + j]);
	};
};

//随机数
function getRandom(a) {
	return Math.floor(Math.random() * a);
};

//设置雷子
function createMn() {
	aws = [];
	for (var i = 0; i < num; i++) {
		var aaa = getRandom(blg.length);
		var bbb = blg[aaa];
		if (!aws.includes(bbb)) {
			bbb.isMn = true;
			aws.push(bbb);
		} else {
			i--;
		}
	};
};

function isTrue(a, b) {
	if (a && b) {
		return a + b;
	} else {
		return null;
	}
};

//找周围的八个格子
function findRound(ele) {
	var roundELe = [];
	idzv = ele.id.substring(0, 1);
	idnum = Number(ele.id.substring(1));
	if (idz.indexOf(idzv) == 0) {
		idzs = null;
	} else {
		idzs = idz[idz.indexOf(idzv) - 1];
	}
	if (idz.indexOf(idzv) == idz.length - 1) {
		idzx = null;
	} else {
		idzx = idz[idz.indexOf(idzv) + 1];
	}
	if (idnum == 1) {
		idnumz = null;
	} else {
		idnumz = idnum - 1;
	}
	if (idnum == idz.length) {
		idnumy = null;
	} else {
		idnumy = idnum + 1;
	}
	// idzs+idnumz|idzs+idnum|idzs+idnumy
	// idzv+idnumz|idzv+idnum|idzv+idnumy
	// idzx+idnumz|idzx+idnum|idzx+idnumy
	roundELeId = [n1 = isTrue(idzs, idnumz), n2 = isTrue(idzs, idnum), n3 = isTrue(idzs, idnumy), n4 = isTrue(idzv, idnumz), n5 = isTrue(idzv, idnumy), n6 = isTrue(idzx, idnumz), n7 = isTrue(idzx, idnum), n8 = isTrue(idzx, idnumy)];
	for (var i = 0; i < 8; i++) {
		if (roundELeId[i]) {
			roundELe.push(document.getElementById(roundELeId[i]));
		}
	}
	return roundELe;
};

//当点击的格子周围没有雷时，循环查找周围的格子有没有雷
function zeroTopo(list) {
	for (var i = 0; i < list.length; i++) {
		if (!list[i].isTurn && !list[i].isMn) {
			list[i].isTurn = true;
			rd = findRound(list[i]);
			nb = 0;
			for (var j = 0; j < rd.length; j++) {
				if (rd[j].isMn) {
					nb++;
				}
			}
			if (nb == 0) {
				zeroTopo(rd);
			} else {
				list[i].innerText = nb;
			}
			list[i].style.background = "rgba(200,200,200,0)";
			turn++;
		}
	}
}

var isdb;
function aa() {
	isdb = false;
	window.setTimeout(cc, 500);
	function cc() {
		if (isdb) return;
	};
};

function bb() {
	isdb = true;
	return
};

createMn();
turn = 0;

for (var i = 0; i < 100; i++) {
	blg[i].addEventListener('click',
	function() {
		if (this.isMn && !this.isFlag && !this.isTurn) {
			this.style.background = 'rgba(255,0,0,1)';
			alert('你输了', '', 2);
		} else if (this.isFlag && !this.isTurn) {} else if (!this.isMn && !this.isTurn) {
			this.isTurn = true;
			roundELe = findRound(this);
			roundELeMnNum = 0;
			for (var j = 0; j < roundELe.length; j++) {
				if (roundELe[j].isMn) {
					roundELeMnNum++;
				}
			}
			if (roundELeMnNum == 0) {
				zeroTopo(roundELe);
			} else {
				this.innerText = roundELeMnNum;
			}
			this.style.background = "rgba(200,200,200,0)";
			turn++;
			if (turn == 90) {
				document.getElementById('bbk').setAttribute('hidden','hidden');
				for (var i = 0; i < 100; i++){
					if(blg[i].style.background != "rgba(200,200,200,0)"){
						blg[i].style.background = "rgba(200,200,200,0)"
					}
				}
				setTimeout(function(){alert('你赢了', '', 2)}
				,1000)
			}
		}
	},
	false);

	blg[i].addEventListener('contextmenu',
	function(ev) {
		ev.preventDefault();
		if (!this.isFlag && !this.isTurn) {
			this.isFlag = true;
			this.style.background = 'rgba(0,255,0,1)';
		} else if (this.isFlag && !this.isTurn) {
			this.isFlag = false;
			this.removeAttribute('style');
		}
		return false
	},
	false);

	blg[i].addEventListener('dblclick',
	function(ev) {
		ev.preventDefault();
		if (!this.isMn && !this.isFlag && this.isTurn && this.innerText) {
			roundELe = findRound(this);
			var isf = [],
			ism = [];
			for (var i = 0; i < roundELe.length; i++) {
				if (roundELe[i].isFlag) {
					isf.push(roundELe[i]);
				}
				if (roundELe[i].isMn) {
					ism.push(roundELe[i]);
				}
			}
			var ow = false;
			if (isf.length == ism.length) {
				for (var i = 0; i < ism.length; i++) {
					if (isf[i] == ism[i]) {
						ow = true;
					} else if (ism.includes(isf[i])) {
						ow = true;
					} else {
						ow = false;
						break
					}
				}
				if (!ow) {
					alert('你输了', '', 2);
				}

				if (ow) {
					zeroTopo(roundELe);
				}
			} else {
				for (var j = 0; j < roundELe.length; j++) {
					if (!roundELe[j].isTurn && !roundELe[j].isFlag) {
						roundELe[j].backgroundor = roundELe[j].style.background;
						roundELe[j].style.background = 'rgba(255,255,0,1)';
					}
				}
				setTimeout(function() {
					for (var n = 0; n < roundELe.length; n++) {
						if (!roundELe[n].isTurn && !roundELe[n].isFlag) {
							roundELe[n].style.background = roundELe[n].backgroundor;
						}
					};
				},
				200);
			}
			if (turn == 90) {
				document.getElementById('bbk').setAttribute('hidden','hidden');
				for (var i = 0; i < 100; i++){
					if(blg[i].style.background != "rgba(200,200,200,0)"){
						blg[i].style.background = "rgba(200,200,200,0)"
					}
				}
				setTimeout(function(){alert('你赢了', '', 2)}
				,1000)
			}
		}
	},
	true);
}