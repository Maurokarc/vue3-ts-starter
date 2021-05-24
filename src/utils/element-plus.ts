import { App } from "vue";
import elementPlus from "element-plus";
import i18n from "@/i18n";

import "element-plus/lib/theme-chalk/index.css";

const plugin = {
  install: (app: App) => {
    app.use(elementPlus, {
      i18n: i18n.global.t
    });
  }
};

export default plugin;
