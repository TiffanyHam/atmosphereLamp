/*
 * @Descripttion:
 * @version:
 * @Author: Tiffany
 * @Date: 2020-11-11 18:42:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-08 11:00:18
 */
export const getLanguage = () => {
  let language;
  let defualtLanguage = "zh";
  // let language = window.hilink.getAppLanguage();
  let reg = /^zh-/i;
  if (navigator && navigator.language) {
    language = reg.test(navigator.language) ? defualtLanguage : "en";
  } else {
    language = defualtLanguage;
  }
  return language;
};

export const format = (date, fmt) => {
  let ret;
  let o = {
    "y+": date.getFullYear(),
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "W+": date.getDay()
  };
  for (let k in o) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      let str = o[k].toString();
      let len = ret[1].length;
      str = len === 1 ? str : str.padStart(len, "0");
      fmt = fmt.replace(ret[1], str);
    }
  }
  return fmt;
};
export const brushingHistory = {
  /**
   * @description: 计算得分颜色
   * @param {number} s 刷牙得分
   * @return {*}
   */
  getColor: (s) => {
      let colors = window.isDark
            ? ["#ba5500", "#007aac", "#4e7700"]
            : ["#ff7600", "#007dff", "#8cd600"];
        let color = "";
        if (s >= 80) {
            color = colors[2];
        } else if (s >= 60 && s < 79) {
            color = colors[1];
        } else {
            color = colors[0];
        }
        return color;
  }
}

/**
 * @description: 判断日期是不是今天
 * @param {*} str  
 * @return {*}
 */
export const isToday = (str) => {
    var d = new Date(str.replace(/-/g, "/"));
    var todaysDate = new Date();
    if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
      return true;
    } else {
      return false;
    }
  }


/**
 * @description: 日期格式化
 * @param {*} dd
 * @return {*}
 */
export const formatDate = (dd) => {
  var date = new Date(dd);
  var YY = date.getFullYear() + "/";
  var MM =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "/";
  var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hh =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var mm =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var ss =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return YY + MM + DD + "," + hh + mm + ss;
}