// @ts-nocheck
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import VueClipboard from "vue-clipboard2";
import filters from "@/utils/filters";
// import JsonViewer from "vue-json-viewer";
import App from "./App.vue";
import router from "./router";
import vueEsign from "vue-esign";
//图片放大组件
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer)
Vue.config.productionTip = false;
/**注册全局过滤器 */
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
Vue.use(ElementUI);
// Vue.use(VueClipboard);
// Vue.use(JsonViewer);
Vue.use(vueEsign);
new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
