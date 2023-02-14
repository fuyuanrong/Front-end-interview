/**
 * Promise构造函数
 * excutor: 内部同步执行的函数 (resolve, reject) =>{}
 * https://www.jianshu.com/p/c202658b8d59
 */
function Promise (excutor){
    // 初始属性设置
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    // 保存回调函数
    this.callbacks = [];
    // 保存示例对象的this的值
    const self = this

    // resolve函数
    function resolve(value){
        // 判断状态,让promise对象状态只修改一次
        if(self.PromiseState !== 'pending')return
        //1.修改对象的状态
        self.PromiseState = 'fulfilled';
        //2.设置对象的结果值
        self.PromiseResult = value
        // 调用回调函数
        setTimeout(()=>{
            self.callbacks.forEach(element=>{
                element.onResolved(value)
            });
        });
        // if(self.callback.onResolved){
        //     self.callback.onResolved(value);
        // }
    }

    // reject函数
    function reject(reason) {
        // 判断状态,让promise对象状态只修改一次
        if(self.PromiseState !== 'pending')return
        //1.修改对象的状态
        self.PromiseState = 'rejected';
        //2.设置对象的结果值
        self.PromiseResult = reason
        // 调用回调函数
        setTimeout(()=>{
            self.callbacks.forEach(element=>{
                element.onRejected(reason)
            });
        });
        // if(self.callback.onRejected){
        //     self.callback.onRejected(reason);
        // }
    }

    /**
    * 为promise制定成功/失败的回调函数
    * 函数返回值是一个新的promise对象
     */
    Promise.prototype.then = function (onResolved, onRejected){
        if(typeof onRejected !== 'function'){
            onRejected = reason=>{
                throw reason;
            }
        }
        if(typeof onResolved !== 'function'){
            onResolved = value=> value;
        }
        return new Promise((resolve, reject)=>{
            function handle(callback){
                try {
                    let result = callback(self.PromiseResult);
                    if (result instanceof Promise) {
                        result.then(
                            v => {
                                resolve(v);
                            },
                            r => {
                                reject(r);
                            }
                        )
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error)
                }
            }
            // 如果当前promise还未确定
            if (this.PromiseState === 'pending') {
                this.callbacks.push({
                    onResolved(value) {
                        handle(onResolved);
                    },
                    onRejected (reason) {
                        handle(onRejected);
                    }
                })
            }
            // 如果当前promise已确定
            if (this.PromiseState === 'fulfilled') {
                setTimeout(()=>{
                    handle(onResolved);
                })
            }
            // 如果当前promise失败了
            if (this.PromiseState === 'rejected') {
                setTimeout(()=>{
                    handle(onRejected);
                })
            }
        })
    }
    /*
    *  onReject 指定失败的回调函数
     */
    Promise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected);
    }

    /*
    *  指定成功的value的promise对象
     */
    Promise.resolve = function (value) {
        //返回一个promise对象
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(
                    v => {
                        resolve(v);
                    },
                    r => {
                        reject(r);
                    }
                )
            } else {
                resolve(value);
            }
        })
    }
    /*
    *  指定失败了reason的promise对象
     */
     Promise.reject = function (reason) {
        //返回一个promise对象
        return new Promise((resolve, reject)=>{
            reject(reason);
        })
     }

     /*
     * Promise all race  any 函数实现
     * 
      */
    
    // 同步调用执行器函数
    try {
        excutor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}