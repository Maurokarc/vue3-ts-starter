import { GetterTree } from "vuex";
import { State } from "./state";
import { RootState } from "@/store/root/state";
import { GetterTypes, Tokens } from "./enums";
import { Identity } from "@/models";

export type Getters = {
  [GetterTypes.GET_USER_INFO](state: State): Identity | undefined;
  [GetterTypes.GET_AUTHENTICATED](state: State): boolean;
  [GetterTypes.GET_TOKEN](state: State): string;
  [GetterTypes.GET_REFRESH_TOKEN](state: State): string;
};

export const getters: GetterTree<State, RootState> & Getters = {
  [GetterTypes.GET_USER_INFO]: (state) => state.userInfo,
  [GetterTypes.GET_AUTHENTICATED]: (state) => state.authenticated,
  [GetterTypes.GET_TOKEN]: (state) => localStorage.getItem(Tokens.STORE_KEY_TOKEN) || "",
  [GetterTypes.GET_REFRESH_TOKEN]: (state) =>
    localStorage.getItem(Tokens.STORE_KEY_REFRESH_TOKEN) || ""
};
