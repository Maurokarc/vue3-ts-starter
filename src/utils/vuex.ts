import {
  CommitOptions,
  DispatchOptions,
  MutationTree,
  ActionTree,
  GetterTree,
  ActionContext
} from "vuex";

export type GenerateGetter<S, R, TGetter extends GetterTree<S, R>> = {
  getters: {
    [K in keyof TGetter]: ReturnType<TGetter[K]>;
  };
} & TGetter;

export type GenerateCommit<S, TMutation extends MutationTree<S>> = {
  commit<K extends keyof TMutation, P extends Parameters<TMutation[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<TMutation[K]>;
} & TMutation;

export type AugmentedActionContext<
  S,
  R,
  TMutation extends MutationTree<S>,
  TGetter extends GetterTree<S, R>
> = {
  commit<K extends keyof TMutation>(
    key: K,
    payload?: Parameters<TMutation[K]>[1]
  ): ReturnType<TMutation[K]>;
} & {
  getters: {
    [K in keyof TGetter]: ReturnType<TGetter[K]>;
  };
} & Omit<ActionContext<S, R>, "getters" | "commit" | "dispatch">;

export type GenerateDispatch<
  S,
  R,
  TMutation extends MutationTree<S>,
  TAction extends ActionTree<S, R> & TMutation
> = {
  dispatch<K extends keyof TAction>(
    key: K,
    payload?: Parameters<TAction[K]>[1],
    options?: DispatchOptions
  ): ReturnType<TAction[K]>;
} & TAction;
