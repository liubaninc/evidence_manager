import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import NProgress from "nprogress";
import { localCache } from "@/utils/utils";

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "hash",
  linkActiveClass: "Active",
  routes: [...routes],
});



NProgress.configure({
  easing: "ease",
  speed: 500,
  trickleRate: 0.02,
  trickleSpeed: 500,
  showSpinner: false,
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  let { meta } = to;
  let userInfo = localCache.get("m_userInfo");

  if (to.path == '/login' && userInfo) {
    return next('/menu');
  }

  if (meta && meta.isNeedLogin) {
    if (userInfo) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
