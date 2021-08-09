//创建所有格子的id
function createId(){
	for(var i=0;i<ninenum.length;i++){
    for(var j=0;j<t2.length;j++){
        if (['a','d','g'].includes(ninenum[i])){
            if (j<3){
                ff=ninenum[i]
                gg=t2[j]
			}
            else if (j>=3 && j<6){
                ff=ninenum[i+1]
                gg=t2[j-3]
			}
            else if (j>=6 && j<9){
                ff=ninenum[i+2]
                gg=t2[j-6]
			}
		}
        else if (['b','e','h'].includes(ninenum[i])){
            if (j<3){
                ff=ninenum[i-1]
                gg=t2[j+3]
			}
            else if (j>=3 && j<6){
                ff=ninenum[i]
                gg=t2[j]
			}
            else if (j>=6 && j<9){
                ff=ninenum[i+1]
                gg=t2[j-3]
			}
		}
        else if (['c','f','i'].includes(ninenum[i])){
            if (j<3){
                ff=ninenum[i-2]
                gg=t2[j+6]
			}
            else if (j>=3 && j<6){
                ff=ninenum[i-1]
                gg=t2[j+3]
			}
            else if (j>=6 && j<9){
                ff=ninenum[i]
                gg=t2[j]
			}
		}
		idm=ff+gg
		ids.push(idm)
	}
}
}

//绘制页面
function drawPage(){
	//绘制大盒子
	var bg=document.createElement("div");
	bg.className='bigk';
	bg.style.height=document.body.scrollHeight+"px";
	bg.style.width=document.body.scrollHeight+"px";
	bg.style.left=(document.body.scrollWidth-document.body.scrollHeight)/2+'px'
	document.body.appendChild(bg);

	//绘制背景图
	var bk=document.createElement("div");
	bk.className='bk';
	bk.style.height=document.body.scrollHeight+"px";
	bk.style.width=document.body.scrollHeight+"px";
	bk.style.left=(document.body.scrollWidth-document.body.scrollHeight)/2+'px'
	document.body.appendChild(bk);

	//绘制中格子
	for (var i=0;i<md.length;i++){
		md[i]=document.createElement("div");
		md[i].className='midk';
		md[i].id=ninenum[i];
		bg.appendChild(md[i]);
		
		//绘制小格子
		for(var j=0;j<sm.length;j++){
			sm[j]=document.createElement("input");
			sm[j].className='smak';
			sm[j].setAttribute('id', ids[i*9+j])
			md[i].appendChild(sm[j])
		}
	}

	//玩法介绍
	var toptip=document.createElement("div")
	toptip.className='toptip';
	toptip.innerHTML="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp玩法介绍<br>";
	document.body.appendChild(toptip)

	//各个格子说明
	var tips=[tip1={
		"va":"@123",
		"sz":"10px",
		"cl":"",
		"bg":"rgba(255,255,255,0 cover)",
		"tt":"@123表示123是候选词"
		},
	tip2={
		"va":"1",
		"sz":"50px",
		"cl":"#888888",
		"bg":"rgba(255,255,255,0 cover)",
		"tt":"表示回答正确"
		},
	tip3={
		"va":"2",
		"sz":"50px",
		"cl":"#ff0000",
		"bg":"rgba(255,255,255,0 cover)",
		"tt":"表示回答错误"
		},
	tip4={
		"va":"3",
		"sz":"50px",
		"cl":"",
		"bg":"url('../img/sudoku_w.jpg') 0% 0% / cover no-repeat no-repeat",
		"tt":"表示已经存在这个数字的格子"
		},
	tip5={
		"va":"4",
		"sz":"50px",
		"cl":"",
		"bg":"#74ffff",
		"tt":"表示可能存在这个数字的格子"
		},
	tip6={
		"va":"5",
		"sz":"50px",
		"cl":"",
		"bg":"#dddddd",
		"tt":"表示这个格子所在的行和列和九宫格"
		},
	tip7={
		"va":"6",
		"sz":"50px",
		"cl":"",
		"bg":"url('../img/sudoku_m.jpg') 0% 0% / cover no-repeat no-repeat",
		"tt":"表示这个数字已经输入9个了！"
		},
	tip8={
		"va":"",
		"sz":"50px",
		"cl":"",
		"bg":"url('../img/zyb.jpg') 0% 0% / cover no-repeat no-repeat",
		"tt":"一起去炸鱼吧！"
		}]
	
	//创建所有说明
	var atips=[atip1=null,atip2=null,atip3=null,atip4=null,atip5=null,atip6=null,atip7=null,atip8=null]
	for (var i=0;i<8;i++){
		atips[i]=document.createElement("div");
		document.body.appendChild(atips[i]);
		createBlEl(atips[i],tips[i]["va"],tips[i]["sz"],tips[i]["cl"],tips[i]["bg"],);
		createTextEl(atips[i],tips[i]["tt"]);
}




//绘制示例
function createBlEl(ele,value,fontSize,color,background){
	var tipp=document.createElement("input");
	tipp.className='tipp';
	tipp.value=value;
	tipp.readonly='readonly';
	tipp.style.fontSize=fontSize;
	tipp.style.color=color;
	tipp.style.background=background;
	ele.appendChild(tipp)
}

//绘制文字
function createTextEl(ele,text){
	var tipt=document.createElement("div")
	tipt.className='tipt';
	tipt.innerHTML=text;
	ele.appendChild(tipt)
}
}

