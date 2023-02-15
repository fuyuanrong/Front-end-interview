            
    var now = new Date(); //当前日期 
    var nowDayOfWeek = now.getDay(); //今天本周的第几天 
    var nowDay = now.getDate(); //当前日 
    var nowMonth = now.getMonth(); //当前月 
    var nowYear = now.getFullYear(); //当前年 
    nowYear += (nowYear < 2000) ? 1900 : 0; //
    var lastMonthDate = new Date(); //上月日期 
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    // var lastYear = lastMonthDate.getYear();    //getYear已废弃
    var lastMonth = lastMonthDate.getMonth();
    
    //格局化日期：yyyy-MM-dd 
    export function	formatDate(date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();
        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday);
    }
    export function	datefromat(start, end) {
        var day1 = new Date(start)
        var day2 = new Date(end)
        return Math.floor(Math.abs((day1 - day2) / (1000 * 60 * 60 * 24)))
    }
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
            let date = '', d = new Date();
            let m_1 = ((d.getMonth() + 1) % 3 == 0)? d.getMonth() - 4: d.getMonth() - 1 - (d.getMonth() + 1) % 3;
            if(((d.getMonth() + 1) / 3 < 1) || ((d.getMonth() + 1) / 3 == 1 && (d.getMonth() + 1) % 3 == 0)){
                return (d.getFullYear() - 1) + '-10-01';
            } else {
                return d.getFullYear() + '-' + (m_1 >= 10? m_1: '0' + m_1) + '-01';
            }
        }
        //或的上季度的停止日期 
        export function	getLastQuarterEndDate() {
            let date = '', d = new Date();
            let m_1 = ((d.getMonth() + 1) % 3 == 0)? d.getMonth() - 2: d.getMonth() + 1 - ((d.getMonth() + 1) % 3);
            if(((d.getMonth() + 1) / 3 < 1) || ((d.getMonth() + 1) / 3 == 1 && (d.getMonth() + 1) % 3 == 0)){
                return (d.getFullYear() - 1) + '-12-31';
            } else {
                return d.getFullYear() + '-' + (m_1 >= 10? m_1: '0' + m_1) + '-31';
            }
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