/**
 * @description 相关工具库
 * @author simple
 * @date 2018/11/22 17:33
 */

/**
 * 时间戳转日期格式
 * @param time 时间戳
 * @param format date表示2018-01-01 time 表示 18：00：00 datetime 表示 2018-01-01 18：00：00
 * @param sp 分隔符
 */
export function formatTime (time,format,sp) {
  var date = new Date(time); //获取一个时间对象
  var year=date.getFullYear();  // 获取完整的年份(4位,1970)
  var month= date.getMonth();  // 获取月份(0-11,0代表1月,用的时候记得加上1)
  var day=date.getDate();  // 获取日(1-31)
  var hours=date.getHours();  // 获取小时数(0-23)
  var minutes=date.getMinutes();  // 获取分钟数(0-59)
  var seconds=date.getSeconds();  // 获取秒数(0-59)
  var d=year+sp+month+sp+day;
  var t=hours+":"+minutes+":"+seconds
  if(format=="date"){
    return d;
  }else if(format=="time"){
    return t;
  }else if(format=="datetime"){
    return d+" "+t;
  }else{
    return d;
  }

}

/**
 * 数字转换 超过一万 以 1万显示 否则原样输出 例如 200万 or 3000
 * @param number
 */
export function numberFormat (number) {
    var str=number.toString()
    if(str.length>4){
      //截取后四位
      let newstr=str.substr(0,str.length-4)+"万";
      return newstr;

    }else{
      return number;
    }
}
/**
 * 数字转换万级 保留一点小数
 * @param number
 */
export function numberFormatForOne (number) {
  if(number==undefined){
    return 0;
  }
    var str=number.toString()
    if(str.length>4){
      //截取后四位
      let newstr=str.substr(0,str.length-4);
      let t=str.substr(str.length-4,1);
      newstr+="."+t+"万";
      return newstr;

    }else{
      return number;
    }
}

/**
 * 获取cookie
 * @param cookieName
 * @returns {string}
 */
export function readCookie(cookieName) {
  let theCookie = "" + document.cookie;
  let ind = theCookie.indexOf(cookieName);
  if(ind==-1 || cookieName=="") return "";
  let ind1 = theCookie.indexOf(';',ind);
  if(ind1==-1) ind1 = theCookie.length;
  /*读取Cookie值*/
  return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
}

/***
 * 设置Cookie值 setCookie("id",1);
 * @param {string} cookieName Cookie名称
 */
export function setCookie(cookieName, cookieValue) {
  document.cookie = cookieName + "=" + cookieValue;
}

/***
 * 删除cookie中指定Cookie名称
 * @param {string} $name Cookie名称
 */
export function deleteCookie(cookieName){
  let ex = new Date();
  ex.setTime(ex.getTime()-1);
  document.cookie = cookieName + "=; expires="+ex.toGMTString() + ";path=/";
}

export function getLoginStatus () {
  if(readCookie("MUSIC_U")!=""){
    return true
  }else{
    return false
  }
}
