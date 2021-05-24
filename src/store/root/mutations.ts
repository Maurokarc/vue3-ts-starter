import { MutationTree } from "vuex";
import { MutationTypes } from "./enums";
import { RootState } from "./state";

export type Mutations<S = RootState> = {
  [MutationTypes.DISPLAY_MASK](state: S, payload: boolean): void;
};

export const mutations: MutationTree<RootState> & Mutations = {
  [MutationTypes.DISPLAY_MASK](state, payload: boolean) {
    state.showOverlay = payload;
  }
};
