import { ActionTree, DispatchOptions } from "vuex";
import { State } from "./state";
import { Mutations } from "./mutations";
import { ActionTypes, MutationTypes, Tokens, GetterTypes } from "./enums";
import { Getters } from "./getters";
import { RootState } from "@/store/root/state";
import { AugmentedActionContext } from "@/utils/vuex";
import { Identity, resultDTO } from "@/models";

import axios from "@/utils/axios";

type Context = AugmentedActionContext<State, RootState, Mutations, Getters> & {
  dispatch(
    key: ActionTypes.AJAX_USER_INFO,
    payload?: never,
    options?: DispatchOptions
  ): ReturnType<any>;
  dispatch(
    key: ActionTypes.AJAX_REFRESH_TOKEN,
    payload?: never,
    options?: DispatchOptions
  ): ReturnType<any>;
};

export interface Actions {
  [ActionTypes.AJAX_CHECK_AUTHENTICATED]({ getters, dispatch }: Context): Promise<boolean>;
  [ActionTypes.AJAX_LOGIN]({ commit }: Context, payload: FormData): Promise<void>;
  [ActionTypes.AJAX_LOGOUT]({ commit }: Context): Promise<void>;
  [ActionTypes.AJAX_REFRESH_TOKEN]({ commit, getters }: Context): Promise<void>;
  [ActionTypes.AJAX_USER_INFO]({ commit }: Context): Promise<void>;
  [ActionTypes.AJAX_CHNAGE_PASSWORD]({}: Context, payload: FormData): Promise<boolean>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.AJAX_CHECK_AUTHENTICATED]({ getters, dispatch }) {
    const hasAuthKey = getters[GetterTypes.GET_TOKEN] || getters[GetterTypes.GET_REFRESH_TOKEN];

    if (!hasAuthKey) return false;

    if (getters[GetterTypes.GET_TOKEN]) await dispatch(ActionTypes.AJAX_USER_INFO);

    // Even if get 401 on AJAX_USER_INFO , will recall AJAX_REFRESH_TOKEN to check auth
    // if refresh success , then will be redirect out from login page
    if (!getters[GetterTypes.GET_AUTHENTICATED] && getters[GetterTypes.GET_REFRESH_TOKEN]) {
      await dispatch(ActionTypes.AJAX_REFRESH_TOKEN);

      if (!getters[GetterTypes.GET_AUTHENTICATED]) {
        await dispatch(ActionTypes.AJAX_USER_INFO);
      }
    }

    return getters[GetterTypes.GET_AUTHENTICATED];
  },
  async [ActionTypes.AJAX_LOGIN]({ commit }, payload: FormData) {
    try {
      const { headers } = await axios.post("auth/login", payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      commit(MutationTypes.SET_TOKEN, {
        token: headers.authorization || "",
        refreshToken: headers[Tokens.STORE_KEY_REFRESH_TOKEN] || ""
      });
    } catch (error) {
      commit(MutationTypes.SET_LOGOUT);
    }
  },
  async [ActionTypes.AJAX_LOGOUT]({ commit }) {
    try {
      await axios.post("auth/revoke-token", undefined, {
        headers: {
          refreshToken: localStorage.getItem(Tokens.STORE_KEY_REFRESH_TOKEN)
        }
      });
    } catch (error) {
      //do nothing
    }
    commit(MutationTypes.SET_LOGOUT);
  },
  async [ActionTypes.AJAX_REFRESH_TOKEN]({ commit, getters }) {
    try {
      const { headers } = await axios.post("auth/refresh-token", undefined, {
        headers: {
          refreshToken: getters[GetterTypes.GET_REFRESH_TOKEN]
        }
      });

      commit(MutationTypes.SET_TOKEN, {
        token: headers.authorization || "",
        refreshToken: headers[Tokens.STORE_KEY_REFRESH_TOKEN] || ""
      });
    } catch (error) {
      commit(MutationTypes.SET_LOGOUT);
    }
  },
  async [ActionTypes.AJAX_USER_INFO]({ commit }) {
    try {
      const { data, headers } = await axios.get<Identity>("auth");

      commit(MutationTypes.SET_TOKEN, { token: headers.authorization || "" });
      commit(MutationTypes.SET_USER_INFO, data);
    } catch (error) {
      commit(MutationTypes.SET_LOGOUT, true);
    }
  },
  async [ActionTypes.AJAX_CHNAGE_PASSWORD]({}, payload: FormData) {
    try {
      await axios.post("auth/change-password", payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
};
