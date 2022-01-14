// @ts-nocheck
import { post, get, put } from "@/utils/request";
/**
 * 更新用户信息
 * @param {*} params
 * @returns
 */

export async function updateUserInfo (params) {
  try {
    let { data, code, msg } = await put(
      "/upms/user/edit/own",
      {
        ...params,
      },
      { headers: { "Content-Type": "application/json" } }
    );
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
 * 查询用户信息通过手机号
 * @param {*} params
 * @returns
 */
export async function queryUserByPhone (params) {
  try {
    let { data, code, msg } = await get(
      `/upms/user/mobile/details/${params.mobile}`,
      {
        tenantId: process.env.VUE_APP_TENANTID,
        ...params,
      }
    );
    if (code == 0) {
      return data;
    } else {
      this.$message({ type: 'error', message: msg });
    }
  } catch (error) {
    console.log(error);
  }
}
