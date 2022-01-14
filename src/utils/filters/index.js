// @ts-nocheck
/**
 * @param {*} size
 */
export let formateSize = (size) => {
  return (size && (size / 1024).toFixed(2) + " K") || "0 K";
};
/**
 * @param {*} height
 * @returns
 */
export let trxStatus = (height) => {
  return height < 0 ? "未提交" : height == 0 ? "待确认" : "已确认";
};
/**
 * @param {*} fmt
 * @param {*} date
 * @returns
 */
export let dateFormat = (date, fmt) => {
  let ret;
  if (!date) return date;
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
};

export let walType = (type) => {
  return type > 0 ? "多签" : "单签";
};

/**
 * 审核状态
 * @param {*} status
 * @returns
 */
export function authorityStatusTxt (status) {
  return {
    "-1": "审核失败",
    "0": "审核中",
    "1": "审核通过",
  }[status];
}
/**
 * 合同类型
 * @param {*} type 
 * @returns 
 */
export function contractType (type) {
  return {
    "0": "自定义合同",
    "1": "个人车位租凭合同",
    "2": "个人房屋租赁合同",
  }[type];
}

/**
 * @param {*} type 
 * @returns 
 */
export function showHide (type) {
  return {
    "0": "隐藏",
    "1": "显示",
  }[type]
}
/**
 * 审核状态
 * @param {*} status 
 * @returns 
 */
export function authStatus (status) {
  return {
    "-1": "审核失败",
    "0": "审核中",
    "1": "审核通过",
  }[status]
}
export function authType (type) {
  return {
    "1": "个人",
    "2": "企业",
  }[type]
}

/**
 * 
 * @param {*} phone 
 * @returns 
 */
export function desensitizationPhone (phone) {
  if (!phone) return phone;
  return phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
}

export default {
  formateSize,
  trxStatus,
  dateFormat,
  walType,
  authorityStatusTxt,
  contractType,
  showHide,
  authStatus,
  authType,
  desensitizationPhone
};
