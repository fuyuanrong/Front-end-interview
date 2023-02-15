function verification(n){
	var arr = [];
	for (var i = 0; i < n; i++) {
		var type = parseInt(Math.random()*122)
		if(type>=0&&type<=9){
			arr.push(type);
		}else if(type>=65&&type<=90||type>=97&&type<=122){
			arr.push(String.fromCharCode(type));
		}else{
			i--
		}
	}
	return arr.join("")
}