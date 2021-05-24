import { InjectionKey } from "vue";
import { createStore, Store as VuexStore } from "vuex";
import { authModule, OmitAuth } from "./modules/auth";
import { RootState } from "./root/state";
import root, { OmitRoot } from "./root";

//ref : https://dev.to/3vilarthas/vuex-typescript-m4j

type OmitOrigin<T> = Omit<VuexStore<T>, "getters" | "commit" | "dispatch">;

export type Store<T> = OmitOrigin<T> & OmitRoot & OmitAuth;

export const store = createStore({
  ...root,
  modules: {
    auth: authModule
  }
});

export const key: InjectionKey<Store<RootState>> = Symbol("vue-store");

export function useStore() {
  return store as Store<RootState>;
}
