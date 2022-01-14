/**
 * 左侧菜单
 */
export let leftMenus = [
  {
    id: 100001,
    text: "订单管理",
    icon: "iconfont contract-hetong3",
    url: "",
    children: [
      {
        id: "100001_1",
        text: "存证套餐配置",
        icon: "iconfont contract-line-draftcaogao",
        children: [],
        url: "/store",
        preKey: "core_",
      },
      {
        id: "100001_2",
        text: "取证套餐配置",
        icon: "iconfont contract-line-draftcaogao",
        children: [],
        url: "/fetch",
        preKey: "fetch_",
      },
    ],
  },
  {
    id: 100002,
    text: "用户管理",
    icon: "iconfont contract-hetong3",
    url: "",
    children: [
      {
        id: "100002_1",
        text: "用户审核列表",
        icon: "iconfont contract-line-draftcaogao",
        children: [],
        url: "/review",
        preKey: "wal_",
      },
    ],
  },
];
