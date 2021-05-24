import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import elementPlugin from "@/utils/element-plus";
import i18n from "@/i18n";
import router from "@/router";
import { key, store } from "@/store";
import App from "./App.vue";
import "@/style/global.scss";
import "@/icons";

createApp(App)
  .use(elementPlugin)
  .use(i18n)
  .use(store, key)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
