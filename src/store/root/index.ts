import { DispatchOptions, StoreOptions } from "vuex";
import { rootState, RootState } from "./state";
import { mutations, Mutations } from "./mutations";
import { actions, Actions } from "./actions";
import { getters, Getters } from "./getters";
import { GenerateCommit, GenerateGetter } from "@/utils/vuex";

type OmitRoot = GenerateCommit<RootState, Mutations> &
  GenerateGetter<RootState, RootState, Getters> & {
    dispatch<K extends keyof Actions>(
      key: K,
      payload?: Parameters<Actions[K]>[1],
      options?: DispatchOptions
    ): ReturnType<Actions[K]>;
  };

export { OmitRoot };

const options: StoreOptions<RootState> = {
  state: rootState,
  getters,
  mutations,
  actions
};

export default options;
