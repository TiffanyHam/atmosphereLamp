<!--
 * @Author: your name
 * @Date: 2021-03-22 17:06:40
 * @LastEditTime: 2021-05-08 17:25:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AleBrush\src\views\index.vue
-->
<!--  -->
<template>
  <div class="page bg_F7F7F7">
    <!-- 产品图 -->
    <div class="productI"></div>
    <!-- logo -->
    <div class="logo"></div>
    <!-- 连接状态 -->
    <div class="connectState flexR" v-show="isflage">
      <div>{{ $t("index.noConnect") }}</div>
      <div class="c_007DFF again" @click="reConnect">
        {{ $t("index.again") }}
      </div>
    </div>
    <div class="connectState flexR" v-show="!isflage && !isConnect">
      <div>{{ $t("index.connect") }}</div>
      <div class="loading_icon"></div>
    </div>
    <div class="connectState flexR" v-show="!isflage && isConnect">
      <div>{{ $t("index.connected") }}</div>
    </div>
    <!-- second -->
    <div
      class="flexR contentList"
      @click="brushTimeClick"
      :class="isflage == isConnect ? 'opacityVal' : ''"
    >
      <div>
        <span>{{ $t("index.ClassicColor") }}</span
        ><br />
        <div class="text_color" v-if="isflage == isConnect">
          <span>{{ timeLen | brushLength(te) }}</span>
        </div>
      </div>
      <div class="icon_width">
        <div
          :class="
            isflage == isConnect
              ? 'time_len_gray patternCommon'
              : 'time_len patternCommon'
          "
        ></div>
      </div>
      <HiCardShift
        class="mt8 cardP"
        :shiftList="shiftTest"
        v-show="isTime"
        :selectNum="selectIndex1"
        @eventClick="timeClick"
      ></HiCardShift>
    </div>
  </div>
</template>
   
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      isflage: true,
      isConnect: true,
      timeLen: "00",
      isTime: false,
      shiftTest: [
        { name: this.$t("ClassicColor.length1"), index: 0 },
        { name: this.$t("ClassicColor.length2"), index: 1 },
        { name: this.$t("ClassicColor.length3"), index: 2 },
        { name: this.$t("ClassicColor.length4"), index: 3 },
        { name: this.$t("ClassicColor.length5"), index: 4 },
        { name: this.$t("ClassicColor.length6"), index: 5 },
        { name: this.$t("ClassicColor.length7"), index: 6 },
      ],
      selectIndex1: 0,
    };
  },
  computed: {
    ...mapState(["bleConnected", "data", "timeLength"]),
  },
  mounted() {
    this.initData();
  },
  filters: {
    /**
     * @description: 刷牙时长
     * @param {*} status
     * @param {*} te
     * @return {*}
     */
    brushLength(status, te) {
      const statusMap = {
        "00": te("ClassicColor.length1"),
        "01": te("ClassicColor.length2"),
        "02": te("ClassicColor.length3"),
        "03": te("ClassicColor.length4"),
        "04": te("ClassicColor.length5"),
        "05": te("ClassicColor.length6"),
        "06": te("ClassicColor.length7"),
      };
      return statusMap[status];
    },
  },
  methods: {
    brushTimeClick() {
      this.isTime = !this.isTime;
    },
    initData() {
      if (this.timeLength == "") {
        this.timeLen = "00";
      } else {
        this.timeLen = this.timeLength;
      }
      this.selectIndex1 = this.changeStatus(this.timeLength);
    },
    changeStatus(val) {
      switch (val) {
        case "00":
          return 0;
        case "01":
          return 1;
        case "02":
          return 2;
        case "03":
          return 3;
        case "04":
          return 4;
        case "05":
          return 5;
        case "06":
          return 6;
      }
    },
    /**
     * @description: 重新连接
     * @param {*}
     * @return {*}
     */
    reConnect() {
      window.hiLinkBle.reConnect();
    },
    /**
     * @description: 时长控制
     * @param {*} val
     * @return {*}
     */
    timeClick(val) {
      let index = val.index;
      this.selectIndex1 = index;
      let mode = "";
      let last = "";
      switch (index) {
        case 0:
          this.timeLen = "00";
          mode = "00";
          last = "5C";
          break;
        case 1:
          this.timeLen = "01";
          mode = "01";
          last = "5D";
          break;
        case 2:
          this.timeLen = "02";
          mode = "02";
          last = "5E";
          break;
        case 3:
          this.timeLen = "03";
          mode = "03";
          last = "5C";
          break;
        case 4:
          this.timeLen = "04";
          mode = "04";
          last = "5D";
          break;
        case 5:
          this.timeLen = "05";
          mode = "05";
          last = "5E";
          break;
        case 6:
          this.timeLen = "06";
          mode = "06";
          last = "5E";
          break;
      }
      // console.log("选择", this.timeLen);
      this.$store.dispatch("save_time", this.timeLen);
      let param = "F55F060101" + mode + last;
      //window.hiLinkBle.send(param);
    },
    /**
     * @description: 过滤器中i18n
     * @param {*} arg
     * @return {*}
     */
    te(arg) {
      const hasKey = this.$te(arg);
      if (hasKey) {
        const result = this.$t(arg);
        return result;
      }
      return arg;
    },
  },
};
</script>
   
<style scoped lang="scss">
.page {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow: auto;
  .flexR {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .productI {
    width: 252px;
    height: 252px;
    background-image: url("../assets/image/product/product.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
  }
  .logo {
    width: 70px;
    height: 18px;
    background-image: url("../assets/image/product/logo.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  .connectState {
    background-color: #fff;
    padding: 0 24px;
    border-radius: 8px;
    height: 88px;
    font-size: 18px;
    margin: 0 0 8px 0;
    color: rgba(0, 0, 0, 0.9);
    .again {
      font-size: 0.44444444rem;
    }
  }
  .contentList {
    height: 64px;
    background-color: #fff;
    padding: 0 24px;
    border-radius: 8px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    position: relative;
    .cardP {
      position: absolute;
      bottom: 73px;
      left: 0%;
    }
    .opacityVal {
      opacity: 0.38;
      pointer-events: none;
    }

    .text_color {
      margin-top: 8px;
      font-size: 0.33rem;
      color: #007dff;
    }
    .icon_width {
      width: 24px;
    }
    .rightM {
      margin-right: 8px;
    }
    .patternCommon {
      width: 24px;
      height: 24px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .hi-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 2.44rem;
      margin: 0 0 8px 0;
      .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 0 0.22rem;
        line-height: 1.33;
        .top {
          display: flex;
          align-items: baseline;
          .num {
            font-size: 0.66rem;
          }
          .unit {
            margin-left: 0.055rem;
            font-size: 0.33rem;
          }
        }
        .name {
          margin-top: 0.055rem;
          font-size: 0.33rem;
        }
      }
    }
    .line::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 40px;
      width: 1px;
      border-left: 0.00694rem solid rgba(0, 0, 0, 0.2);
    }
  }
}
// 暗黑模式
.theme-dark {
  .page {
    background-color: #000;
  }
}
</style>