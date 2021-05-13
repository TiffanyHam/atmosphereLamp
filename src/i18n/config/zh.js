/*
 * @Author: your name
 * @Date: 2021-05-08 15:16:18
 * @LastEditTime: 2021-05-13 10:05:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \atmosphereLamp\src\i18n\config\zh.js
 */
const zh = {
  index: {
    noConnect: "未连接",
    connect: "连接中",
    on: "已开启",
    off:'已关闭',
    again: "重新连接",
    ClassicColor: "经典颜色",
    use: "使用中",
  },
  //经典颜色
  ClassicColor: {
    length1: "夕阳红",
    length2: "动感橙",
    length3: "温馨黄",
    length4: "草原绿",
    length5: "天空蓝",
    length6: "时尚紫",
    length7: "浪漫粉",
  },
  //亮度
  brightness: {
    bright1: "全局亮度",
    bright2: "轮廓亮度",
    bright3: "氛围亮度",
    bright4: "其他亮度",
  },
  //灯光模式
  brightMode: {
    mode:'灯光模式',
    mode1: "呼吸模式",
    mode2: "渐变模式",
    mode3: "循环模式",
    mode4: "爆闪模式",
    mode5: "音律模式",
    mode6: "运动模式",
    mode7: "炫彩模式",
    mode8: "自然光",
  },
    // 倒计时  超时弹窗  
    Hint: {
      tipTitle: '连接超时',
      tipText: '请尝试以下操作：',
      tipText1: '1. 请确认设备接通电源，并处开机状态',
      tipText2: '2. 将设备靠近要连接的手机(10米以内)',
      tipText3: '3. 关闭手机蓝牙，再重新开启（尤其是安卓设备）',
      known:'知道了'
    }
};
export default zh;
