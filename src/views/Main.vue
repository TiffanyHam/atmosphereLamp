<!--
 * @Author: your name
 * @Date: 2021-03-22 17:06:40
 * @LastEditTime: 2021-05-08 11:26:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AleBrush\src\views\index.vue
-->
<!--  -->
<template>
  <div class="page bg_F7F7F7">
    <div class="index_main">
      <div
        class="content"
        :class="dialogTip || dialogTip1 == true ? 'marginTop' : ''"
      >
        <!-- 产品图 -->
        <div class="banner">
          <div class="productI"></div>
        </div>
        <!-- logo -->
        <div :class="$i18n.locale === 'zh' ? 'logo' : 'logo_en'"></div>
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
          <div v-if="isCharge == '01'">
            <!-- 充电中动画 -->
            <div
              class="posiImg"
              :style="
                isDark == true
                  ? {
                      backgroundImage:
                        'url(' + imgBooth_dark[booth_index] + ')',
                    }
                  : { backgroundImage: 'url(' + imgBooth[booth_index] + ')' }
              "
            ></div>
          </div>
          <div v-else>
            <!-- 电池 -->
            <div class="cell1" v-if="battery == '00'"></div>
            <div class="cell2" v-if="battery == '01'"></div>
            <div class="cell3" v-if="battery == '02'"></div>
            <div class="cell4" v-if="battery == '03'"></div>
            <div class="cell5" v-if="battery == '04'"></div>
            <div class="cell6" v-if="battery == '05'"></div>
          </div>
        </div>
        <!-- one -->
        <div class="hi-card bg_card">
          <div class="item">
            <div class="top">
              <div class="num c_90">
                <span v-if="isflage == isConnect || getScore == 0">--</span
                ><span v-else>{{ getScore }}</span>
              </div>
              <div class="unit c_60">{{ $t("index.score") }}</div>
            </div>
            <div class="name c_60">{{ $t("index.lastScore") }}</div>
          </div>
          <div
            :class="isflage == isConnect ? 'item line noPoint' : 'item line'"
            @click="remain"
          >
            <div class="top">
              <div class="num c_90">
                <span v-if="isflage == isConnect">0</span
                ><span v-else>{{ isDays }}</span>
              </div>
              <div class="unit c_60">{{ $t("index.day") }}</div>
            </div>
            <div class="name c_60 flexR"><span>{{ $t("index.restDay") }}</span><div class="log_right"></div></div>
            
          </div>
        </div>
        <div>
          <!-- second -->
          <div
            class="flexR contentList"
            :class="isflage == isConnect ? 'opacityVal' : ''"
          >
            <!-- 刷牙模式 -->
            <div
              class="itemPlay flexR rightM"
              style="position: relative"
              @click="brushModeClick"
            >
              <div>
                <span>{{ $t("index.brushmode") }}</span
                ><br />
                <div class="text_color" v-if="isflage !== isConnect">
                  <span>{{ modeDisplay | brushMode(te) }}</span>
                </div>
                <HiCardShift
                  class="mt8 cardP"
                  :shiftList="patterns"
                  v-show="isMode"
                  :selectNum="selectIndex"
                  @eventClick="modeClick"
                ></HiCardShift>
              </div>
              <div class="icon_width">
                <div
                  :class="
                    isflage == isConnect
                      ? 'modern_gray patternCommon'
                      : 'modern patternCommon'
                  "
                ></div>
              </div>
            </div>
            <!-- 刷牙时长 -->
            <div
              class="itemPlay flexR"
              style="position: relative"
              @click="brushTimeClick"
            >
              <div>
                <span>{{ $t("index.brushLen") }}</span>
                <div class="text_color" v-if="isflage !== isConnect">
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
          <!-- third -->
          <div class="flexR contentList">
            <!-- 起始位置 -->
            <div
              class="itemPlay flexR rightM"
              @click="toPosition"
              :class="isflage == isConnect ? 'opacityVal' : ''"
            >
              <div>
                <span>{{ $t("index.inPosition") }}</span
                ><br />
                <div class="text_color" v-if="isflage !== isConnect">
                  <span>{{ isPosition | formatStata(te) }}</span>
                </div>
              </div>
              <div class="icon_width">
                <div
                  :class="
                    isflage == isConnect
                      ? 'position_gray patternCommon'
                      : 'position patternCommon'
                  "
                ></div>
              </div>
            </div>
            <!-- 设置 -->
            <div class="itemPlay flexR" @click="setting">
              <div>
                <span>{{ $t("index.MoreSet") }}</span>
              </div>
              <div class="icon_width">
                <div class="set patternCommon"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 刷牙记录 -->
        <div class="moreLog">
          <span class="itemPlay1 logTab flexR">
            <span>{{ $t("index.brushLog") }}</span>
            <div class="fontStyle flexR" @click="getMore">
              <span>{{ $t("index.more") }}</span>
              <div class="log_right"></div>
            </div>
          </span>
          <!-- 无记录显示 -->
          <div class="noLog" v-if="isflage == isConnect || logArr.length == 0">
            <div class="logImg"></div>
            <div class="c_90">{{ $t("index.nolog") }}</div>
          </div>
          <!-- 有记录显示 -->
          <div class="logHistory" v-else>
            <div class="log_arr" v-for="(item, index) in logArr" :key="index">
              <p class="days">
                {{
                  isToday(item.dates)
                    ? dayWeek()
                    : item.dates + " " + getMyDay(new Date(item.dates))
                }}
              </p>
              <div
                v-for="(itemA, index) in item.historyArr"
                :key="index"
                class="hi-timeitem"
              >
               <div
                    class="grade"
                    :style="{ backgroundColor: brushingHistory(itemA.score) }"
                  >
                    {{ itemA.score }}
                  </div>
                <div :class="
                  index < item.historyArr.length - 1
                    ? 'detail_bor hi-timeitem1'
                    : 'hi-timeitem1'
                ">
                 
                  <div class="timeitemMain">
                    <span class="size16 c_90">{{ itemA.brushLens }}</span>
                    <span class="size14 c_60">{{ itemA.time }}</span>
                  </div>
                                  <div class="seconds">{{ itemA.seconds }}</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 充电提示 -->
    <hi-errtip :tip="tips" v-show="dialogTip"></hi-errtip>
    <!-- 天数不足提示 -->
    <hi-errtip :tip="tips1" v-show="dialogTip1"></hi-errtip>
    <!-- 弹窗提示 -->
    <Cdialog v-show="isDialog"></Cdialog>
    <Dialog
      :visiable="dialogVisiable"
      @sendData="getDialogData"
      :isReplace="false"
    ></Dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { brushingHistory } from "../../utils/tool";
