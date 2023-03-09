

// 同步
console.log("同步");
console.time("time");
for (let i = 0; i <1000000000; i++) {};
console.timeEnd("time");//用于测试循环时间也方便表示循环结束
console.log("同步")
// 异步
console.log("异步");
setTimeout(function(){
	console.time("time");
	for (let i = 0; i <1000000000; i++) {};
	console.timeEnd("time");//用于测试循环时间也方便表示循环结束
},1000)
console.log("异步")


console.log("异步1");
setTimeout(function(){
	console.log("异步2")
},0)
console.time("time");
	for (let i = 0; i <10000000000; i++) {};
console.timeEnd("time");
console.log("异步3")



// promise解决回调地狱
function Grisaia() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Grisaia");
			resolve()
		}, 1000);
	})
}
function kasami() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("kasami");
			resolve()
		}, 1000);
	})
}
function katsuki() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("katsuki");
			resolve()
		}, 1000);
	})
}
Grisaia().then(kasami).then(katsuki);
//或者
// await一定要配合async
// 这种方式相对于promise的then调用更易于调换执行顺序
(async function () {
    await Grisaia();
    await kasami();
    await katsuki();
})()



//                                             async/await 来处理异步  实现同步
// async：声明一个异步函数(async function someName(){...})

// 自动将常规函数转换成Promise，返回值也是一个Promise对象；
// 只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数；
// 异步函数内部可以使用await。

// await：暂停异步的功能执行(var result = await someAsyncCall())

// 放置在Promise调用之前，await强制其他代码等待，直到Promise完成并返回结果；
// 只能与Promise一起使用，不适用与回调一起使用；
// 只能在async函数内部使用。

// async、await 优缺点
// async 和 await相比直接使用 Promise来说，优势在于处理then的调用链，能够更清晰准确的写出代码；
// 缺点在于滥用await可能会导致性能问题，因为 await会阻塞代码，也许之后的异步代码并不依赖于前者，但仍然需要等待前者完成，导致代码失去了并发性。

async function timeout() {
    return 'hello world'
}
timeout().then(result => {
    console.log(result);
})
console.log('虽然在后面，但是我先执行');

// async 函数返回的是一个promise 对象，如果要获取到promise 返回值，应该用then 方法
async function timeout(flag) {
    if (flag) {
        return 'hello world'
    } else {
        throw 'my god, failure'
    }
}
console.log(timeout(true))  // 调用Promise.resolve() 返回promise 对象。
console.log(timeout(false)); // 调用Promise.reject() 返回promise 对象。
//函数内部抛出错误 promise 对象的catch 捕获错误
timeout(false).catch(err => {
    console.log(err)
})

// Example
// 2s 之后返回双倍的值
function doubleAfter2seconds(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2 * num)
        }, 2000);
    } )
}

async function testResult() {
    let result = await doubleAfter2seconds(30)
    console.log(result)
}
testResult() // 打开控制台，2s 之后，输出了60.

// 具体到 我们的代码, 遇到await之后，代码就暂停执行了， 等待doubleAfter2seconds(30)执行完毕，
// doubleAfter2seconds(30)返回的promise开始执行，2 秒之后，promise执行resolve 了， 并返回了值为60， 
// 这时await才拿到返回值60， 然后赋值给result， 暂停结束，代码才开始继续执行，执行console.log语句。



async function testResult() {
    let first = await doubleAfter2seconds(30);
    console.log(first)  //两秒后输出60
    let second = await doubleAfter2seconds(50);
    console.log(second)   //两秒后输出100
    let third = await doubleAfter2seconds(30);
    console.log(third)    //两秒后输出60
    console.log(first + second + third);
}
// 解读:
//  await 表示等一下 所有doubleAfter2seconds依次执行完毕后赋值给对应的first,second,third
// 6秒后，控制台输出220, 写异步代码就像写同步代码一样，再也没有回调地狱了

await Promise.all([doubleAfter2seconds(30),doubleAfter2seconds(50),doubleAfter2seconds(30)])
// 2秒后直接输出是一个结果数组  再处理数组
// Promise.all()将异步调用并行执行，而不是一个接一个执行，如下所示


Promise.all
Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

Promise.all([promise1, promise2]).then(success1, fail1)
// promise1和promise2都成功才会调用success1,有一个报错,就返回错误

Promise.allSettled([promise1,promise2]).then(success1.fail1)
// 同时返回全部的promise结果(无论成功或失败)
// /返回的是数组对象
// { status:"fulfilled",value:}
// { status:"rejected",reason:}


Promise.race
Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

Promise.race([promise1, promise2]).then(success1, fail1)
// promise1和promise2只要有一个成功就会调用success1

Promise.any([promise1, promise2]).then(success1, fail1)
//返回执行最快完成的Promise

