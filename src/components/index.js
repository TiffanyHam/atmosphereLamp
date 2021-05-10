/*
 * @Author: your name
 * @Date: 2021-05-08 15:16:18
 * @LastEditTime: 2021-05-10 16:11:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \atmosphereLamp\src\components\index.js
 */

const files = require.context('./common', true, /\.vue$/);

const toFirstUpper = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const install = Vue => {
    files.keys().forEach(filename => {
        const componentConfig = files(filename);
        const componentName = (componentConfig.default && componentConfig.default.name) || `Hi${toFirstUpper(filename.match(/\/(\w*)\.vue/)[1])}`;
        // 全局注册组件
        Vue.component(componentName, componentConfig.default || componentConfig);
    })
}
// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    install
}
