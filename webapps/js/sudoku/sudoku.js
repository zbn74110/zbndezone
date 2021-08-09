var chess;//棋盘所有棋子的状态
var chessStack = [];//缓存点
var ninenum = ['a','b','c','d','e','f','g','h','i']
var number = 50
alert('来玩一局数独吧')

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
    var say = "";
    for (var i = 0; i < 9; i++)
    {
        for (var j = 0; j < 9; j++)
        {
            say += chess[i][j].num;
			var sayl = chess[i][j].num;
			var nid ='#'+ninenum[i]+(j+1);
			document.querySelector(nid).value=sayl
			document.querySelector(nid).name=sayl
        }
        say += '\n';
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
    creatChess();//创建棋盘
//  setArea(0,3);//随机设置左上角九宫格数字
//  setPre(0,2,5);
    chessInit();//初始化棋盘
    printChess();//打印棋盘
}

chess();
var textInput = document.querySelectorAll('.smak')//获取所有单元格

for (var i=0;i<textInput.length;i++){//遍历单元格以监听事件
	textInput[i].setAttribute('readonly', 'readonly')
	textInput[i].addEventListener('input',function(){//监听输入
	var azbn = 0
	if(this.value==''){
		this.style.fontSize="50px"
		this.style.color=""
	}
	else if(this.value.substring(0,1)=="@"){
		this.style.fontSize="10px"
		this.style.color=""
	}
	else{
		if(this.value.length>1){
			this.value=this.value.substring(1,)
			}
		if (this.value==this.name){
			this.style.color="#888888"
			this.setAttribute('readonly', 'readonly')
			this.style.fontSize="50px"
			azbn++
			if (azbn==number){setTimeout(function(){
				// alert('你赢了')
				var r=confirm("你赢了，要再来一局么？");
				if (r==true){
					x=window.location.reload();
				}
				else{
					x='';
					}
			},
				1000)
				}
			}
		else{
			this.style.color="#ff0000"
			this.style.fontSize="50px"
			}

		}
	})
	
	textInput[i].addEventListener('click',function(){//监听点击
		for (var i=0;i<textInput.length;i++){
			textInput[i].style.backgroundColor=""
			};
			var lzbn = 0
		if (this.hasAttribute('readonly')){
			for (var i=0;i<textInput.length;i++){
				if(textInput[i].hasAttribute('readonly')&&this.value==textInput[i].value){
					textInput[i].style.backgroundColor="ffccff"
					lzbn++
				}
				}
				if (lzbn==9){
					for (var i=0;i<textInput.length;i++){
						if(textInput[i].hasAttribute('readonly')&&this.value==textInput[i].value){
						textInput[i].style.backgroundColor="aaaaaa"
						}
					}
					}

}
})
}

function getAnswer(number){
anwser=[]
for (var i=0;i<number;i++){//随机扣词
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
	document.querySelector('#'+c).value=''
	document.getElementById(c).removeAttribute('readonly')
}
}
getAnswer(number)
/* for(w=0;w<anwser.length;w++){//绘制额外的答题区域（其实没啥用）
	var ans=document.createElement("div")
	var t=document.createTextNode(anwser[w].id)
	ans.appendChild(t)
	ans.setAttribute('id','div'+anwser[w].id)
	ans.style.fontSize="30px"
	ans.style.float="left"
	ans.style.margin="5px"
	document.body.appendChild(ans)
	
	var ipt=document.createElement("input")
	ipt.setAttribute('class','aw')
	ipt.setAttribute('id','new'+anwser[w].id)
	ipt.style.width="100px"
	ipt.style.height="50px"
	ipt.style.float="left"
	ipt.style.margin="5px"
	document.body.appendChild(ipt)
}
var awinput = document.querySelectorAll('.aw')//遍历额外的答题区域以监听事件
for (var i=0;i<awinput.length;i++){
	awinput[i].addEventListener('click',function(){//监听点击
		for (var i=0;i<textInput.length;i++){
			textInput[i].style.backgroundColor=""
		}
		document.getElementById(this.id.substring(3,)).style.backgroundColor="#ccffcc"
	})
	awinput[i].addEventListener('input',function(){//监听输入
		if(this.value.length>1){
			this.value=this.value.substring(1,)
		}
		if(!document.getElementById(this.id.substring(3,)).hasAttribute('readonly')){
			document.getElementById(this.id.substring(3,)).value=this.value
		if (this.value==document.getElementById(this.id.substring(3,)).name){
			document.getElementById(this.id.substring(3,)).style.color="#888888"
			document.getElementById(this.id.substring(3,)).setAttribute('readonly', 'readonly')
			this.setAttribute('readonly', 'readonly')
			this.setAttribute('hidden', 'hidden')
			document.getElementById('div'+this.id.substring(3,)).setAttribute('hidden', 'hidden')
		}}
	})
} */

