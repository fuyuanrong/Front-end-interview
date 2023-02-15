<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-11 col-md-offset-1 main " id="app" style="padding-top: 73px;">
		
		<h2 class="page-header" style="text-align:center;margin-bottom:10px;">
			<span>设备查询</span>
		</h2>
		<div style="text-align:left;margin-bottom:10px;display:flex;flex-direction:row;">
			<div style="display:inline-block;float:left;" >
				<input type="text" class="form-control input-sm" placeholder="请输入查询关键字" id="search" @keyup.13="begin()" style="width:240px;display:inline-block;">
				<button style="margin-left:10px;" type="button" v-on:click="begin" class="btn btn-default btn-sm">查询</button>
			</div>
			<div class="dropdown" style="display:inline-block;">
				<button data-toggle="dropdown" class="btn">
					{{str_quyu}}
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu">
					<li v-for="item in quyu"><a href="javascript:void(0)" v-on:click="change_qu(item.quyu)">{{item.quyu}}</a></li>
				</ul>
			</div>
			<div class="dropdown" style="display:inline-block;">
				<button data-toggle="dropdown" class="btn">
					{{str_bm}}
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu">
					<li v-if="dept_flag==true" v-for="item in dept"><a href="javascript:void(0)" v-on:click="change_dept(item)">{{item}}</a></li>
					<li v-if="dept_flag==false" v-for="item in dept4"><a href="javascript:void(0)" v-on:click="change_dept(item)">{{item}}</a></li>
				</ul>
			</div>
			<div class="dropdown" style="display:inline-block;">
				<button data-toggle="dropdown" class="btn">
					{{str_jhr}}
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu">
					<li v-if="jhr_flag==true" v-for="item in jhr"><a href="javascript:void(0)" v-on:click="change_jhr(item)">{{item}}</a></li>
					<li v-if="jhr_flag==false" v-for="item in jhr2"><a href="javascript:void(0)" v-on:click="change_jhr(item)">{{item}}</a></li>
				</ul>
			</div>
			<div class="dropdown" style="display:inline-block;margin-left:25px;">
				<button data-toggle="dropdown" class="btn">
					{{str_cpx}}
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu">
					<li v-for="item in cpx"><a href="javascript:void(0)" v-on:click="change_cpx(item)">{{item}}</a></li>
				</ul>
			</div>
			<div style="display:inline-block;margin-left:25px;">
				<a href="javascript:void(0)" v-on:click="reset" class="btn btn-default">恢复默认</a>
				<export_excel @select="exportExcel"></export_excel>

			</div>
		</div>
		<table class="table table-bordered table-hover" id="table1">
			<thead>
				<tr>
					<th style="text-align:center;"><a v-on:click="px_tm" href="javascript:void(0)">条码</a></th>
					<!-- <th style="text-align:center;"><a v-on:click="px_bom" href="javascript:void(0)">BOM</a></th> -->
					<!-- <th style="text-align:center;"><a v-on:click="px_cpxh" href="javascript:void(0)">产品型号</a></th> -->
					<th style="text-align:center;">产品型号</th>
					<th style="text-align:center;">产品金额</th>
					<!-- <th style="text-align:center"><a v-on:click="px_sbje" href="javascript:void(0)">设备金额</a></th> -->
					<th style="text-align:center"><a v-on:click="px_zt" href="javascript:void(0)">状态</a></th>
					<th style="text-align:center;"><a v-on:click="px_cpx" href="javascript:void(0)">产品线</a></th>
					<th style="text-align:center;"><a v-on:click="px_bm" href="javascript:void(0)">借货部门</a></th>
					<th style="text-align:center;"><a v-on:click="px_jhr" href="javascript:void(0)">借货人</a></th>
					<th style="text-align:center;"><a v-on:click="px_jhdate" href="javascript:void(0)">借货时间</a></th>
					<th style="text-align:center;">当前状况</th>
					<th style="text-align:center;">测试项目</th>
					<!-- <th style="text-align:center;"><a v-on:click="px_xmje" href="javascript:void(0)">项目金额</a></th> -->
					<!-- <th style="text-align:center;">项目把握度</th> -->
					<th style="text-align:center;"><a v-on:click="px_cnhhdate" href="javascript:void(0)">承诺还货时间</a></th>
					<!-- <th style="text-align:center;">借货登记人</th> -->
					<!-- <th style="text-align:center;"><a v-on:click="px_jz" href="javascript:void(0)">借货登记人</a></th> -->
					<!--<th style="text-align:center;">实际还货时间</th>-->
				</tr>
			</thead>
			<tbody>
				<tr v-if="flag==true" v-for="item in items">
					<td><div style="margin:0 auto;word-wrap: break-word;width:135px;"><a href="#modal1" v-on:click="get_this(item)" data-toggle="modal">{{item.tm}}</a></div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:110px;">{{item.cpxh}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word">{{item.cpje}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:55px;">{{item.zt}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:60px;">{{item.cpx}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:55px;">{{item.bsc}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:50px;">{{item.jhr}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:85px;">{{item.jhdate}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:160px;">{{item.comment}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:120px;">{{item.xmmc}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:90px;">{{item.cnhhdate}}</div></td>
					<!--<td><div style="margin:0 auto;word-wrap: ">{{item.sjfhsj}}</div></td>-->
				</tr>
				<tr v-if="flag==false" v-for="item in items2" style="width:100%;">
					<td><div style="margin:0 auto;word-wrap: break-word;width:135px;"><a href="#modal1" v-on:click="get_this(item)" data-toggle="modal">{{item.tm}}</a></div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:110px;">{{item.cpxh}}</div></td>
					<td><div style="margin:0 auto;word-wrap:break-word">{{item.cpje}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:50px;">{{item.zt}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:60px;">{{item.cpx}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:45px;">{{item.bsc}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:40px;">{{item.jhr}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:80px;">{{item.jhdate}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:160px;">{{item.comment}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:105px;">{{item.xmmc}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:90px;">{{item.cnhhdate}}</div></td>
					<!--<td><div style="margin:0 auto;word-wrap: break-word;">{{item.sjfhsj}}</div></td>-->
				</tr>
				<tr v-if="flag==123" v-for="item in items3" style="width:100%;">
					<td><div style="margin:0 auto;word-wrap: break-word;width:135px;"><a href="#modal1" v-on:click="get_this(item)" data-toggle="modal">{{item.tm}}</a></div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:110px;">{{item.cpxh}}</div></td>
					<td><div style="margin:0 auto;word-wrap:break-word">{{item.cpje}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:50px;">{{item.zt}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:60px;">{{item.cpx}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:45px;">{{item.bsc}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:40px;">{{item.jhr}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:80px;">{{item.jhdate}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:160px;">{{item.comment}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:105px;">{{item.xmmc}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:90px;">{{item.cnhhdate}}</div></td>
					<!--<td><div style="margin:0 auto;word-wrap: break-word;">{{item.sjfhsj}}</div></td>-->
				</tr>
				<tr v-if="flag==456" v-for="item in items4" style="width:100%;">
					<td><div style="margin:0 auto;word-wrap: break-word;width:135px;"><a href="#modal1" v-on:click="get_this(item)" data-toggle="modal">{{item.tm}}</a></div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:110px;">{{item.cpxh}}</div></td>
					<td><div style="margin:0 auto;word-wrap:break-word">{{item.cpje}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:50px;">{{item.zt}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:60px;">{{item.cpx}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:45px;">{{item.bsc}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:40px;">{{item.jhr}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:80px;">{{item.jhdate}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:160px;">{{item.comment}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:105px;">{{item.xmmc}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:90px;">{{item.cnhhdate}}</div></td>
					<!--<td><div style="margin:0 auto;word-wrap: break-word;">{{item.sjfhsj}}</div></td>-->
				</tr>
				<tr v-if="flag==789" v-for="item in items5" style="width:100%;">
					<td><div style="margin:0 auto;word-wrap: break-word;width:135px;"><a href="#modal1" v-on:click="get_this(item)" data-toggle="modal">{{item.tm}}</a></div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:110px;">{{item.cpxh}}</div></td>
					<td><div style="margin:0 auto;word-wrap:break-word">{{item.cpje}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:50px;">{{item.zt}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:60px;">{{item.cpx}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:45px;">{{item.bsc}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:40px;">{{item.jhr}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:80px;">{{item.jhdate}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:160px;">{{item.comment}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:105px;">{{item.xmmc}}</div></td>
					<td><div style="margin:0 auto;word-wrap: break-word;width:90px;">{{item.cnhhdate}}</div></td>
					<!--<td><div style="margin:0 auto;word-wrap: break-word;">{{item.sjfhsj}}</div></td>-->
				</tr>
			</tbody>
		</table>
						<loading :isOpen="isOpen"></loading>
						<div class="alert alert-warning" v-show="isShow">
			<a href="#" class="close" data-dismiss="alert">
				&times;
			</a>
			<strong>提示！！</strong>您暂时没有权限获取到数据，请联系管理员开通数据权限。
		</div>
		<!-- 历史详情模态框 -->
		<div class="modal" id="modal1">
			<div class="modal-dialog" style="width:90%;">
				<div class="modal-content">
					<div class="modal-header"><button class="close" data-dismiss="modal"><span>&times;</span></button><span class="h3">测试设备当前状况</span></div>
					<div class="modal-body">
						<table class="table table-bordered">
							<tbody>
								<tr>
									<td style="width:17.5%;font-weight:bold;">条码</td>
									<td style="width:32.5%;">{{get_select.tm}}</td>
									
									<td style="width:17.5%;font-weight:bold;">主机条码</td>
									<td style="width:32.5%;">{{get_select.host_tm}}</td>
									
									
									
								</tr>
								<tr>
									<td style="width:17.5%;font-weight:bold;">bom</td>
									<td style="width:32.5%;">{{get_select.bom}}</td>
									<td style="font-weight:bold;">产品型号</td>
									<td>{{get_select.cpxh}}</td>
								</tr>
								<tr>
									<td style="font-weight:bold;">产品描述</td>
									<td>{{get_select.cpms}}</td>
									<td style="font-weight:bold;">设备金额</td>
									<td>{{get_select.cpje}}</td>
								</tr>
								<tr>
									<td style="font-weight:bold;">状态</td>
									<td>{{get_select.zt}}</td>
									<td style="font-weight:bold;">部门</td>
									<td>{{get_select.bsc}}</td>
								</tr>
								<tr>
									<td style="font-weight:bold;">产品线</td>
									<td>{{get_select.cpx}}</td>
									<!--<td style="font-weight:bold;">借货人</td>
									<td>{{get_select.jhr}}</td>-->
								</tr>
								<!--<tr>
									<td style="font-weight:bold;">借货时间</td>
									<td>{{get_select.jhdate}}</td>
									<td style="font-weight:bold;">当前状况</td>
									<td>{{get_select.comment}}</td>
									
								</tr>
								<tr>
									<td style="font-weight:bold;">测试项目</td>
									<td>{{get_select.xmmc}}</td>
									<td style="font-weight:bold;">项目金额</td>
									<td>{{get_select.xmje}}</td>
								</tr>
								<tr>
									<td style="font-weight:bold;">项目把握度</td>
									<td>{{get_select.xmbwd}}</td>
									<td style="font-weight:bold;">承诺还货时间</td>
									<td>{{get_select.cnhhdate}}</td>
									
								</tr>
								<tr>
									<td style="font-weight:bold;">借货登记人</td>
									<td>{{get_select.jz}}</td>
								</tr>-->
							</tbody>
						</table>
						<br>
						<h3 class="page-header">历史记录</h3>
						<table class="table table-bordered">
							<thead>
								<tr>
									<td colspan="8" style="border-right:3px solid #ddd;">借货</td>
									<td colspan="6">转出</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>部门</td>
									<td>姓名</td>
									<td>借货时间</td>
									<td>登记人</td>
									<td>项目</td>
									<td>把握度</td>
									<td>项目金额</td>
									<td style="border-right:3px solid #ddd;">承诺还货时间</td>
									<td>部门</td>
									<td>姓名</td>
									<td>登记人</td>
									<td>物流公司</td>
									<td>物流单号</td>
									<td>实际发货时间</td>
								</tr>
								<tr v-for="item in lsjl">
									<td>{{item.bsc}}</td>
									<td>{{item.jhr}}</td>
									<td>{{item.jhdate}}</td>
									<td>{{item.jz}}</td>
									<td>{{item.xmmc}}</td>
									<td>{{item.xmbwd}}</td>
									<td>{{item.xmje}}</td>
									<td style="border-right:3px solid #ddd;">{{item.cnhhdate}}</td>
									<td>{{item.zcbsc}}</td>
									<td>{{item.zjr}}</td>
									<td>{{item.zcdjr}}</td>
									<td>{{item.hygs}}</td>
									<td>{{item.hydh}}</td>
									<td>{{item.sjfhsj}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="modal-footer"><button class="btn btn primary" data-dismiss="modal">关闭</button></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
	import loading from 'components/loading/loading.vue'
	import export_excel from 'components/common-excel/export_excel'
	import {excel} from 'common/js/common'
	export default{
		components: {
		loading,
		export_excel
		},
	  	data(){
	  		return{
				isShow: false,
	  			isOpen:true,
	  			alldevices:[],//所有历史记录保存在此
	  			alldevices2:[],
	  			alldevices3:[],
	  			search:'',
	  			str_bm:'部门',
	  			str_quyu:'区域',
	  			str_cpx:'产品线',
	  			str_jhr:'借货人',
	  			flag:true,
	  			shunxu:true,
	  			get_select:[],//当前选中的条码信息记录
	  			lsjl:[],
	  			quyu:[],
	  			dept:[],//用来存放当前所有数据中出现的区域
	  			cpx:[],
	  			jhr:[],
	  			jhr2:[],
	  			jhr_flag:true,
	  			dept2:[],//用来调用表的数据中的区域
	  			dept_flag:true,
	  			dept3:[],//点击筛选后的部门
	  			dept4:[],//筛选最终的结果显示
	  			start:false
	  		}
	  	},
	  	created:function(){
	  		// this.get_alldevices();
	  		// this.get_quyu();
	  		// this.get_dept();
	  	},
	  	computed:{
	  		items: function() {
				var _search = this.search.trim();
				if(this.start==true) {
					this.start=false;
					return this.alldevices.filter(function(product) {
						return Object.keys(product).some(function(key) {
							return String(product[key]).indexOf(_search) > -1
						})
					})
				}
				return this.alldevices;
			},
			items2: function() {
				var _search = this.search;
				if(this.start==true) {
					this.start=false;
					return this.alldevices2.filter(function(product) {
						return Object.keys(product).some(function(key) {
							return String(product[key]).indexOf(_search) > -1
						})
					})
				}
				return this.alldevices2;
			},
			items3: function() {
				var str_bm=this.str_bm;
				var _search = this.search;
				if(this.start==true) {
					this.start=false;
					return this.alldevices.filter(function(product) {
						return Object.keys(product).some(function(key) {
							return String(product[key]).indexOf(_search) > -1
						})
					})
				}
				return this.alldevices.filter(function(product) {
					return product.bsc==str_bm;
				})
			},
			items4: function() {
				var str_jhr=this.str_jhr;
				var _search = this.search;
				if(this.start==true) {
					this.start=false;
					return this.alldevices.filter(function(product) {
						return Object.keys(product).some(function(key) {
							return String(product[key]).indexOf(_search) > -1
						})
					})
				}
				return this.alldevices.filter(function(product) {
					return product.jhr==str_jhr;
				})
			},
			items5: function() {
				var str_cpx=this.str_cpx;
				var str_bm=this.str_bm;
				var str_jhr=this.str_jhr;
				var _search = this.search;
				if(this.start==true) {
					this.start=false;
					return this.alldevices.filter(function(product) {
						return Object.keys(product).some(function(key) {
							return String(product[key]).indexOf(_search) > -1
						})
					})
				}
				if(str_jhr!='借货人'){
					return this.alldevices.filter(function(product) {
						return product.jhr==str_jhr&&product.cpx==str_cpx;
					})
				}else if(str_bm!='部门'){
					return this.alldevices.filter(function(product) {
						return product.bsc==str_bm&&product.cpx==str_cpx;
					})
				}else{
					return this.alldevices.filter(function(product) {
						return product.cpx==str_cpx;
					})
				}
			}
	  	},
	  	methods:{
				exportExcel(){
					excel('设备查询')
				},
	  		get_alldevices:function(){
	  			var that=this;
	  			axios.get('/api2/alldevices',{}).then(function(response){
	  				that.alldevices=response.data;
	  				that.isOpen = false;
					if(that.alldevices.code == 0 && that.alldevices.desc =="") {
						that.alldevices=[];
						that.isOpen = false;
						that.isShow = true;
					}
					if(that.alldevices == 0 && that.alldevices.length =="") {
						that.alldevices=[];
						that.isOpen = false;
						that.isShow = true;
					}
	  				for(var i=0;i<that.alldevices.length;i++){
			            that.dept[i]=that.alldevices[i].bsc;
			        }
			        that.dept=that.unique(that.dept);
			        for(var i=0;i<that.alldevices.length;i++){
			            that.cpx[i]=that.alldevices[i].cpx;
			        }
			        that.cpx=that.unique(that.cpx);
			        for(var i=0;i<that.alldevices.length;i++){
			            that.jhr[i]=that.alldevices[i].jhr;
			        }
			        that.jhr=that.unique(that.jhr);
	  			}).catch(function(error){
	  				alert(error);
	  			});
	  		},
	  		get_quyu:function(){
	  			var that=this;
	  			axios.get('/api2/quyu',{}).then(function(response){
	  				that.quyu=response.data;
	  			}).catch(function(error){
	  				alert(error);
	  			});
	  		},
	  		get_dept:function(){
	  			var that=this;
	  			axios.get('/api2/dept',{}).then(function(response){
	  				that.dept2=response.data;
	  			}).catch(function(error){
	  				alert(error);
	  			});
	  		},
	  		begin:function(){
	  			this.str_quyu='区域';
	  			this.str_cpx='产品线';
	  			this.str_jhr='借货人';
	  			this.str_bm='部门';
	  			this.flag=true;
	  			this.start=true;
	  			this.search=document.getElementById('search').value;
	  		},
	  		change_qu:function(e){
	  			this.reset();
	  			this.str_quyu=e;
	  			this.dept_flag=false;
  				this.dept3=JSON.parse(JSON.stringify(this.dept2));
  				for(var i=this.dept3.length-1;i>=0;i--){
  					if(e!=this.dept3[i].quyu){
  						this.dept3.splice(i,1);
  					}
  				}
  				this.dept4=[];
  				for(var i=0;i<this.dept3.length;i++){
  					this.dept4[i]=this.dept3[i].dept;
  				}
	  		},
	  		change_dept:function(e){
	  			this.str_bm=e;
	  			this.flag=123;
	  			this.jhr_flag=false;
	  			this.str_jhr='借货人';
	  			this.str_cpx='产品线';
	  			this.alldevices3=JSON.parse(JSON.stringify(this.alldevices));
	  			for(var i=this.alldevices3.length-1;i>=0;i--){
	  				if(e!=this.alldevices3[i].bsc){
	  					this.alldevices3.splice(i,1);
	  				}
	  			}
	  			this.jhr2=[];
	  			for(var i=0;i<this.alldevices3.length;i++){
	  				this.jhr2[i]=this.alldevices3[i].jhr;
	  			}
	  			this.jhr2=this.unique(this.jhr2);
	  		},
	  		change_cpx:function(e){
	  			this.str_cpx=e;
	  			this.flag=789;
	  		},
	  		change_jhr:function(e){
	  			this.str_cpx='产品线';
	  			this.str_jhr=e;
	  			this.flag=456;
	  		},
	  		px_tm:function(){
	  			this.flag=false;
	  			var temp=0;
	  			this.alldevices2=JSON.parse(JSON.stringify(this.alldevices));
	  			for(var i=0;i<this.alldevices2.length;i++){
	                if(this.alldevices2[i].tm==null){
	                  this.alldevices2[i].tm=' ';
	                }
	            }
	  			if(this.shunxu==true){
	  				this.shunxu=false;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].tm<this.alldevices2[j+1].tm){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}else{
		            this.shunxu=true;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].tm>this.alldevices2[j+1].tm){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}
	  		},
	  		px_zt:function(){
	  			this.flag=false;
	  			var temp=0;
	  			this.alldevices2=JSON.parse(JSON.stringify(this.alldevices));
	  			for(var i=0;i<this.alldevices2.length;i++){
	                if(this.alldevices2[i].zt==null){
	                  this.alldevices2[i].zt=' ';
	                }
	            }
	            for(var i=0;i<this.alldevices2.length;i++){
	                this.alldevices2[i].bbs=this.makePy(this.alldevices2[i].zt);
	            }
	  			if(this.shunxu==true){
	  				this.shunxu=false;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].bbs>this.alldevices2[j+1].bbs){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}else{
		            this.shunxu=true;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].bbs<this.alldevices2[j+1].bbs){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}
	  		},
	  		px_bm:function(){
	  			this.flag=false;
	  			var temp=0;
	  			this.alldevices2=JSON.parse(JSON.stringify(this.alldevices));
	  			for(var i=0;i<this.alldevices2.length;i++){
	                if(this.alldevices2[i].bsc==null){
	                  this.alldevices2[i].bsc=' ';
	                }
	            }
	            for(var i=0;i<this.alldevices2.length;i++){
	                this.alldevices2[i].bbs=this.makePy(this.alldevices2[i].bsc);
	            }
	  			if(this.shunxu==true){
	  				this.shunxu=false;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].bbs>this.alldevices2[j+1].bbs){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}else{
		            this.shunxu=true;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].bbs<this.alldevices2[j+1].bbs){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}
	  		},
	  		px_cpx:function(){
	  			this.flag=false;
	  			var temp=0;
	  			this.alldevices2=JSON.parse(JSON.stringify(this.alldevices));
	  			for(var i=0;i<this.alldevices2.length;i++){
	                if(this.alldevices2[i].cpx==null){
	                  this.alldevices2[i].cpx=' ';
	                }
	            }
	            for(var i=0;i<this.alldevices2.length;i++){
	                this.alldevices2[i].bbs=this.makePy(this.alldevices2[i].cpx);
	            }
	  			if(this.shunxu==true){
	  				this.shunxu=false;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].bbs>this.alldevices2[j+1].bbs){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}else{
		            this.shunxu=true;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].bbs<this.alldevices2[j+1].bbs){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}
	  		},
	  		px_jhr:function(){
	  			this.flag=false;
	  			var temp=0;
	  			this.alldevices2=JSON.parse(JSON.stringify(this.alldevices));
	  			for(var i=0;i<this.alldevices2.length;i++){
	                if(this.alldevices2[i].jhr==null){
	                  this.alldevices2[i].jhr=' ';
	                }
	            }
	            for(var i=0;i<this.alldevices2.length;i++){
	                this.alldevices2[i].bbs=this.makePy(this.alldevices2[i].jhr);
	            }
	  			if(this.shunxu==true){
	  				this.shunxu=false;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].bbs>this.alldevices2[j+1].bbs){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}else{
		            this.shunxu=true;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].bbs<this.alldevices2[j+1].bbs){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}
	  		},
	  		px_jhdate:function(){
	  			this.flag=false;
	  			var temp=0;
	  			this.alldevices2=JSON.parse(JSON.stringify(this.alldevices));
	  			for(var i=0;i<this.alldevices2.length;i++){
	                if(this.alldevices2[i].jhdate==null){
	                  this.alldevices2[i].jhdate=' ';
	                }
	            }
	  			if(this.shunxu==true){
	  				this.shunxu=false;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].jhdate<this.alldevices2[j+1].jhdate){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}else{
		            this.shunxu=true;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].jhdate>this.alldevices2[j+1].jhdate){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}
	  		},
	  		px_cnhhdate:function(){
	  			this.flag=false;
	  			var temp=0;
	  			this.alldevices2=JSON.parse(JSON.stringify(this.alldevices));
	  			for(var i=0;i<this.alldevices2.length;i++){
	                if(this.alldevices2[i].cnhhdate==null){
	                  this.alldevices2[i].cnhhdate=' ';
	                }
	            }
	  			if(this.shunxu==true){
	  				this.shunxu=false;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].cnhhdate>this.alldevices2[j+1].cnhhdate){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}else{
		            this.shunxu=true;
	  				for(var i=0;i<this.alldevices2.length;i++){
		                for(var j=0;j<this.alldevices2.length-i-1;j++){
							if(this.alldevices2[j].cnhhdate<this.alldevices2[j+1].cnhhdate){
								temp = this.alldevices2[j];
								this.alldevices2[j] = this.alldevices2[j+1];  
								this.alldevices2[j+1] = temp;
							}
		                }
		            }
	  			}
	  		},
	  		reset:function(){
	  			this.str_quyu='区域';
	  			this.str_cpx='产品线';
	  			this.str_jhr='借货人';
	  			this.str_bm='部门';
	  			this.flag=true;
	  			this.dept_flag=true;
	  			this.jhr_flag=true;
	  			this.search='';
	  			document.getElementById('search').value='';
	  		},
	  		get_this:function(e){
	  			this.get_select=e;
	  			var that=this;
	  			axios.get('/api2/device/'+this.get_select.tm,{}).then(function(response){
	  				that.lsjl=response.data;
	  			}).catch(function(error){
	  				alert(error);
	  			});
	  		},
	  		makePy:function(str){
        		var that=this;
        		var arrResult = new Array(); //保存中间结果的数组
        		for(var i=0,len=str.length;i<len;i++){
          			//获得unicode码
          			var ch = str.charAt(i);
          			//检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理
          			arrResult.push(that.checkCh(ch));
        		}
        		//处理arrResult,返回所有可能的拼音首字母串数组
        		return that.mkRslt(arrResult);
      		},
      		checkCh:function(ch){
        		// 汉字拼音首字母列表 本列表包含了20902个汉字,用于配合 ToChineseSpell  
        		//函数使用,本表收录的字符的Unicode编码范围为19968至40869, XDesigner 整理  
        		var strChineseFirstPY = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";   
        		//此处收录了375个多音字,数据来自于http://www.51window.net/page/pinyin  
        		var oMultiDiff={"19969":"DZ","19975":"WM","19988":"QJ","20048":"YL","20056":"SC","20060":"NM","20094":"QG","20127":"QJ","20167":"QC","20193":"YG","20250":"KH","20256":"ZC","20282":"SC","20285":"QJG","20291":"TD","20314":"YD","20340":"NE","20375":"TD","20389":"YJ","20391":"CZ","20415":"PB","20446":"YS","20447":"SQ","20504":"TC","20608":"KG","20854":"QJ","20857":"ZC","20911":"PF","20504":"TC","20608":"KG","20854":"QJ","20857":"ZC","20911":"PF","20985":"AW","21032":"PB","21048":"XQ","21049":"SC","21089":"YS","21119":"JC","21242":"SB","21273":"SC","21305":"YP","21306":"QO","21330":"ZC","21333":"SDC","21345":"QK","21378":"CA","21397":"SC","21414":"XS","21442":"SC","21477":"JG","21480":"TD","21484":"ZS","21494":"YX","21505":"YX","21512":"HG","21523":"XH","21537":"PB","21542":"PF","21549":"KH","21571":"E","21574":"DA","21588":"TD","21589":"O","21618":"ZC","21621":"KHA","21632":"ZJ","21654":"KG","21679":"LKG","21683":"KH","21710":"A","21719":"YH","21734":"WOE","21769":"A","21780":"WN","21804":"XH","21834":"A","21899":"ZD","21903":"RN","21908":"WO","21939":"ZC","21956":"SA","21964":"YA","21970":"TD","22003":"A","22031":"JG","22040":"XS","22060":"ZC","22066":"ZC","22079":"MH","22129":"XJ","22179":"XA","22237":"NJ","22244":"TD","22280":"JQ","22300":"YH","22313":"XW","22331":"YQ","22343":"YJ","22351":"PH","22395":"DC","22412":"TD","22484":"PB","22500":"PB","22534":"ZD","22549":"DH","22561":"PB","22612":"TD","22771":"KQ","22831":"HB","22841":"JG","22855":"QJ","22865":"XQ","23013":"ML","23081":"WM","23487":"SX","23558":"QJ","23561":"YW","23586":"YW","23614":"YW","23615":"SN","23631":"PB","23646":"ZS","23663":"ZT","23673":"YG","23762":"TD","23769":"ZS","23780":"QJ","23884":"QK","24055":"XH","24113":"DC","24162":"ZC","24191":"GA","24273":"QJ","24324":"NL","24377":"TD","24378":"QJ","24439":"PF","24554":"ZS","24683":"TD","24694":"WE","24733":"LK","24925":"TN","25094":"ZG","25100":"XQ","25103":"XH","25153":"PB","25170":"PB","25179":"KG","25203":"PB","25240":"ZS","25282":"FB","25303":"NA","25324":"KG","25341":"ZY","25373":"WZ","25375":"XJ","25384":"A","25457":"A","25528":"SD","25530":"SC","25552":"TD","25774":"ZC","25874":"ZC","26044":"YW","26080":"WM","26292":"PB","26333":"PB","26355":"ZY","26366":"CZ","26397":"ZC","26399":"QJ","26415":"ZS","26451":"SB","26526":"ZC","26552":"JG","26561":"TD","26588":"JG","26597":"CZ","26629":"ZS","26638":"YL","26646":"XQ","26653":"KG","26657":"XJ","26727":"HG","26894":"ZC","26937":"ZS","26946":"ZC","26999":"KJ","27099":"KJ","27449":"YQ","27481":"XS","27542":"ZS","27663":"ZS","27748":"TS","27784":"SC","27788":"ZD","27795":"TD","27812":"O","27850":"PB","27852":"MB","27895":"SL","27898":"PL","27973":"QJ","27981":"KH","27986":"HX","27994":"XJ","28044":"YC","28065":"WG","28177":"SM","28267":"QJ","28291":"KH","28337":"ZQ","28463":"TL","28548":"DC","28601":"TD","28689":"PB","28805":"JG","28820":"QG","28846":"PB","28952":"TD","28975":"ZC","29100":"A","29325":"QJ","29575":"SL","29602":"FB","30010":"TD","30044":"CX","30058":"PF","30091":"YSP","30111":"YN","30229":"XJ","30427":"SC","30465":"SX","30631":"YQ","30655":"QJ","30684":"QJG","30707":"SD","30729":"XH","30796":"LG","30917":"PB","31074":"NM","31085":"JZ","31109":"SC","31181":"ZC","31192":"MLB","31293":"JQ","31400":"YX","31584":"YJ","31896":"ZN","31909":"ZY","31995":"XJ","32321":"PF","32327":"ZY","32418":"HG","32420":"XQ","32421":"HG","32438":"LG","32473":"GJ","32488":"TD","32521":"QJ","32527":"PB","32562":"ZSQ","32564":"JZ","32735":"ZD","32793":"PB","33071":"PF","33098":"XL","33100":"YA","33152":"PB","33261":"CX","33324":"BP","33333":"TD","33406":"YA","33426":"WM","33432":"PB","33445":"JG","33486":"ZN","33493":"TS","33507":"QJ","33540":"QJ","33544":"ZC","33564":"XQ","33617":"YT","33632":"QJ","33636":"XH","33637":"YX","33694":"WG","33705":"PF","33728":"YW","33882":"SR","34067":"WM","34074":"YW","34121":"QJ","34255":"ZC","34259":"XL","34425":"JH","34430":"XH","34485":"KH","34503":"YS","34532":"HG","34552":"XS","34558":"YE","34593":"ZL","34660":"YQ","34892":"XH","34928":"SC","34999":"QJ","35048":"PB","35059":"SC","35098":"ZC","35203":"TQ","35265":"JX","35299":"JX","35782":"SZ","35828":"YS","35830":"E","35843":"TD","35895":"YG","35977":"MH","36158":"JG","36228":"QJ","36426":"XQ","36466":"DC","36710":"JC","36711":"ZYG","36767":"PB","36866":"SK","36951":"YW","37034":"YX","37063":"XH","37218":"ZC","37325":"ZC","38063":"PB","38079":"TD","38085":"QY","38107":"DC","38116":"TD","38123":"YD","38224":"HG","38241":"XTC","38271":"ZC","38415":"YE","38426":"KH","38461":"YD","38463":"AE","38466":"PB","38477":"XJ","38518":"YT","38551":"WK","38585":"ZC","38704":"XS","38739":"LJ","38761":"GJ","38808":"SQ","39048":"JG","39049":"XJ","39052":"HG","39076":"CZ","39271":"XT","39534":"TD","39552":"TD","39584":"PB","39647":"SB","39730":"LG","39748":"TPB","40109":"ZQ","40479":"ND","40516":"HG","40536":"HG","40583":"QJ","40765":"YQ","40784":"QJ","40840":"YK","40863":"QJG"};
    			var uni = ch.charCodeAt(0);
    			//如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
    			if(uni > 40869 || uni < 19968)
      				return ch; //dealWithOthers(ch);
    			//检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母
    			return (oMultiDiff[uni]?oMultiDiff[uni]:(strChineseFirstPY.charAt(uni-19968)));
      		},
      		mkRslt:function(arr){
        		var arrRslt = [""];  
        		for(var i=0,len=arr.length;i<len;i++){
          			var str = arr[i];
         			var strlen = str.length;
          			if(strlen == 1){
          				for(var k=0;k<arrRslt.length;k++){
            				arrRslt[k] += str;
          				}
          			}else{
            			var tmpArr = arrRslt.slice(0);
            			arrRslt = [];
            			for(k=0;k<strlen;k++){
              				//复制一个相同的arrRslt
              				var tmp = tmpArr.slice(0);
              				//把当前字符str[k]添加到每个元素末尾
              				for(var j=0;j<tmp.length;j++){
                				tmp[j] += str.charAt(k);
              				}
              				//把复制并修改后的数组连接到arrRslt上
              				arrRslt = arrRslt.concat(tmp);
            			}
          			}
        		}
        		return arrRslt;
      		},
      		formatNum:function(str){
		        str=str.toString();
		        var newStr = "";
		        var count = 0;
		        if(str.indexOf(".")==-1){
		            for(var i=str.length-1;i>=0;i--){
			            if(count % 3 == 0 && count != 0){
			            	newStr = str.charAt(i) + "," + newStr;
			            }else{
			            	newStr = str.charAt(i) + newStr;
			            }
			          	count++;
		           }
		           str = newStr + ".00"; //自动补小数点后两位
		           return str;
		        }else{
		            for(var i = str.indexOf(".")-1;i>=0;i--){
			            if(count % 3 == 0 && count != 0){
			            	newStr = str.charAt(i) + "," + newStr;
			            }else{
			                newStr = str.charAt(i) + newStr; //逐个字符相接起来
			            }
			          	count++;
		            }
		            str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
		            return str;
		        }
		    },
		    unique:function(data){
		        data = data || [];
		        var a = {};
		        for (var i=0; i<data.length; i++) {
		            var v = data[i];
		            if (typeof(a[v]) == 'undefined'){
		                a[v] = 1;
		            }
		        };
		        data.length=0;
		        for (var i in a){
		            data[data.length] = i;
		        }
		        return data;
		    }
	  	}
	}
</script>
<style scoped>
	.kuang{
		border-radius: 5px;
		height: 30px;
		width: 350px;
		margin-left: 15px;
		text-indent: 1em;
		border:1px solid #333;
	}
</style>
