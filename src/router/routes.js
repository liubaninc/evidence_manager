import layout from "@/components/layout";
import viewport from "@/components/viewport/index.vue";
export default [
  {
    path: "/",
    component: layout,
    redirect: "/store",
    children: [
      {
        path: "/store",
        component: viewport,
        children: [
          {
            path: "",
            meta: {
              isNeedLogin: true
            },
            component: () =>
              import(
                /* webpackChunkName: "store/index" */ "@/views/store"
              ),
          }
        ],
      },
      {
        path: "/fetch",
        component: viewport,
        children: [
          {
            path: "",
            meta: {
              isNeedLogin: true
            },
            component: () =>
              import(
                /* webpackChunkName: "fetch/index" */ "@/views/fetch"
              ),
          }
        ],
      },
      {
        path: "/review",
        component: viewport,
        children: [
          {
            path: "",
            meta: {
              isNeedLogin: true
            },
            component: () =>
              import(
              /* webpackChunkName: "review/index" */ "@/views/review/index"
              ),
          },
        ],
      },
      {
        path: "/user",
        component: viewport,
        children: [
          {
            path: "auth",
            name: "auth",
            component: viewport,
            children: [
              {
                path: "",
                meta: {
                  isNeedLogin: true
                },
                component: () =>
                  import(
                    /* webpackChunkName: "auth/index" */ "@/views/user/auth"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login/index" */ "@/views/login"),
  },
  {
    path: "/forget",
    name: "forget",
    component: () =>
      import(/* webpackChunkName: "forget/index" */ "@/views/forget"),
  },
];
