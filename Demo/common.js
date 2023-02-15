 //单表导出
 export function excel(n) {
 	var html = "<html><head><meta charset='utf-8' /></head><body style='border:thin solid black;'>" +
 	
			var mymonth = date.getMonth() + 1;
			var myweekday = date.getDate();
			if (mymonth < 10) {
				mymonth = "0" + mymonth;
			}
			if (myweekday < 10) {
				myweekday = "0" + 	document.getElementById("table1").outerHTML + "</body></html>";
	html=html.replace(/<td>/g,`<td style="mso-number-format:'\@';"> `);
 	//实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
 	var blob = new Blob([html], {
 		type: "application/[图片]vnd.ms-excel"
 	});
 	var a = document.getElementById("btn_excel");
 	// 利用URL.createObjectURL()方法为a元素生成blob URL
 	a.href = URL.createObjectURL(blob);
 	// 设置文件名，目前只有Chrome和FireFox支持此属性
 	a.download = n+".xls";
 }


//格局化日期：yyyy-MM-dd 
	export function	formatDate(date) {
			var myyear = date.getFullYear();myweekday;
			}
			return (myyear + "-" + mymonth + "-" + myweekday);
		}
	export function	datefromat(start, end) {
			var day1 = new Date(start)
			var day2 = new Date(end)
			return Math.floor(Math.abs((day1 - day2) / (1000 * 60 * 60 * 24)))
		}
		//去除数字里面的逗号
	export function clear(str) {
		str = String(str).trim()
		if(str == 'undefined'||str == 'null'||str == ''){
			return 0
		}
		str = str.replace(/,/g, "");//取消字符串中出现的所有逗号 
		return Number(str); 
	}
		//去除对象内属性值为空的属性
	export function removeProperty(object){
		for(let prop in object){
			if (object[prop]=='') {
				delete object[prop]
			}
		}
	}
	//去除数组内的空值
	export function filter_array(array) {  
		return array.filter(item=>item); 
      } 
    
    //空值情况
    export function transInvaildValue(value){
        return ((value == "") || (value == null) || (value == undefined))? "": value.trim();
    }
    export function numberTrans(value){
        return ((value != "") || (value !== null) || (value !== undefined))? Number(value.replace(/,/g, "")).toFixed(2): 0;
    }
	//数字换算成中文繁体金额数字
	export function swapper(n) {
		if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
			return "数据非法";
		var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
		n += "00";
		var p = n.indexOf('.');
		if (p >= 0)
			n = n.substring(0, p) + n.substr(p+1, 2);
		unit = unit.substr(unit.length - n.length);
		for (var i=0; i < n.length; i++)
			str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
		return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
	}
	//数字加逗号  接收数字 返回字符串
	// 最简单的正则表达式 return Number(value).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
	export function Numberformat(e){
		e=Number(e).toFixed(2)
		let v= e.toString().split('')  //数组
		let L = v.indexOf('.')>-1?v.indexOf('.'):v.length
			for(var i = 0;i <= L; i++){
				if((L-3)>0){
					v.splice((L-3),0,',')
					L=L-3
				}
			}
		v=v.join('')
		if(v.indexOf('.')==-1){
			v=v.toString().concat('.00')
		}
		return v
	}
	//去除逗号  接收字符串
	export function ToNumber(e){
		e=e.toString().replace(/,/g,'')
		return Number(e)
	}
		//获得本季度的开端月份 
export function	getQuarterStartMonth() {
	var quarterStartMonth = 0;
	if (nowMonth < 3) {
		quarterStartMonth = 0;
	}
	if (2 < nowMonth && nowMonth < 6) {
		quarterStartMonth = 3;
	}
	if (5 < nowMonth && nowMonth < 9) {
		quarterStartMonth = 6;
	}
	if (nowMonth > 8) {
		quarterStartMonth = 9;
	}
	return quarterStartMonth;
}

