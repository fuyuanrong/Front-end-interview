/*
	node核心模块
		process
			-表示当前node进程
			-通过该对象可以获取进程的信息,或者堆进程进行各种操作
			-如何使用
				1.process是一个全局变量,可以直接使用
				2.属性方法
					process.exit()   结束当前进程,终止node
					ep:
						console.log(11111)
						process.exit()    //只输出11111
						console.log(22222)
						console.log(33333)
					process.nextTick(callback[,...args])   浏览器中没有
						将函数插入到tick队列中
						tick队列中的代码会在下一次事件循环之前执行
						代码执行顺序就是 调用栈=>tick队列=>微任务队列=>宏任务队列
						js:
							setTimeout(()=>{
								console.log(1)
							})
							queueMicrotask(()=>{
								console.log(2)
							})  //微任务队列
							process.nextTick(()=>{
								console.log(3)   //tick队列
							})
							console.log(4)
							结果:4321
		path
			-表示的路径
			-通过path可以用来获取各种路径
			-要使用path,需要先对其进行引入
				const path = require("node:path")
				console.log(path)
			-常用方法:
				path.resolve([...paths])
					-用来生成一个绝对路径
						相对路径:./xxx  ../xxx   xxx
						绝对路径: C:\xxx     /User/xxx     http://www.xxx.com/
					-如果直接调用resolve,则返回当前的工作目录
						通过不同的方式执行代码,他的工作目录可能发生变化
					-如果参数为相对路径,则resolve会自动转换为绝对路径
						此时根据工作目录的不同,所产生的绝对路径也不同
					-一般会将一个绝对路径为第一个参数,一个相对路径作为第二个参数
					    这样会自动计算触最终路径
						const path = require("node:path")
						let result = path.resolve(
							'F:\\project\\Front-end-interview\\面试题',
							'./Node.js'
						)
						console.log(result)
					-最终形态
						const path = require("node:path")
						let result = path.resolve(__dirname,'./Node.js')
						console.log(result)
		fs (file system)							
			-fs用来帮助node来操作磁盘中的文件 
			-文件操作也就是所谓的I/O,input output
			-使用fs模块,同样需要引入
				const fs = require("node:fs");
				const path = require("node:path");
				const buf = fs.readFileSync(path.resolve(__dirname,"./Node.js"));   // readFileSync 同步读取文件方法会阻塞后边代码执行   用path  __dirname 路径不容易出错
				console.log(buf.toString())
				//当通过fs模块读取磁盘中的文件时,读取到的数据会以一种Buffer对象的形式返回
				// Buffer是一个临时用来缓存数据的缓冲区(因为读取到的数据可能是图片,文字,视频,音频等)

				// fs.readFileSync 是同步的方法,不推荐使用  出错需要写 try catch
				// fs.readFile 是异步的读取文件方法,不会阻塞后续代码的运行
				使用方法:
				fs.readFile(
					path.resolve(__dirname,"./Node.js"),
					(err,buffer)=>{
						if(err){
							console.log('出错了',err)
						}else{
							console.log(buffer.toString())
						}

					}
				)
				//Promise版本的fs方法  有node版本要求 14以上   promises 复数
					const fs = require("node:fs/promises");
					fs.readFile(path.resolve(__dirname,"./Node.js"))
					.then(buffer=>{
						console.log(buffer.toString())
					})
					.catch(err=>{
						console.log(err)
					})
					或者
					;(async ()=>{
						try{
							const buffer = await fs.readFile(path.resolve(__dirname,"./Node.js"));
							console.log(buffer.toString())
						}catch(err){
							console.log('出错了',err)
						}
					})()

				fs方法
				const fs = require("node:fs/promises");
				fs.readFile() 读取文件
				fs.appendFile() 创建新文件,或将数据添加到已有文件中
					fs.appendFile(
						path.resolve(__dirname,"./Node.js"),  //如果Node没有,则创建以该名字文件命名的文件
						'要添加的内容'
					)
				fs.mkdir() 创建目录
				fs.rmdir() 删除目录
				fs.rm() 删除文件
				fs.rename() 重命名文件 
				fs.copyFile() 复制文件
					


*/
