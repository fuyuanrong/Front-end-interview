// 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id
// const value = '112'
// const fn = (value) => {
// ...
// }
fnc(112) // 输出 [1， 11， 112]

function fnc(value){
	let len = value.length;
	let  resultArr  = [];
	for (var i = 0; i < len; i++) {
		resultArr[i] = "";
	}
	for (var i = 0; i < value.length; i++) {
		for (var j = i; j >= 0; j--) {
			resultArr[i]= value[j] + resultArr[i];
		}
	}
	return resultArr
}
// --------------------------------------------------------------------------------------
// 某公司 1 到 12 月份的销售额存在一个对象里面如下：
// {1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。

let  obj = {1:222, 2:123, 5:888}
let resultArr = [];
for (var i = 0; i < 12; i++) {
	resultArr[i] = null;
}
for(let i in  obj){
	if(obj.hasOwnProperty(i)){
		resultArr[Number(i)-1] = obj[i];
	}
}
console.log(resultArr)

// 方法2
let arr = new Array(12).fill(null).map((item,index)=>{
	return obj[index+1]||null
})

// 实现一个函数 5.add(3).minus(2)功能。例：5 + 3 - 2，结果为 6

Number.prototype.add = function(v) {
	v =  v?Number(v):0
	return this + v
};
Number.prototype.minus = function(v){
	v =  v?Number(v):0
	return this - v
}

// --------------------------------------------------------------------------------------

// 美团面试题
	function fn(){
		return new Promise((resolve)=>{
			console.log('promise1');
			fn1();
			setTimeout(() => {
				console.log('promise2');
				resolve('');
				console.log('promise3');
			}, 0);
		})
	}
	async function fn1(){
		var p = Promise.resolve().then(()=>{
			console.log('promise6');
		})
		await p.then(()=>{
			console.log('promise7');
		})
		console.log('end');
	}
	console.log('script');
	setTimeout(() => {
		console.log('setTimeout');
	}, 0);
	fn().then(()=>{
		console.log('promise4');
	})

	// 结果

	/*
		script
		promise1

		**fn1**
		promise6
		promise7
		end

		setTimeout
		promise2
		promise3
		promise4

		解析
		异步
		宏
		setTimeout
		promise2
		promise3

		微
		resolve('')
	
	
	*/

// --------------------------------------------------------------------------------------

	// 阿里面试题  输出什么?
	var length = 10;
	function test(){
		console.log(this.length);
	}
	var obj = {
		length:10,
		action:function(){
			test();      // 10
			arguments[0]();   //4
		}
	}
	obj.action(test,1,[1,2],4);
	//解析:arguments : 参数的类数组   arguments[0] ==> arguments.test()  
	//规则: 函数在运行时,看有没有调用者,如果没有调用者就指向window

// --------------------------------------------------------------------------------------

	// 作用域
	var a = 10;
	function test(){
		console.log(a);   // undefined   var 变量提升
		a = 100;
		console.log(this.a);  //this  指向window
		var a;
		console.log(a);     // 此时129行a = 100;
	}
	test();    //undefined 10 100
// --------------------------------------------------------------------------------------
