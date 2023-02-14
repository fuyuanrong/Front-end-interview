// 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id
// const value = '112'
// const fn = (value) => {
// ...
// }
fn(112) // 输出 [1， 11， 112]

function fn(value){
	let len = value.length;
	let result = [];
	for (var i = 0; i < len; i++) {
		result[i]='';
	}
	for (var i = 0; i < value.length; i++) {
		for (var j = i; j >= 0; j--) {
			result[i]= value[j] + result[i];
		}
	}
	return result
}
// 某公司 1 到 12 月份的销售额存在一个对象里面如下：
// {1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。

let  obj = {1:222, 2:123, 5:888}
let result = [];
for (var i = 0; i < 12; i++) {
	result[i] = null
}
for(let i in  obj){
	if(obj.hasOwnProperty(i)){
		result[Number(i)-1] = obj[i]
	}
}
console.log(result)

// 实现一个函数 5.add(3).minus(2)功能。例：5 + 3 - 2，结果为 6

Number.prototype.add = function(v) {
	v =  v?Number(v):0
	return this + v
};
Number.prototype.minus = function(v){
	v =  v?Number(v):0
	return this - v
}
