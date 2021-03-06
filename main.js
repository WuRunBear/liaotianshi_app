import Vue from 'vue'
import store from './store/index.js'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

/**
 * 创建audio对象
 * @param {Object} conf audio参数
 */
Vue.prototype.createInnerAudioContext = function (conf) {
  let innerAudioContext = uni.createInnerAudioContext();

  for (const key in conf) {
    if (conf.hasOwnProperty(key)) {
      if ('function' == typeof innerAudioContext[key]) {
        innerAudioContext[key](conf[key]);
      } else {
        innerAudioContext[key] = conf[key];
      }
    }
  }

  return innerAudioContext;
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
    Date()).format("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt = "yyyy-MM-dd HH:mm:ss") {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时  
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds(), //毫秒
  };
  var week = {
    "0": "日",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") +
      week[this.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}
/**
 * 返回某月天数
 * @param {Object} date 日期
 */
Date.prototype.getMonthDay = function (date = new Date()) {
  let year = date.getFullYear(),
    month = date.getMonth();
  let d = new Date(year, month, 0);
  return d.getDate();
}
/**
 * 判断是否为同一星期
 * @param {Object | String} dateOne 对比的日期
 */
Date.prototype.getIsSameWeek = function (date = new Date()) {
  if ('string' == typeof date) {
    date = new Date(date);
  }

  // 因为1970年1月1 是周4   所以（天数+4）/7 取整 就是周数  如果相同就是同一周反之就不是
  var oneDayTime = 1000 * 60 * 60 * 24;
  var old_count = parseInt(date.getTime() / oneDayTime);
  var now_other = parseInt(this.getTime() / oneDayTime);
  return parseInt((old_count + 4) / 7) == parseInt((now_other + 4) / 7);
}

/**
 * 将参数对象转为URL
 * @param {Object} query 参数对象
 */
Vue.prototype.queryToUrl = (query) => {
  let url = '?';

  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key)) {
      const e = query[key];
      url += `${key}=${e}`;
      url += Object.keys(query).indexOf(key) < Object.keys(query).length - 1 ? "&" : "";
    }
  }

  return url == '?' ? '' : url;
}
/**
 * 跳转页面
 * @param {String} fun 跳转页面的uni方法名
 * @param {Object} conf 参数对象
 */
Vue.prototype.toPage = (fun, conf) => {
  if (conf.query) {
    conf.url += Vue.prototype.queryToUrl(conf.query);
    delete conf.query;
  }
  uni[fun ? fun : "navigateTo"](conf)
}

/**
 * 剪切板
 * @param {Object} conf uni设置剪切板的配置对象 如果为空则是获取
 */
Vue.prototype.clipboard = (conf) => {
  if (conf) {
    return uni.setClipboardData({
      data: conf.data,
      success() {
        conf.success && conf.success();
      },
      fail() {
        conf.fail && conf.fail();
      },
      complete() {
        conf.complete && conf.complete();
      }
    });
  } else {
    return uni.getClipboardData();
  }
}

const app = new Vue({
  ...App,
  store
})
app.$mount()
