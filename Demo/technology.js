// 1.ajax.js-- axios http请求拦截器,http响应拦截器   http配置
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import {
	Loading,
	Message,
	MessageBox,
} from 'element-ui'
import router from '../../router'
// 超时时间
axios.defaults.timeout = 600000
// http请求拦截器
axios.interceptors.request.use(config => {
	return config
}, error => {
	Message.error({
		message: '加载超时'
	})
	return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
        // dosomething ...;
	return data
}, error => {
	return Promise.reject(error)
})


// 2. 导航守卫  router.js
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆

const router =  new Router({
    routes:[{
		// ...
	}]
})
router.beforeEach((to, from, next) => {
	// console.log(to)  即将要进入的目标 路由对象
	// console.log(from)  当前导航正要离开的路由
	// console.log(next) :Function  一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
			// next(): 继续正常进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
			// next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
			// next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
			// next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
	let token = JSON.parse(sessionStorage.getItem('ERP缓存用户名')) && Object.keys(JSON.parse(sessionStorage.getItem('ERP缓存用户名'))).length!=0?JSON.parse(sessionStorage.getItem('ERP缓存用户名')).username:''
	// console.log(token)
	if(token){
		next();
	}else{
		if(to.path=='/'||to.path=='/admin'){
			next()
		}else{
			next('/')   //返回登录页
		}
	}
  })

  export default router

// 3. 长时间无操作退出  app.vue

// <div id="app" @mouseover="timeout">
//     <router-view/>
//   </div>

// <script>
// export default {
//   name: 'App',
//   data (){
//     return {
//         lTime: new Date().getTime(), // 最后一次点击的时间
//         ctTime: new Date().getTime(), //当前时间
//         tOut: 2*60*60*1000   //设置时间   超时时间2小时
//     } 
//   },
//   watch: {
//   },
//   mounted () {
//       var myVar = window.setInterval(this.tTime, 10000)   //每个十秒做出判断
//   },
//   methods:{
//     timeout(){
//       this.lTime = new Date().getTime()  //当界面被点击更新点击时间   鼠标事件/键盘事件
//     },
//     tTime(){
//       this.ctTime = new Date().getTime()   //当前时间
//       if (this.ctTime - this.lTime > this.tOut) {
//         this.$router.push('/')   //跳到登录页面
//         sessionStorage.clear()   //清除sessionStorage
//       }
//     }
//   }
// }
// </script>



// 4.vue实现cookie记住密码,自动填充
		// I.记住密码勾选，点登陆时，将账号和密码保存到cookie，下次登陆自动显示到表单内 
		// II.不勾选，点登陆时候则清空之前保存到cookie的值，下次登陆需要手动输入
		// 涉及知识点 cookie 的使用
		// 详解   ==>  https://segmentfault.com/a/1190000013052742?tdsourcetag=s_pcqq_aiomsg
		// github  ==> https://github.com/mgbq/vue-cookie-demo


//  前端解析读取excel表格
//    html
// <div style="font-weight:bold;margin-bottom:10px;display:none;">
// 			上传数据：<input style="display:inline-block" type="file" id="exportexcelno" @change="importExcelno"/>
// </div>
// <button @click="OpenExecl('承运商信息')" class="btn btn-primary  btn-sm" style="margin-left:10px;">承运商信息导入</button>
//   export function  消除报错 
export function	OpenExecl(item){
		$('#exportexcelno').click();
	}

export function	importExcelno(obj) {
		this.excelHead = null   //接收数据数组
		this.exceldata = null
		this.exceldata2 = null
		/*
		FileReader共有4种读取方法：
		1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
		2.readAsBinaryString(file)：将文件读取为二进制字符串
		3.readAsDataURL(file)：将文件读取为Data URL
		4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
		*/
		var that = this;
		var wb; //读取完成的数据
		var rABS = false; //是否将文件读取为二进制字符串
		if(!obj.target.files) {
			return;
		}
		var f = obj.target.files[0];
		// that.file_imported = obj.target.files[0];
		// that.file_title = f.name;
		// that.filename = obj.target.files[0].name;  //读取execl名字
		var reader = new FileReader();
		reader.onload = function(e) {
			var data = e.target.result;
			if(rABS) {
				wb = XLSX.read(btoa(that.fixdata(data)), { //手动转化
					type: 'base64'
				});
			} else {
				wb = XLSX.read(data, {
					type: 'binary'
				});
			}
			//wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
			//wb.Sheets[Sheet名]获取第一个Sheet的数据
			that.exceldata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);       //第一个sheet表格中的数据转化为json数据,下面依次
			that.exceldata1 = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]]);
			// that.exceldata2 = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[2]]);
			
			// dosomething ...
			
		};
		if(rABS) {
			reader.readAsArrayBuffer(f);
		} else {
			reader.readAsBinaryString(f);
		}
		$('#exportexcelno').val("")
	}

	//es2015 类Class
	export class Person{
		constructor(name,age,sex){
			this.name = name
			this.age = age
			this.sex = sex
		}
		introduce(){
			return "I'm  " + this.name +","+ this.age +" years old"
		}
	}