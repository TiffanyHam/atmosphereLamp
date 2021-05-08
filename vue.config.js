/*
 * @Descripttion:
 * @version:
 * @Author: Tiffany
 * @Date: 2020-08-26 17:45:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-26 11:18:38
 */
"use strict";
const path = require("path");
//const CopyWebpackPlugin = require("copy-webpack-plugin"); // 这里引入`这个CopyWebpackPlugin`插件
//const HtmlWebpackPlugin = require("html-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  assetsDir: "static",
  // 输出文件目录
  outputDir: "h5_001",
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true, // 编译完成是否打开网页
    hot: true // 开启热加载
  },
  pluginOptions: {},
  configureWebpack: {
    // 对原生的webpack进行配置
    // devServer: {
    //   contentBase: [path.resolve(__dirname, "static")]
    // },
    // 简单/基础配置，比如引入一个新插件
    resolve: {
      alias: {
        "@": resolve("src"),
        '@image': resolve('src/assets/image'),
      }
    },
    plugins: [
      //   new CopyWebpackPlugin([
      //     {
      //       from: path.resolve(__dirname, "../static"),
      //       to: "static",
      //       ignore: [".*"]
      //     }
      //   ])
      //   new HtmlWebpackPlugin({
      //     template: "index.html", //根据index.html模板生成dist下的index.html
      //     filename: path.resolve(__dirname, "../1.0/index.html"), // 指定生成的文件的名称，该文件存在于内存中，在目录中不显示
      //     inject: true
      //     // children: true
      //   })
    ]
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 36
          })
        ]
      }
    }
  }
};
