// @ts-nocheck
import { post, get, put } from "@/utils/request";
import rqaxios from "@/utils/request";
import qs from "qs";
/**
 * 用户注册
 * @param {*} params
 * @returns
 */
export async function registerUser (params) {
  try {
    let { data, code, msg } = await post("/upms/user/register", {
      // role: [29],
      // deptId: 23,
      // lockFlag: "0",
      // $lockFlag: "有效",
      tenantCode: process.env.VUE_APP_TENANTCODE,
      ...params,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (code == 0 && data) {
      return !0;
    } else {
      this.$message.error(msg);
    }
  } catch (error) {
    console.log(error);
  }
}
export async function registerUser1 (params) {
  try {
    let { data, code, msg } = await post("/upms/user", {
      role: [29],
      deptId: 23,
      lockFlag: "0",
      $lockFlag: "有效",
      ...params,
    });
    if (code == 0 && data) {
      return !0;
    } else {
      this.$message.error(msg);
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
/**
 * 用户登录
 * @param {*} params
 * @returns
 */
export async function loginUser (params) {
  try {
    let { data } = await rqaxios({
      url: "auth/oauth/token",
      method: "post",
      params: {
        grant_type: "password",
        randomStr: "blockPuzzle",
        code: params.code,
      },
      data: qs.stringify({
        ...params,
      }),
    });

    if (data.user_info) {
      return data;
    } else {
      this.$message.error({ message: data.msg });
      console.log(data.code, data.msg);
    }
  } catch (error) {
    console.log(error);
  }
}
/**
 * 发送短信验证码
 * @param {*} params
 * @returns
 */
export let sendSmsCode = async function (params = {}) {
  try {
    let { code, data, msg } = await get(`upms/mobile/test/${params.phone}`);
    if (data) {
      this.$message.success(`发送成功`);
      return msg;
    } else {
      this.$message.error(msg);
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * 重置密码
 * @param {*} params
 * @returns
 */
export let rePasswd = async function (params = {}) {
  try {
    let { msg, success } = await post(`upms/user/resetpwd`, {
      ...params,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (success) {
      this.$message.success(`重置成功`);
      return !0;
    } else {
      this.$message.error(msg);
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * 重置密码发送验证码
 * @param {*} params
 * @returns
 */
export let rpwdSendMobMes = async function (params = {}) {
  try {
    // let { data, msg } = await get(`upms/mobile/${params.phone}`);
    let { data, msg } = await get(`upms/mobile/test/${params.phone}`);

    if (data) {
      this.$message.success(`发送成功`);
      return data;
    } else {
      this.$message.error(msg);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * 用户退出
 * @param {*} params
 * @returns
 */
export let layoutUser = async (params) => {
  try {
    let { code, data, msg } = await post("user/logout", {
      ...params,
    });
    if (code == 200) {
      return data;
    } else {
      console.log(code, msg);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {*} params
 */
export let getImgCode = async (params = {}) => {
  try {
    let { code, data, msg } = await get(`code`, {
      ...params,
    });
    if (code == 0) {
      return data;
    } else {
      console.log(msg);
    }
  } catch (error) {
    console.log(error);
  }
};