//监听操作
function ListeningOperation(){
	textInput = document.querySelectorAll('.smak')//获取所有格子
	for (var i=0;i<textInput.length;i++){
		textInput[i].setAttribute('readonly', 'readonly')
		textInput[i].addEventListener('input',function(){//监听输入
		var azbn = 0
		this.value=this.value.replace(/[^1-9@]/g , ''); 
		if(this.value==''){
			this.style.fontSize="50px"
			this.style.color="rgba(255,255,255,0)"
		}
		else if(this.value.substring(0,1)=="@"){
			this.style.fontSize="10px"
			this.style.color="rgba(255,255,255,0)"
		}
		else{
			if(this.value.length>1){
				this.value=this.value.substring(this.value.length-1)
				}
			if (this.value==this.name){//如果答案正确，则不用再输入了
				this.style.color="#888888"
				this.setAttribute('readonly', 'readonly')
				this.style.fontSize="50px"
				delNum(this,this.hasAttribute('readonly'))
				onlyOneNum()
				var azbn=0
				for (var i=0;i<81;i++){
					if(textInput[i].value==textInput[i].name){
						azbn++
					}
				if (azbn==81){//全对
					for (var i=0;i<81;i++){
					textInput[i].style.background="rgba(255,255,255,0)"
					}
					document.querySelector('.bk').style.background="url('../img/sudoku_bkgrd_w.jpg') 0% 0% / cover no-repeat no-repeat"
					document.querySelector('.bk').style.opacity='1';
					alert("你赢了",null,2);
					}
				}
			}
			else{//输错
				this.style.color="#ff0000"
				this.style.fontSize="50px"
				}

			}
		})
		
		textInput[i].addEventListener('click',function(){//监听点击
			for (var i=0;i<textInput.length;i++){
				textInput[i].style.background="rgba(255,255,255,0)"
				};
				var lzbn = 0
			if (this.hasAttribute('readonly')){//如果格子已经有数
				for (var i=0;i<textInput.length;i++){
					if(textInput[i].hasAttribute('readonly') && textInput[i].value==this.value){//高亮显示出所有可能的格子
						textInput[i].style.background="url('../img/sudoku_w.jpg') 0% 0% / cover no-repeat no-repeat"
						lzbn++
					}
					else if(!textInput[i].hasAttribute('readonly') && textInput[i].value!=this.value && textInput[i].value.indexOf(this.value)!=-1){
						textInput[i].style.background="#74ffff"
					}
				}
				if (lzbn==9){
					for (var i=0;i<textInput.length;i++){
						if(textInput[i].hasAttribute('readonly')&&this.value==textInput[i].value){//如果已经9个数了，则特殊高亮
							textInput[i].style.background="url('../img/sudoku_m.jpg') 0% 0% / cover no-repeat no-repeat"
							}
						}
					}
				
	}
				xyz=getXYZ(this)
		for(var i=0;i<xyz.length;i++){
				xyz[i].style.background='#dddddd';
		}
		this.style.background="#ffffff"
	})
	}
}

//随机扣词
function setAnswer(number){
anwser=[]
for (var i=0;i<number;i++){
	var a = ninenum[getRandom(9)]
	var b = getRandom(9)
	var c = a+(b+1)
	var d = document.getElementById(c)
	if(!anwser.includes(d)){
		anwser.push(d)
	}
	else{
		i--
	}
	document.getElementById(c).removeAttribute('value')
	document.getElementById(c).removeAttribute('readonly')
}
}

//传入一个元素，找行列和九宫格，返回的是一个元素数组
function getXYZ(ele){
		var xyz =[]
		var X = ele.id.substring(0,1)
		var Y = ele.id.substring(1)
		for(var i=0;i<9;i++){
			var ftid=ele.parentNode.id
			xyz.push(document.getElementById(X+t2[i]))
			xyz.push(document.getElementById(ninenum[i]+Y))
			xyz.push(document.getElementById(ftid).children[i])
			}
		return xyz
}

//添加标注
function setTagging(){
	for(var i=0;i<81;i++){
		if(!textInput[i].hasAttribute('readonly')){
			textInput[i].style.fontSize="10px"
			textInput[i].value="@123456789"
			delNum(textInput[i],(textInput[i].hasAttribute('readonly')))
			onlyOneNum()
		}
	}
}

//移除所填
function delNum(ele,tf){
	var xyz=getXYZ(ele)
	for(var j=0;j<xyz.length;j++){
		if(xyz[j].hasAttribute('readonly')&&!tf){
			ele.value=ele.value.replace(xyz[j].value,'')
		}
		else if(!xyz[j].hasAttribute('readonly')&&tf){
			xyz[j].value=xyz[j].value.replace(ele.value,'')
		}
	}
}

