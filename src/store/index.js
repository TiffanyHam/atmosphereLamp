/*
 * @Author: your name
 * @Date: 2021-02-05 16:14:25
 * @LastEditTime: 2021-05-08 15:25:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \brood-pressure-demo - one\src\store\common.js
 */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
window.isHilinkDark =
  (window.hilink &&
    window.hilink.getDarkMode &&
    window.hilink.getDarkMode()) === 2;
export default new Vuex.Store({
  namespaced: true,//开启命名空间
  state: {
    bleConnected: 1, // 监听设备蓝牙连接结果
    data:'',
    isDark: window.isHilinkDark, // 是否是暗黑模式
  },
  mutations: {
    UPDATED_BLECONNECTED(state,payload) {
      state.bleConnected = payload;
    },
    UPDATE_DATA(state,payload){
      state.data = payload;
    }
  },
  actions: {
    call_update_bleConnected(content,payload){
      content.commit('UPDATED_BLECONNECTED',payload)
     },
    call_update_data(content,payload){
      content.commit('UPDATE_DATA',payload)
    }
  },
  getters: {
     
  },
});
