import axios from "axios";
import { Message } from "element-ui";
const http = axios.create({
  baseURL: "http://localhost:9240"
  // timeout: 10000,
});
http.interceptors.response.use(
  response => {
    // 接口错误拦截
    console.log(response);
    let res = response.data;
    console.log(res);
    if (res.code == 1) {
      // 成功
      return res.data;
    } else if (res.code == 0) {
      // Message.warning(res.message);
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  error => {
    // http状态码错误拦截
    return Promise.reject(error);
  }
);
export default http;