var now = new Date(); //当前日期 
var nowDayOfWeek = now.getDay(); //今天本周的第几天 
var nowDay = now.getDate(); //当前日 
var nowMonth = now.getMonth(); //当前月 
var nowYear = now.getYear(); //当前年 
nowYear += (nowYear < 2000) ? 1900 : 0; //
var lastMonthDate = new Date(); //上月日期 
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();
//获取当前季度
export function getQuarter(){
    var  quarter = 0
    var d = new Date()
    quarter = Math.ceil( (d.getMonth() + 1) / 3 )
    return quarter
}
//获得本季度的开端月份 
export function	getQuarterStartMonth() {
    var quarterStartMonth = 0;
    if (nowMonth < 3) {
        quarterStartMonth = 0;
    }
    if (2 < nowMonth && nowMonth < 6) {
        quarterStartMonth = 3;
    }
    if (5 < nowMonth && nowMonth < 9) {
        quarterStartMonth = 6;
    }
    if (nowMonth > 8) {
        quarterStartMonth = 9;
    }
    return quarterStartMonth;
}
//获得本周的开端日期 
export function	getWeekStartDate() {
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
	return formatDate(weekStartDate);
}

//获得本周的停止日期 
export function	getWeekEndDate() {
	var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
	return formatDate(weekEndDate);
}
//获得本月的开端日期 
export function	getMonthStartDate() {
	var monthStartDate = new Date(nowYear, nowMonth, 1);
	return formatDate(monthStartDate);
}
//获得某月的天数 
export function	getMonthDays(myMonth) {
	var monthStartDate = new Date(nowYear, myMonth, 1);
	var monthEndDate = new Date(nowYear, myMonth + 1, 1);
	var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
	return days;
}

//获得本月的停止日期 
export function	getMonthEndDate() {
	var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
	return formatDate(monthEndDate);
}
//获得上月开端时候 
export function	getLastMonthStartDate() {
	var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
	return formatDate(lastMonthStartDate);
}

//获得上月停止时候 
export function	getLastMonthEndDate() {
	var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
	return formatDate(lastMonthEndDate);
}

//获得本季度的开端日期 
export function	getQuarterStartDate() {
	var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
	return formatDate(quarterStartDate);
}
//或的本季度的停止日期 
export function	getQuarterEndDate() {
	var quarterEndMonth = getQuarterStartMonth() + 2;
	var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
	return formatDate(quarterStartDate);
}
//获得下季度的开端日期 
export function getNextQuarterStartDate(){
    let quarter = Number(getQuarter()) + 1
    let paraYear = new Date().getFullYear()
    switch (quarter){　　 
    　　　 case 1 : return paraYear+"-01-01";
    　　　 case 2 : return paraYear+"-04-01";
    　　　 case 3 : return paraYear+"-07-01";
    　　　 case 4 : return paraYear+"-10-01";
    　 }
    return paraYear
}
//获得下季度的结束日期 
export function getNextQuarterEndDate(){
    let quarter = Number(getQuarter()) + 1
    let paraYear = new Date().getFullYear()
    switch (quarter){　　 
    　　　 case 1 : return paraYear+"-03-31";
    　　　 case 2 : return paraYear+"-06-30";
    　　　 case 3 : return paraYear+"-09-30";
    　　　 case 4 : return paraYear+"-12-31";
    　 }
    return paraYear
}
//获得上季度的开端日期 
export function	getLastQuarterStartDate() {
	var quarterEndMonth = getQuarterStartMonth() - 4;
	var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
	return formatDate(quarterStartDate);
}
//或的上季度的停止日期 
export function	getLastQuarterEndDate() {
	var quarterEndMonth = getQuarterStartMonth() - 2;
	var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
	return formatDate(quarterStartDate);
}
//获得本年的开始日期
export function	getYearStartDate() {
	//获得当前年份4位年
	var currentYear = now.getFullYear();
	//本年第一天
	var currentYearFirstDate = new Date(currentYear, 0, 1);
	return formatDate(currentYearFirstDate);
}
//获得本年的结束日期
export function	getYearEndDate() {
	//获得当前年份4位年
	var currentYear = now.getFullYear();
	//本年最后
	var currentYearLastDate = new Date(currentYear, 11, 31);
	return formatDate(currentYearLastDate);
}
//获得上一年的开始日期
export function	getLastYearStartDate() {
	//获得当前年份4位年
	var currentYear = now.getFullYear() - 1;
	//本年第一天
	var currentYearFirstDate = new Date(currentYear, 0, 1);
	return formatDate(currentYearFirstDate);
}
//获得上一年的结束日期
export function	getLastYearEndDate() {
	//获得当前年份4位年
	var currentYear = now.getFullYear() - 1;
	//本年最后
	var currentYearLastDate = new Date(currentYear, 11, 31);
	return formatDate(currentYearLastDate);
}