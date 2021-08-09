(function(win,doc) {
        var alert = function(text,time,code) {
            //实现alert
            var point = doc.createElement("div");
			point.id="point";
			document.body.appendChild(point)
			var div = doc.createElement("div");
			div.id = 'alt'
            div.className = "animated  bounceInDown";
            div.innerHTML = text;
            point.appendChild(div);
			var bt = doc.createElement("div");
			bt.id='rld'
			bt.setAttribute('onclick',"window.location.reload()");
			bt.innerHTML="再来一局";
            if(code==1){
				setTimeout(function() {
                document.body.removeChild(point);
            }, time);
			}
			else if(code==2){
				div.appendChild(bt);
			}
        }
        win.alert=alert;//导出
    })(window,document);
    alert("来一局数独吧！<br>赢了我们就去炸鱼吧！",3000,1);