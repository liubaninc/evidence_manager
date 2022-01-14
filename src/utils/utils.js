// @ts-nocheck
import CryptoJS from "crypto-js";
import {
  create, all
} from 'mathjs'

export let localCache = {
  set (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get (key) {
    var val = localStorage.getItem(key);
    var dataobj = JSON.parse(val);
    return dataobj;
  },
  remove (key) {
    return localStorage.removeItem(key);
  },
};
/**
 * 将file对象转化为blob:url
 * @param {*} file
 * @returns
 */
export function getObjectURL (file) {
  var url = null;
  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}
/**
 * 保留四位小数
 * @param {*} num
 */
export function toFixed4 (num) {
  return Number(num.toString().match(/^\d+(?:\.\d{0,4})?/));
}
/**
 *加密处理
 */
export const encryption = (params) => {
  let { data, type, param, key } = params;
  const result = JSON.parse(JSON.stringify(data));
  if (type === "Base64") {
    param.forEach((ele) => {
      result[ele] = btoa(result[ele]);
    });
  } else {
    param.forEach((ele) => {
      var data = result[ele];
      key = CryptoJS.enc.Latin1.parse(key);
      var iv = key;
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
      });
      result[ele] = encrypted.toString();
    });
  }
  return result;
};

/**
 * 将base64 转化为 file对象
 * @param {*} dataurl
 * @param {*} filename
 * @returns
 */
export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

/**
 * 时间格式化
 * @param {*} format
 * @param {*} date
 * @returns
 *
 * 若文档中已有命名dateFormat，可用dFormat()调用
 * 年(Y) 可用1-4个占位符
 * 月(m)、日(d)、小时(H)、分(M)、秒(S) 可用1-2个占位符
 * 星期(W) 可用1-3个占位符
 * 季度(q为阿拉伯数字，Q为中文数字)可用1或4个占位符
 *
 * let date = new Date()
 * dateFormat("YYYY-mm-dd HH:MM:SS", date)           2020-02-09 14:04:23
 * dateFormat("YYYY-mm-dd HH:MM:SS Q", date)         2020-02-09 14:09:03 一
 * dateFormat("YYYY-mm-dd HH:MM:SS WWW", date)       2020-02-09 14:45:12 星期日
 * dateFormat("YYYY-mm-dd HH:MM:SS QQQQ", date)      2020-02-09 14:09:36 第一季度
 * dateFormat("YYYY-mm-dd HH:MM:SS WWW QQQQ", date)  2020-02-09 14:46:12 星期日 第一季度
 */
export const formateTime = (format, date = new Date()) => {
  if (!format) return "";
  let we = date.getDay(); // 星期
  let qut = Math.floor((date.getMonth() + 3) / 3).toString(); // 季度
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月(月份从0开始，要+1)
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    "q+": qut, // 季度
  };
  const week = {
    // 中文数字 (星期)
    "0": "日",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
  };
  const quarter = {
    // 中文数字（季度）
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
  };
  if (/(W+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? "星期" + week[we]
          : "周" + week[we]
        : week[we]
    );
  }
  if (/(Q+)/.test(format)) {
    // 输入一个Q，只输出一个中文数字，输入4个Q，则拼接上字符串
    format = format.replace(
      RegExp.$1,
      RegExp.$1.length == 4 ? "第" + quarter[qut] + "季度" : quarter[qut]
    );
  }
  for (let k in opt) {
    let r = new RegExp("(" + k + ")").exec(format);
    if (r) {
      // 若输入的长度不为1，则前面补零
      format = format.replace(
        r[1],
        RegExp.$1.length == 1 ? opt[k] : opt[k].padStart(RegExp.$1.length, "0")
      );
    }
  }
  return format;
};
/**
 * 将file json 转化为file对象
 * @param {*} file
 * @param {*} name
 * @returns
 */
export const jsonToFile = (file, name = "cp_zhi") => {
  if (!file) return file;
  var content = JSON.stringify(file);
  var blob = new Blob([content], { type: "text/plain;charset=utf-8" }); // 把数据转化成blob对象
  return new File([blob], name, {
    lastModified: Date.now(),
  });
};


const math = create(all, {
  epsilon: 1e-12,
  matrix: 'Matrix',
  number: 'BigNumber',
  precision: 64,
  predictable: false,
  randomSeed: null
})
export const computeNumber = express => {
  try {
    return Number(math.format(math.evaluate(express)))
  } catch (err) {
    return NaN
  }
}