import { keys } from "lodash";
import * as VueI18n from "vue-i18n";

import tw from "./lang/zh-TW";
import cn from "./lang/zh-CN";

const i18n = VueI18n.createI18n({
  locale: "zh-TW",
  fallbackLocale: "zh-TW",
  messages: {
    "zh-TW": tw,
    "zh-CN": cn
  }
});

export default i18n;

export const localeKeys = keys(i18n.global.messages);
export const fallbackLocale = i18n.global.fallbackLocale.toString();
