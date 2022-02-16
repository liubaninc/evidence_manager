/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */
const path = require("path");
const webpack = require('webpack');

function resolve (dir) {
  return path.join(__dirname, dir);
}


let url = "http://8.131.225.170:9999";
module.exports = {
  publicPath: "./", // 打包基本路径
  configureWebpack: {
    devtool: process.env.NODE_ENV === "production" ? "false" : "source-map",
  },
  // lintOnSave是否在保存的时候使用 `eslint-loader` 进行检查,有效的值：`ture` | `false` | `"error"`  当设置为 `"error"` 时，检查出的错误会触发编译失败
  lintOnSave: false,
  productionSourceMap: false, // 生产环境是否需要打包map
  chainWebpack: (config) => {
    // 配置路径别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@components", resolve("src/components"))
      .set("@api", resolve("src/api"))
      .set("@assets", resolve("src/assets"))
      .set("@server", resolve("src/server"));
    const entry = config.entry("app");
    entry.add("babel-polyfill").end();
    entry.add("classlist-polyfill").end();

    const html = config.plugin("html");
    html.tap((args) => {
      args[0].title = process.env.VUE_APP_TITLE;
      return args;
    });

  },
  // 配置转发代理cli 3.5 以后不需要再配置
  devServer: {
    disableHostCheck: true,
    // port: 8080,
    open: true, // 配置浏览器自动打开
    // host: 'localhost', // 默认是localhost
    proxy: {
      "^/api": {
        target: url,
        ws: false, // 需要websocket 开启
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
};
