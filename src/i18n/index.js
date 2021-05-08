/*
 * @Descripttion:
 * @version:
 * @Author: Tiffany
 * @Date: 2020-11-11 11:25:24
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-11-12 10:04:20
 */
import Vue from "vue";
import VueI18n from "vue-i18n";

import zh from "./config/zh";
import en from "./config/en";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh",
  messages: {
    zh,
    en
  },
  silentTranslationWarn: true
});

export default i18n;
