<!--
 * @Descripttion: 
 * @version: 
 * @Author: Tiffany
 * @Date: 2020-08-26 17:41:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-08 15:23:56
-->
<template>
  <div id="app" :class="{ 'theme-dark': isDark }">
    <transition name="fade-transform" mode="out-in">
      <router-view class="animate"></router-view>
    </transition>
  </div>
</template>
<script>
import { getLanguage } from "./utils/tool";
import reportData from "./utils/reportData";
import { mapActions, mapState } from "vuex";
import Ble from "./utils/ble";
export default {
  provide() {
    return {
      isDarks: this.isDark,
    };
  },
  computed: {
    ...mapState(["isDark"]),
  },
  created() {
    /**
     * serviceId  蓝牙协议id  必传
     * characteristicId 蓝牙协议读取id  必传
     * writeCharacteristicId 蓝牙协议写入id 必传
     * watchStatus 监听蓝牙连接状态函数
     * watchVal 监听蓝牙特征值改变
     * getDevInfo 获取设备信息
     * reConnect 重新连接函数
     * init 连接初始化函数
     * send  发送数据函数
     */
    let that = this;
    window.hiLinkBle = new Ble({
      serviceId: "0000ffb0-0000-1000-8000-00805f9b34fb",
      characteristicId: "0000ffb2-0000-1000-8000-00805f9b34fb",
      writeCharacteristicId: "0000ffb1-0000-1000-8000-00805f9b34fb",
      getDevInfo: (res) => {
        //console.log(res, '设备信息');
      },
      watchStatus: (val) => {
        // 0：初始未连接状态 1：连接中 2：已连接 3: 连接超时
        // console.log('status===============', val);
        that.call_update_bleConnected(val);
        if (val === 2) {
          //连接成功,获取设备状态信息
          that.writeData();
        }
      },
      watchVal: (res) => {
        // 监听蓝牙特征值
        let deviceData = res.data.toUpperCase();
        that.call_update_data(deviceData);
        //工作状态
        if (deviceData.indexOf("F55F070401") == 0) {
          //工作状态
          let openStatus = deviceData.substr(10, 2);
          if (["00", "02"].includes(openStatus)) {
            //开始
            that.$router.push({ name: "animations" });
          }
        }
      },
    });
    window.hiLinkBle.init();

    reportData.getDevId();
    this.$router.beforeEach((to, from, next) => {
      const routeDeep = [];

      for (let i = 0; i < this.$router.options.routes.length; i++) {
        routeDeep.push(this.$router.options.routes[i].name);
      }
      next();
    });
    // 设置语言
    this.$i18n.locale = getLanguage();
    // 获取手机模式
    this.getSystemInfo();
  },
  mounted() {
    if (this.isDark) {
      const $body = document.getElementsByTagName("body")[0];
      //console.log('$body', $body)
      $body.style.background = "#000";
    }
  },
  methods: {
    ...mapActions(["call_update_bleConnected", "call_update_data"]),
    writeData() {
      let data = "f55f0801025f";
      setTimeout(function () {
        window.hiLinkBle.send(data);
      }, 500);
    },
    /*
     * 获取手机系统信息
     */
    getSystemInfo() {
      window.hilink &&
        window.hilink.getSystemInfoSync &&
        window.hilink.getSystemInfoSync("getSystemInfoSyncCallBack");
      window.getSystemInfoSyncCallBack = (info) => {
        let data = JSON.parse(info);
        if (data.platform == "iOS") {
          //console.log("iOS设备")
          window.ios = true;
        } else {
          //console.log("andorid设备")
          window.ios = false;
          window.isDark = this.isDark;
        }
      };
    },
  },
};
</script>


<style lang='scss' scoped>
/* 过渡 */
.a {
  width: 100%;
  height: 100%;
}

.animate {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}
/* 
enter-active 定义进入过渡的结束状态
leave-active 定义离开过渡的结束状态
 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.1s;
}

/* 
enter定义进入过渡的开始状态
 */
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
/* 
leave-to离场动画结束后的状态
 */
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>