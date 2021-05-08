/*
 * @Descripttion:
 * @version:
 * @Author: Tiffany
 * @Date: 2020-08-26 17:41:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-08 15:34:39
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";
import '@/style/reset.css';
import '@/style/icon.scss';
import '@/style/color.scss';
// 组件自动注册
import component from '@/components/index';
Vue.use(component);

import eruda from "eruda/eruda.js"; // 测试工具
eruda.init(); // eruda初始化
// 引入国际化
import i18n from "./i18n/index";
// echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;
// 路由守卫
// import g from './utils/index'
// g.overallSituation(router)

import comMix from './mixins/comMix'
Vue.mixin(comMix)

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");


router.beforeEach((to, from, next) => {
  if (to.path === '/') {
      window.hilink && window.hilink.setTitleVisible && window.hilink.setTitleVisible(true);
      let isDark = window.hilink && window.hilink.getDarkMode && window.hilink.getDarkMode() === 2;
      isDark ? window.hilink && window.hilink.modifyTitleBar && window.hilink.modifyTitleBar(true, '0', '') : window.hilink && window.hilink.modifyTitleBar && window.hilink.modifyTitleBar(false, '0', '');
  } else {
      window.hilink && window.hilink.setTitleVisible && window.hilink.setTitleVisible(false);
  }
next();
return true;
});
