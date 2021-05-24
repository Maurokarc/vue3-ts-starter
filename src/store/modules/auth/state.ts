import { Identity } from "@/models";

export interface State {
  authenticated: boolean;
  userInfo?: Identity;
}

export const state: State = {
  authenticated: false,
  userInfo: undefined
};
