import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import { getToken } from "./utils/auth.js";

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  const token = getToken();
  if (token) {
    if (to.path === "/login") {
      next({ path: "/" });
    }else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