import reportData from "../../utils/reportData";
import Dialog from "../RemainTime/ResetDialog.vue";

export default {
  data() {
    return {
      isPosition: 0,
      isflage: true,
      isCharge: "", //判断是否充电
      isConnect: true,
      isDialog: false, //弹窗 连接超时
      battery: "",
      dialogTip: false, //低电量
      dialogTip1: false, //天数不足
      tips: this.$t("Reconnection.index"),
      isDays: 60,
      selectIndex: 0,
      selectIndex1: 0,
      dialogVisiable: false,
      shiftTest: [
        { name: this.$t("BrushTeethLen.length1"), index: 0 },
        { name: this.$t("BrushTeethLen.length2"), index: 1 },
        { name: this.$t("BrushTeethLen.length3"), index: 2 },
      ],
      patterns: [
        { name: this.$t("BrushTeethModel.level1"), index: 0 },
        { name: this.$t("BrushTeethModel.level2"), index: 1 },
        { name: this.$t("BrushTeethModel.level3"), index: 2 },
        { name: this.$t("BrushTeethModel.level4"), index: 3 },
      ],
      // 充电动画
      imgBooth: [
        require("../../assets/image/icon/light/cell1.png"),
        require("../../assets/image/icon/light/cell8.png"),
        require("../../assets/image/icon/light/cell3.png"),
        require("../../assets/image/icon/light/cell4.png"),
        require("../../assets/image/icon/light/cell5.png"),
        require("../../assets/image/icon/light/cell6.png"),
      ],
      booth_index: 0,
      imgBooth_dark: [
        require("../../assets/image/icon/dark/cell1.png"),
        require("../../assets/image/icon/dark/cell8.png"),
        require("../../assets/image/icon/dark/cell3.png"),
        require("../../assets/image/icon/dark/cell4.png"),
        require("../../assets/image/icon/dark/cell5.png"),
        require("../../assets/image/icon/dark/cell6.png"),
      ],
      isTime: false,
      isMode: false,
      timeLen: "00",
      modeDisplay: "", //刷牙模式
      logArr: [],
      getScore: "",
      conentHeight: "",
      wapperHeight: "",
      //isOnce: true,
      timers: null,
      currentTime:'',
      connectTimer: null, // 连接倒计时30秒
      // logArr: [
      //   {
      //     dates: "2021/5/6",
      //     historyArr: [
      //       {
      //         score: "99",
      //         brushLens: "刷牙时长",
      //         time: "08:00:76",
      //         seconds: "1分55秒",
      //       },
      //       {
      //         score: "39",
      //         brushLens: "刷牙时长",
      //         time: "08:00:76",
      //         seconds: "1分55秒",
      //       },
      //       {
      //         score: "69",
      //         brushLens: "刷牙时长",
      //         time: "08:00:76",
      //         seconds: "1分55秒",
      //       },
      //     ],
      //   },
      //   {
      //     dates: "2021/4/7",
      //     historyArr: [
      //       {
      //         score: "12",
      //         brushLens: "刷牙时长",
      //         time: "08:00:76",
      //         seconds: "1分55秒",
      //       },
      //       {
      //         score: "39",
      //         brushLens: "刷牙时长",
      //         time: "08:00:76",
      //         seconds: "1分55秒",
      //       },
      //       {
      //         score: "69",
      //         brushLens: "刷牙时长",
      //         time: "08:00:76",
      //         seconds: "1分55秒",
      //       },
      
      //     ],
      //   },
      // ],
    };
  },
  components: {
    Dialog,
  },
  filters: {
    /**
     * @description: 区域状态显示转换
     * @param {*} status
     * @param {*} te
     * @return {*}
     */
    formatStata(status, te) {
      const statusMap = {
        0: te("BrushTeethPosition.position1"),
        1: te("BrushTeethPosition.position2"),
        2: te("BrushTeethPosition.position3"),
        3: te("BrushTeethPosition.position4"),
      };
      return statusMap[status];
    },
    /**
     * @description: 刷牙模式显示转换
     * @param {*} status
     * @param {*} te
     * @return {*}
     */
    brushMode(status, te) {
      const statusMap = {
        "00": te("BrushTeethModel.level1"),
        "01": te("BrushTeethModel.level2"),
        "02": te("BrushTeethModel.level3"),
        "03": te("BrushTeethModel.level4"),
      };
      return statusMap[status];
    },
    /**
     * @description: 刷牙时长
     * @param {*} status
     * @param {*} te
     * @return {*}
     */
    brushLength(status, te) {
      const statusMap = {
        "00": te("BrushTeethLen.length1"),
        "01": te("BrushTeethLen.length2"),
        "02": te("BrushTeethLen.length3"),
      };
      return statusMap[status];
    },
  },
  mounted() {
   console.log("cleanMOde:", this.cleanMOde);
   // console.log("vuex云端数据：", this.cloudData);
   // console.log("this.electric", this.electric);
    setTimeout(() => {
      this.getCloudHistory();
    }, 300);

    // if(this.electric == ''){
    //   this.battery = '05'
    // }else{
    this.battery = this.electric;
    // }
    this.initData();
    // if (window.isDark) {
    //   window.hilink.modifyTitleBar(true, "#ffffff", "resultCallback");
    // }
  },

  computed: {
    ...mapState([
      "bleConnected",
      "initPosition",
      "data",
      "timeLength",
      "cleanMOde",
      "cloudData",
      "electric",
      'isDark'
    ]),
    tips1() {
      if (this.isDays >= -99 && this.isDays <= -1) {
        return this.$t("Reconnection.index1", { days: 0 });
      }
      return this.$t("Reconnection.index1", { days: this.isDays + 1 });
    },
  },

  watch: {
    electric(n) {
     // console.log("电量监听", n);
      this.battery = n;
    },
    cleanMOde(n){
       this.modeDisplay = n
       this.selectIndex = this.changeStatus(n);
    },
    bleConnected(status) {
     // console.log("蓝牙状态监听：", status);
      //  监听蓝牙连接状态
      if (status == 0) {
        //未连接状态
        window.hiLinkBle.openBlueTooth();
        this.isflage = false;
        this.isConnect = false;
        this.connectTimerFn()
      }
      if (status == 1) {
        //连接中
        this.isflage = false;
        this.isConnect = false;
        this.isDialog = false;
        this.connectTimerFn()
      }
      if (status == 2) {
        //已连接
        //this.getHistory(this.cloudData);
        setTimeout(() => {
          this.getCloudHistory();
        }, 300);
        this.acceptData(this.data); //初始化数据
        this.isflage = false; 
        this.isConnect = true;
        this.isDialog = false;
        clearTimeout(this.connectTimer)
      }
      if (status == 3) {
        //连接超时
        clearTimeout(this.connectTimer)
        this.isflage = true;
        this.isConnect = true;
        this.isDialog = true;
      }
    },
    data(value) {
      console.log("数据变化", value);
      if (value) {
        this.acceptData(value);
      }
    },
    // cloudData(val){
    //   if (val) {
    //     this.getHistory(val);
    //   }
    // }
    // isCharge(n) {
    //   if (n == "01") {
    //       this.booth_index = 0;
    //       this.chargePro()
    //   } else {
    //       clearInterval(this.timers);
    //       this.booth_index = 0;
    //       this.timers = null;
    //   }
    // }
  },
  methods: {
    ...mapActions(["setCloudData", "save_elec", "saveMode"]),

    /**
     * @description: 初始化数据
     * @param {*}
     * @return {*}
     */
    initData() {
      this.isPosition = this.initPosition;
      if (this.timeLength == "") {
        this.timeLen = "00";
      } else {
        this.timeLen = this.timeLength;
      }
      this.selectIndex1 = this.changeStatus(this.timeLength);

    
       this.modeDisplay = this.cleanMOde;
      this.selectIndex = this.changeStatus(this.cleanMOde);
     // this.selectIndex = this.changeStatus(this.modeDisplay);


      if (this.bleConnected == 0) {
        //未连接状态
        window.hiLinkBle.openBlueTooth();
        this.isflage = false;
        this.isConnect = false;
        this.connectTimerFn()
      }
      if (this.bleConnected == 1) {
        //连接中
        this.isflage = false;
        this.isConnect = false;
        this.isDialog = false;
        this.connectTimerFn()
      }
      if (this.bleConnected == 2) {
        //this.getHistory(this.cloudData);
        this.acceptData(this.data); //初始化数据
        this.isflage = false; //已连接
        this.isConnect = true;
        this.isDialog = false;
        clearTimeout(this.connectTimer)
      }
      if (this.bleConnected == 3) {
        //连接超时
        clearTimeout(this.connectTimer)
        this.isflage = true;
        this.isConnect = true;
        this.isDialog = true;
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
     * @description: 数据解析
     * @param {*} data
     * @return {*}
     */
    acceptData(data) {
      console.log(data)
      if (data.indexOf("F55F07100100") == 0) {
        console.log("设置成功");
      }
      if (data.indexOf("F55F070201") == 0) {
        //刷牙模式
        this.modeDisplay = data.substr(10, 2);
        console.log('刷牙模式:',this.modeDisplay)
        this.saveMode(this.modeDisplay)
      }
      if (data.indexOf("F55F070301") == 0) {
        this.battery = String(data.substr(10, 2));
       // console.log("电量", this.battery);
        this.save_elec(this.battery); //存储电量

        //电量不足
        if (this.battery === "01" || this.battery === '00') {
          this.dialogTip = true;
        }
      }
      if (data.indexOf("F55F070501") == 0) {
        this.isCharge = String(data.substr(10, 2));
      //  console.log("充电中", this.isCharge);
        if (this.isCharge == "01") {
          //充电中
          this.chargePro();
          this.dialogTip = false;
        } else {
          //电池
          clearInterval(this.timers);
        }
      }
    },

    /**
     * @description: 云端取数据
     * @param {*}
     */
    getCloudHistory() {
      let resCallback = (res) => {
       console.log("云端数据返回：", res);
        if (res && res.length <= 0 && (localStorage.getItem('current_time') == null)) {
          //历史记录为空时上报第一次日期
            reportData.resize(new Date().getTime() + 1000);
        } else {
          this.getHistory(res);
          //this.setCloudData(res)
        }
      };
      reportData.getHistoryLog(resCallback);
    },
    /**
     * @description: 刷牙记录
     * @param {*}
     * @return {*}
     */
    getHistory(res) {
      console.log('getHistory-res', res)
      if (!res) return
      var fuzzyArr = this.fuzzyQuery(res, "XXXXXX_");
      console.log('fuzzyArr',fuzzyArr)
      if (fuzzyArr.length !== 0) {
        let fixDate = fuzzyArr[0].data.score.split("_")[1];
        let currentTime = localStorage.getItem('current_time');
        let currentDate = reportData.formatDate1(Date.parse(new Date()));
        console.log('fixDate: ',fixDate)
        console.log('currentTime: ', currentTime)
        console.log('currentDate: ', currentDate)
        if(currentTime){
          this.isDays = 60 - this.getDays(currentTime, currentDate);
        }else{
          this.isDays = 60 - this.getDays(fixDate, currentDate);
        }
      } else {
        this.isDays = 60;
      }
      //刷牙天数不足
      if (this.isDays < 10) {
        this.dialogTip1 = true;
        if (this.isDays >= -99 && this.isDays <= -1) {
          this.dialogVisiable = true;
        }
      }
      var getArr = [];
      for (var x in res) {
        var data = res[x].data.score;
        getArr.push(data);
      }
      // console.log('getArr',getArr)
      var filterData = getArr.filter(
        (item) => !new RegExp("XXXXXX_").test(item)
      );
      //console.log("filterData:", filterData);
      if (filterData.length !== 0) {
        var ss = this.getArrList(filterData)[0];
        this.getScore = ss[0].score;
        // console.log('分数：',this.getScore)

        var cc = this.getArrList(filterData)[1];
        this.logArr = cc.slice(0, 2);
        this.logArr.forEach((item) => {
          item.historyArr = item.historyArr.slice(0, 10);
        });

        console.log('两天：',this.logArr)
      } else {
        this.getScore = 0;
      }
    },
    /**
     * @description: 数据过滤
     * @param {*}
     */
    getArrList(newList) {
      let dataArr = [];
      for (var j in newList) {
        var item = {};
        var allData = newList[j].split("_");
        var [dates, times, timeLen, scores] = allData;

        item.dates = dates;
        item.score = scores;
        item.brushLens = `${this.$t("index.brushLen")}`;
        item.time = times;
        item.seconds = this.getTimeParse(timeLen);
        dataArr.push(item);

        var newArr = []; //按日期分类后的数据
        dataArr.forEach((item, i) => {
          let index = -1;
          let isExists = newArr.some((newItem, j) => {
            if (item.dates == newItem.dates) {
              index = j;
              return true;
            }
          });
          if (!isExists) {
            newArr.push({
              dates: item.dates,
              historyArr: [item],
            });
          } else {
            newArr[index].historyArr.push(item);
          }
        });
      }
      return [dataArr, newArr];
    },
    /**
     * @description: 今天 星期几
     * @param {*}
     * @return {*}
     */
    dayWeek() {
      var a = new Array(
        `${this.$t("index.weeks.Sun")}`,
        `${this.$t("index.weeks.Mon")}`,
        `${this.$t("index.weeks.Tue")}`,
        `${this.$t("index.weeks.Wed")}`,
        `${this.$t("index.weeks.Thu")}`,
        `${this.$t("index.weeks.Fri")}`,
        `${this.$t("index.weeks.Sat")}`
      );
      var week = new Date().getDay();
      var str = `${this.$t("index.weeks.today")}` + a[week];
      return str;
    },
    /**
     * @description:根据日期判断星期几
     * @param {*} date
     * @return {*}
     */
    getMyDay(date) {
      var week;
      if (date.getDay() == 0) week = `${this.$t("Log.week.Sun")}`;
      if (date.getDay() == 1) week = `${this.$t("Log.week.Mon")}`;
      if (date.getDay() == 2) week = `${this.$t("Log.week.Tus")}`;
      if (date.getDay() == 3) week = `${this.$t("Log.week.Wed")}`;
      if (date.getDay() == 4) week = `${this.$t("Log.week.Thu")}`;
      if (date.getDay() == 5) week = `${this.$t("Log.week.Fri")}`;
      if (date.getDay() == 6) week = `${this.$t("Log.week.Sat")}`;
      return week;
    },
    /**
     * @description: 根据日期判断是否为今天
     * @param {*}
     * @return {*}
     */
    isToday(str) {
      var d = new Date(str.replace(/-/g, "/"));
      var todaysDate = new Date();
      if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * @description: 分秒中英解析
     * @param {*} val
     * @return {*}
     */
    getTimeParse(val) {
      if (val) {
        var str = val.substr(1, 1); //min
        var str1 = val.substr(3, 2); //seconds
        return (
          str +
          ` ${this.$t("index.minute")} ` +
          str1 +
          ` ${this.$t("index.second")} `
        );
      }
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
    /**
     * @description: 获取颜色值
     * @param {*} val
     * @return {*}
     */
    brushingHistory(val) {
      return brushingHistory.getColor(val);
    },
    brushTimeClick() {
      this.isTime = !this.isTime;
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
      }
      // console.log("选择", this.timeLen);
      this.$store.dispatch("save_time", this.timeLen);
      let param = "F55F060101" + mode + last;
      window.hiLinkBle.send(param);
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
      }
    },
    brushModeClick() {
      this.isMode = !this.isMode;
    },
    /**
     * @description: 模式选择
     * @param {*} val
     * @return {*}
     */
    modeClick(val) {
      let index = val.index;
      this.selectIndex = index;
      let mode = "";
      let last = "";
      switch (index) {
        case 0:
          this.modeDisplay = "00";
          mode = "00";
          last = "5D";
          break;
        case 1:
          this.modeDisplay = "01";
          mode = "01";
          last = "5E";
          break;
        case 2:
          this.modeDisplay = "02";
          mode = "02";
          last = "5F";
          break;
        case 3:
          this.modeDisplay = "03";
          mode = "03";
          last = "60";
          break;
      }
      
      this.saveMode(this.modeDisplay)
      //console.log('vuex---cleanMOde',this.cleanMOde)
      let param = "F55F060201" + mode + last;
      window.hiLinkBle.send(param);
    },
    /**
     * @description: 电池充电状态动画
     * @param {*}
     * @return {*}
     */
    chargePro() {
      let that = this;
      this.timers = setInterval(() => {
        that.booth_index++;
        if (that.booth_index == 6) {
          that.booth_index = 0;
        }
      }, 1000);
    },
    /**
     * 使用test方法实现模糊查询
     * @param  {Array}  list     原数组
     * @param  {String} keyWord  查询的关键词
     * @return {Array}           查询的结果
     */
    fuzzyQuery(list, keyWord) {
      console.log
      var arr = [];
      for (var i = 0; i < list.length; i++) {
        if (new RegExp(keyWord).test(list[i].data.score)) {
          arr.push(list[i]);
        }
      }
      return arr;
    },
    /**
     * @description: 根据日期计算天数
     * @param {*} date1
     * @param {*} date2
     * @return {*}
     */
    getDays(date1, date2) {
      var a1 = Date.parse(new Date(date1));
      var a2 = Date.parse(new Date(date2));
      var day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数
      return day;
    },
    // 设置---跳转
    setting() {
      this.$router.push("Setting");
    },
    //天数
    remain() {
      this.$router.push({ path: "RemainTime", query: { day: this.isDays } });
    },
    //起始位置
    toPosition() {
      this.$router.push({ name: "BrushPosition" });
    },
    //更多
    getMore() {
      this.$router.push({ name: "Log" });
    },
    /**
     * @description: 弹窗派发事件  更换刷头--已更换按钮
     * @param {*}
     * @return {*}
     */
    getDialogData(val) {
      this.dialogVisiable = val.componentsVisiable;
      if (val.value) {
        reportData.resize(new Date().getTime() + 1000);
        this.isDays = 60;
      }
    },
    /** 连接倒计时 */
    connectTimerFn () {
      if (this.connectTimer) {
        clearTimeout(this.connectTimer)
        this.connectTimer = null
      }
      this.connectTimer = setTimeout (() =>{
        this.isflage = true;
        this.isConnect = true;
        this.isDialog = true;
      },30*1000)
    }
  },
  beforeDestroy() {
    clearTimeout(this.connectTimer)
  }
};
</script>

<style scoped lang="scss">
.page {
  // width: 100%;
  // height: 100%;
  //position: relative;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .mt8 {
    margin-top: 0.22rem;
  }
  .cardP {
    position: absolute;
    bottom: 73px;
    left: 0%;
  }
  .index_main {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    .content {
      width: 100%;
      padding: 0 16px;
      flex: 1;
      overflow: auto;
    }
    .marginTop {
      margin-top: 48px;
    }
    .itemPlay {
      flex: 1;
      height: 64px;
      background-color: #fff;
      padding: 0 24px;
      border-radius: 8px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.9);
    }
    .itemPlay1 {
      flex: 1;
      height: 64px;
      // padding: 0 24px;
      border-radius: 8px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.9);
    }
    .moreLog {
      //background-color: #fff;
      width: 100%;
      height: auto;
      border-radius: 8px;
      //flex: 1;
      margin-bottom: 8px;
      .noLog {
        text-align: center;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.9);
        margin: 30px 0;
        .logImg {
          width: 53px;
          height: 53px;
          margin: 0 auto;
          opacity: 0.6;
          margin-bottom: 8px;
        }
      }

      .logHistory {
        //  padding: 0 24px;
        line-height: 1.77;
        font-size: 0.388rem;
        .log_arr {
          margin: 0 0 10px 0;
          .days {
            color: rgba(0, 0, 0, 0.86);
            margin-top: 4px;
            font-size: 14px;
          }
        }
      }
      .detail_bor {
       // padding-bottom: 11px;
        border-bottom: 0.00694rem solid rgba(0, 0, 0, 0.2);
      }
      
      .hi-timeitem {
        display: flex;
        //justify-content: space-between;
        align-items: center;
        height: 1.77rem;
        .hi-timeitem1{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.77rem;
        flex: 1;
          }
        .grade {
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 50%;
          margin-right: 19px;
          font-size: 16px;
          color: #fff;
          // background: red;
        }
        .timeitemMain {
          display: flex;
          flex-direction: column;
          justify-content: center;
          line-height: 1.33;
          .size16 {
            font-size: 0.44rem;
            margin-bottom: 0.055rem;
          }
          .size14 {
            font-size: 0.388rem;
          }
        }
        .seconds {
          color: rgba(0, 0, 0, 0.6);
          font-size: 14px;
        }
      }
      .logTab {
        height: 48px;
      }
      .fontStyle {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.6);
      }
      
    }
    .flexR {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    .log_right {
        width: 6px;
        height: 10px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin: 0 0 1px 4px;
        opacity: 0.38;
      }
    .banner {
      .productI {
        width: 252px;
        height: 252px;
        background-image: url("../../assets/image/product/product.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin: 0 auto;
      }
    }
    .cell1,
    .cell2,
    .cell3,
    .cell4,
    .cell5,
    .cell6,
    .posiImg {
      width: 24px;
      height: 24px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-right: 0.22222222rem;
    }
    .loading_icon {
      width: 40px;
      height: 40px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      -webkit-animation: load 1.5s linear infinite;
      animation: load 1.5s linear infinite;
    }
    /*Chorme,Safari必须加上*/
    @-webkit-keyframes load {
      to {
        -webkit-transform: rotate(0deg);
      }
      from {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes load {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .logo,
    .logo_en {
      width: 70px;
      height: 18px;
      background-image: url("../../assets/image/product/logo.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 0 auto;
      margin-bottom: 10px;
    }
    .opacityVal {
      opacity: 0.38;
      pointer-events: none;
    }
    .noPoint {
      pointer-events: none;
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
      .text_margin1 {
        font-size: 24px;
      }
      .text_margin {
        color: rgba(0, 0, 0, 0.6);
        margin-top: 8px;
        font-size: 12px;
      }
    }
    .contentList {
      margin: 0 0 8px 0;

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
    .index_main {
      .itemPlay,
      .connectState {
        background-color: #262626;
        color: rgba(255, 255, 255, 0.86);
      }
      .itemPlay1 {
        color: rgba(255, 255, 255, 0.86);
      }
      .contentList {
        .text_color {
          color: #3f97e9;
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
        border-left: 0.00694rem solid rgba(255, 255, 255, 0.2);
      }
      .moreLog {
        .fontStyle {
          color: rgba(255, 255, 255, 0.66);
        }
        .hi-timeitem {
          //  border-bottom: 0.00694rem solid rgba(255, 255, 255, 0.2);
          .seconds {
            color: rgba(255, 255, 255, 0.6);
          }
        }
        .detail_bor {
          border-bottom: 0.00694rem solid rgba(255, 255, 255, 0.2);
        }
        .log_arr {
          .days {
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }

      .banner {
        .productI {
          opacity: 0.86;
        }
      }
    }

    .logHistory {
      .log_arr {
        .days {
          color: rgba(255, 255, 255, 0.6) !important;
        }
      }
    }
  }
}
</style>