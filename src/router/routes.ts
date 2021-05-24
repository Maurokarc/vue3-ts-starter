import { RouteRecordRaw } from "vue-router";
import { NavItem } from "@/models";
import { localeKeys } from "@/i18n";
import { get } from "lodash";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    showInNav?: boolean;
  }
}

function viewResolve(path: string): Promise<typeof import("*.vue")> {
  // ref : https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
  return import(`../views/${path}.vue`);
}

const routeTemplete = {
  template: `<router-view></router-view>`
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "home",
    component: () => viewResolve("home"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "welcome",
    name: "welcome",
    component: () => viewResolve("welcome"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "changePassword",
    name: "changePassword",
    component: () => viewResolve("auth/password/change"),
    meta: {
      requiresAuth: true,
      showInNav: false
    }
  },
  {
    path: "login",
    name: "login",
    component: () => viewResolve("auth/login"),
    meta: {
      showInNav: false
    }
  },
  {
    path: ":pathMatch(.*)*", //other page , force redirect to home page
    redirect: { name: "home" },
    meta: {
      showInNav: false
    }
  }
];

export const navRoutes = routes
  .filter((p) => {
    return get<RouteRecordRaw, any, boolean>(p, "meta.showInNav", true) as Boolean;
  })
  .map<NavItem>((p) => {
    const routeName = p.name ? p.name.toString() : "";

    return {
      path: p.path,
      name: routeName,
      requiresAuth: p.meta?.requiresAuth || false
    };
  });

export default [
  {
    path: `/:lang(${localeKeys.join("|")})?`,
    component: routeTemplete,
    children: routes
  }
];
