import { createRouter, createWebHistory, Router } from "vue-router";
import i18n, { fallbackLocale } from "@/i18n";
import routes from "./routes";
import { useStore } from "@/store";
import { AuthActions } from "@/store/enums";

const store = useStore();

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

//Handle route lang
router.beforeEach((to, from, next) => {
  const locale = (to.params.lang as string) || fallbackLocale;

  i18n.global.locale = locale;

  next();
});

// Navigation user permission hook
router.beforeResolve(async (to, from, next) => {
  const hasAuthenticated = await store.dispatch(AuthActions.AJAX_CHECK_AUTHENTICATED);

  if (!hasAuthenticated && to.meta.requiresAuth) {
    next({ name: "login", query: { redirect: to.path || "/" } });
    return;
  } else if (hasAuthenticated && to.name === "login") {
    next({ path: "/" });
    return;
  }

  next();
});

export default router;

export function toLocalePath(routeName: string, locale?: string) {
  const lang = locale || (router.currentRoute.value.params.lang as string) || "";

  router.push({ name: routeName, params: { lang } });
}
