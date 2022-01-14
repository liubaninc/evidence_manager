import { get, post } from "@/utils/request";
import axios from "@/utils/request";

//获取验证图片  以及token
export function reqGet(data) {
  return get("/code", {
    ...data,
  });
}

//滑动或者点选验证
export function reqCheck(data) {
  return axios({
    url: "/code/check",
    method: "POST",
    params: data,
  });
}