//如果格子里只有一个候选，就用他丫的
function onlyOneNum(){
	for(i=0;i<81;i++){
		if(((textInput[i].value).substring(1)).length==1){
			textInput[i].value=textInput[i].value.replace('@','')
			textInput[i].style.color="#888888"
			textInput[i].setAttribute('readonly', 'readonly')
			textInput[i].style.fontSize="50px"
			delNum(textInput[i],textInput[i].hasAttribute('readonly'))
		}
	}
}

//创建棋盘
function creatChess()
{
    chess = [];
    for (var i = 0; i < 9; i++)
    {
        chess[i] = [];
        for (var j = 0; j < 9; j++)
        {
            chess[i][j] = {num:0,fixed:false,temp:[1,2,3,4,5,6,7,8,9]};
        }
    }
}

//打印棋盘
function printChess()
{
    for (var i = 0; i < 9; i++)
    {
        for (var j = 0; j < 9; j++)
        {
			var sayl = chess[i][j].num;
			var nid ='#'+ninenum[i]+(j+1);
			(document.querySelector(nid)).setAttribute('name',sayl);
			(document.querySelector(nid)).setAttribute('value',sayl);
        }
    }
}

//预先设置互不影响的九宫格位置数字
function setArea(a,b)
{
    var temp = [1,2,3,4,5,6,7,8,9];//每个小九宫格包含的九个数字
    for (var i = a; i < b; i++)
    {
        for (var j = a; j < b; j++)
        {
            var len = temp.length;//temp剩下的长度
            var index = getRandom(len);//随机抽取一个
            chess[i][j].num = temp[index];//赋值
            chess[i][j].fixed = true;//赋值
            temp.splice(index,1);//删除已赋值的
        }
    }
}

//设定数字 可以求解
function setPre(r,c,v)
{
    chess[r][c] = {num:v,fixed:true,temp:[]};
}

//获取一个随机数字下标
function getRandom(a)
{
    return Math.floor(Math.random()*a);
}

//初始化棋盘
function chessInit()
{
    for (var i = 0; i < 9; i++)
    {
        for (var j = 0; j < 9; )
        {
            //当数字确定了 则下一个 不然随机取一个
            if (!chess[i][j].fixed)
            {
                var len = chess[i][j].temp.length;//temp剩下的长度
                //当还有可选数字
                if (len > 0)
                {
                    var index = getRandom(len);//随机抽取一个
                    chess[i][j].num = chess[i][j].temp[index];//赋值
                    chess[i][j].temp.splice(index,1);//删除已赋值的
                    chessStack.push([i,j,JSON.parse(JSON.stringify(chess))]);//存储
                    chess[i][j].fixed = true;//变为确定
                    if(!checkTempNum(i,j))
                    {
                        var cs = chessStack.pop();//退格
                        i = cs[0];
                        j = cs[1];
                        chess = cs[2];//取出棋盘存储点
                    }
                }
                else
                {
                    // 当没有可选数字了
                    var cs = chessStack.pop();//退格
                    i = cs[0];
                    j = cs[1];
                    chess = cs[2];//取出棋盘存储点
                }
            }
            else
            {
                j++;//进一个
            }
        }
    }
}


//删除特定元素
function removeByValue(r,c,v)
{
    if (chess[r][c].num == v)
    {
        return false;//冲突了
    }
    if (chess[r][c].fixed)
    {
        return true;//已经确定了 则无需删除了
    }
    var len = chess[r][c].temp.length;
    for (var i = 0; i < len; i++)
    {
        if (chess[r][c].temp[i] == v)
        {
            chess[r][c].temp.splice(i,1);//删除备选数字
            break;//退出
        }
    }
    return chess[r][c].temp.length==0?false:true;//没有确定而且没有备选元素了 那么返回错误
}

//移除相关20格备选列表某数字
function checkTempNum(r,c)
{
    var i,j;
    var num = chess[r][c].num;//要移除的数字
    //检查列
    for (i = 0; i < 9 ; i++)
    {
        if (i != r && !removeByValue(i,c,num)) return false;//移除备选数字和判定数字合法性
    }
    //检查行
    for (j = 0; j < 9 ; j++)
    {
        if(j != c && !removeByValue(r,j,num)) return false;//移除备选数字和判定数字合法性
    }
    //检查小九宫
    var left = Math.floor(r/3)*3;//得出小九宫的左上角坐标
    var top = Math.floor(c/3)*3;//得出小九宫的左上角坐标
    for (i = left; i < left+3; i++)
    {
        for (j = top; j < top+3; j++)
        {
            if (i == r && j == c)
            {
                continue;//同一个格子跳过
            }
            if(!removeByValue(i,j,num)) return false;//移除备选数字和判定数字合法性
        }
    }
    return true;
}

//初始化
function chess()
{
	createId();//创建id
	drawPage();//绘制页面
	ListeningOperation();//监听操作
	creatChess();//创建棋盘
    chessInit();//初始化棋盘
    printChess();//打印棋盘
	setAnswer(number);//设置答案
	setTagging();//添加候选
	onlyOneNum();//剔除只有一个候选的格子
}