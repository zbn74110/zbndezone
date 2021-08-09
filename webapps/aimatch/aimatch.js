var bt = document.getElementById('bt')
var m = document.getElementById('match')
bt.addEventListener('click',function(){
	var matchWord = document.getElementById('matchWord').value
	var matchCentence = document.getElementById('matchCentence').value
	reg = eval('/([^a-zA-Z]|^)('+matchWord+')([^a-zA-Z]|$)/i')
	if (matchCentence.match(reg)){
		m.innerHTML = matchCentence.replace(reg,"$1<span style='color:#ff0000'>$2</span>$3")
	} else {
		m.innerHTML = '<span style='color:#ff0000'>没有找到匹配！</span>'
	}
})
