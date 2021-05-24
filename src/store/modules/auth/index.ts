import { DispatchOptions, Module } from "vuex";
import { RootState } from "@/store/root/state";
import { state, State } from "./state";
import { mutations, Mutations } from "./mutations";
import { actions, Actions } from "./actions";
import { getters, Getters } from "./getters";
import { GenerateCommit, GenerateGetter } from "@/utils/vuex";

// Create a new store Modules.
const authModule: Module<State, RootState> = {
  state,
  getters,
  mutations,
  actions
};

type OmitAuth = GenerateCommit<State, Mutations> &
  GenerateGetter<State, RootState, Getters> & {
    dispatch<K extends keyof Actions>(
      key: K,
      payload?: Parameters<Actions[K]>[1],
      options?: DispatchOptions
    ): ReturnType<Actions[K]>;
  };

export { authModule, OmitAuth };
