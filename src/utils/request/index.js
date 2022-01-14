// @ts-nocheck
import axios from "axios";
import { localCache } from "@/utils/utils";

axios.defaults.timeout = 500000;
axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV == "development"
    ? process.env.VUE_APP_DEV_BASE_URL
    : process.env.VUE_APP_PRO_BASE_URL;

//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    let tokenType = localCache.get("m_token_type") || "Basic";
    let accessToken = localCache.get("m_access_token") || " YmFhczpiYWFz";
    let Authorization = tokenType + " " + accessToken;
    let headers = {};
    if (config.config && config.config.headers) {
      headers = config.config.headers;
    } else {
      headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
    }
    config.headers = {
      Authorization,
      "TENANT-ID": process.env.VUE_APP_TENANTID,
      ...headers,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
let error = [];
//响应拦截器即异常处理
axios.interceptors.response.use(
  (response) => {
    let { authorization } = response.headers;
    authorization && localCache.set("authorization", authorization);
    return response;
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log("错误请求");
          break;
        case 401:
          localCache.remove("m_userInfo");
          localCache.remove("m_token_type");
          localCache.remove("m_access_token");
          window.location.href = window.location.origin + "#/login";
          console.log("未授权，请重新登录");
          break;
        case 403:
          console.log("拒绝访问");
          break;
        case 404:
          console.log("请求错误,未找到该资源");
          break;
        case 405:
          console.log("请求方法未允许");
          break;
        case 408:
          console.log("请求超时");
          break;
        case 500:
          console.log("服务器端出错");
          break;
        case 501:
          console.log("网络未实现");
          break;
        case 502:
          console.log("网络错误");
          break;
        case 503:
          console.log("服务不可用");
          break;
        case 504:
          console.log("网络超时");
          break;
        case 505:
          console.log("http版本不支持该请求");
          break;
        default:
          console.log(`连接错误${err.response.status}`);
      }
    } else {
      // if (error.indexOf(10000) < 0) {
      //   alert("连接到服务器失败");
      error.push(10000);
      // }
      console.log("连接到服务器失败");
    }
    return Promise.resolve(err.response);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, params = {}) {
  if (url.startsWith("/pConfig")) {
    axios.defaults.baseURL = "";
  } else {
    axios.defaults.baseURL =
      process.env.NODE_ENV == "development"
        ? process.env.VUE_APP_DEV_BASE_URL
        : process.env.VUE_APP_PRO_BASE_URL;
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response && response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}, config) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: "post",
      data,
      config,
    }).then(
      (response) => resolve(response.data),
      (err) => reject(err)
    );
    // axios.post(url, params).then(
    //   (response) => {
    //     resolve(response.data);
    //   },
    //   (err) => {
    //     reject(err);
    //   }
    // );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put (url, data = {}, config) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: "put",
      data,
      config,
    }).then(
      (response) => resolve(response.data),
      (err) => reject(err)
    );
  });
}

export default axios;
