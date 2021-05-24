import { ActionTree } from "vuex";
import { RootState } from "./state";

export interface Actions {}

export const actions: ActionTree<RootState, RootState> & Actions = {};
