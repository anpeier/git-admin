import axios from "axios";
import { Message, MessageBox } from "element-ui";
import store from "./store";
import { getToken } from "./utils/auth";
const http = axios.create({
  baseURL: "http://localhost:9240"
  // timeout: 10000,
});

http.interceptors.request.use(
  config => {
    // console.log(store.getters.getToken);
    if (store.getters.getToken) {
      config.headers["lv-token"] = getToken();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    // 接口错误拦截
    console.log(response);
    let res = response.data;
    if (res.code == 1) {
      // 成功
      return res.data;
    } else if (res.code == 0) {
      return Promise.resolve(res);
    } else if (res.code == 10) {
      MessageBox.confirm("身份认证已过期，请重新登录", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        store.dispatch("delToken").then(() => {
          location.reload();
        });
      });
      return Promise.reject(res);
    } else {
      return Promise.reject(res);
    }
  },
  error => {
    // http状态码错误拦截
    Message.error(error.message);
    return Promise.reject(error);
  }
);
export default http;
