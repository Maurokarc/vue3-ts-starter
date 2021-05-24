import { MutationTree } from "vuex";
import { MutationTypes, Tokens } from "./enums";
import { State } from "./state";
import { Identity, IdentityToken } from "@/models";

export type Mutations<S = State> = {
  [MutationTypes.SET_USER_INFO](state: S, payload?: Identity): void;
  [MutationTypes.SET_TOKEN](state: S, payload: IdentityToken): void;
  [MutationTypes.SET_LOGOUT](state: S, exceptRefreshToken?: boolean): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_USER_INFO](state, payload?: Identity) {
    state.authenticated = true;

    state.userInfo = payload;
  },
  [MutationTypes.SET_TOKEN](state, payload: IdentityToken) {
    state.authenticated = true;

    localStorage.setItem(Tokens.STORE_KEY_TOKEN, payload.token);
    if (payload.refreshToken)
      localStorage.setItem(Tokens.STORE_KEY_REFRESH_TOKEN, payload.refreshToken);
  },
  [MutationTypes.SET_LOGOUT](state, exceptRefreshToken?: boolean) {
    localStorage.removeItem(Tokens.STORE_KEY_TOKEN);

    if (!exceptRefreshToken) localStorage.removeItem(Tokens.STORE_KEY_REFRESH_TOKEN);

    state.authenticated = false;
    state.userInfo = undefined;
  }
};
