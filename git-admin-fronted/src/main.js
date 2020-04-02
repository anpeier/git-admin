import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "./styles.scss";
import utils from "./utils";
import store from "./store";
import "./loginCheck";

Vue.filter("date-filter", function(value) {
  // 返回处理后的值
  return utils.formatTime(value);
});
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
