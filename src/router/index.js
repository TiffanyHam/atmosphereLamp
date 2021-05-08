/*
 * @Descripttion:
 * @version:
 * @Author: Tiffany
 * @Date: 2020-08-26 17:41:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-08 15:21:24
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 解决路由访问重复时报错问题：
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: "/",
      name: "Main",
      component: () => import("../views/Main.vue"),
    }
  ]
});