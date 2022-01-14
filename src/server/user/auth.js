import { post, get } from "@/utils/request";
import axios from "axios";

import { localCache } from "@/utils/utils";

/**
 * 查询登录用户认证信息
 * @param {*} params
 * @returns
 */
export async function queryAuthInfo (params) {
  try {
    let { data, code, msg } = await get(
      "/evidence/authority/getLoginUserAuthority"
    );
    if (code == 0) {
      return data;
    } else {
      this.$message.error(msg);
    }
  } catch (error) {
    console.log(error);
  }
}
/**
 * 根据ID查询用户信息
 * @param {*} params 
 * @returns 
 */
export async function queryAuthInfoById (params) {
  try {
    let { data, code, msg } = await get(
      "/evidence/authority/getAuthorityByUserId",
      {
        ...params
      }
    );
    if (code == 0) {
      return data;
    } else {
      this.$message.error(msg);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * 用户认证
 * @param {*} params
 * @returns
 */
export async function addAuth (params) {
  let tokenType = localCache.get("token_type") || "Basic";
  let accessToken = localCache.get("access_token") || " YmFhczpiYWFz";
  let authorization = tokenType + " " + accessToken;
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: authorization,
    },
  };
  var formData = new FormData();
  params &&
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });

  let { data } = await axios.post("/evidence/authority/add", formData, config);
  if (data.code == 0) {
    return data.data;
  } else {
    console.log(data.code, data.msg);
  }
}
