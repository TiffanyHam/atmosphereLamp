/*
 * @Author: your name
 * @Date: 2021-03-25 09:25:35
 * @LastEditTime: 2021-04-01 11:45:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AleBrush\src\components\index.js
 */
/*
 * @Author: your name
 * @Date: 2021-03-22 17:06:40
 * @LastEditTime: 2021-03-24 10:59:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AleBrush\src\components\index.js
 */
const requireComponents = require.context('./common', true, /\.vue$/);

// 字符串首字母大写
function firstCharToUpper(str){
    return str.substr(0,1).toUpperCase() + str.substr(1);
}

let install = Vue =>{
    requireComponents.keys().forEach(fileName => {
        // 组件实例
        let com = requireComponents(fileName);
        //console.log(com)
        // 组件名字首字母大写
        let comName = firstCharToUpper(fileName.match(/\/(\w*)\.vue/)[1]);
        // 注册组件
        Vue.component(com.default.name || comName, com.default || com);
    });
}

// 确保是正常环境
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install
}