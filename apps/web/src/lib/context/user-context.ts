import type { IUserInfo } from "types";
import { create } from "zustand";

type UserContext = {
  user?: IUserInfo | undefined;
  setUser: (user: IUserInfo) => void;
  logout: () => void;
};

// TODO: persitance etc..
export const useUserContext = create<UserContext>((set) => ({
  user: undefined,
  setUser: (user: IUserInfo) => set({ user }),
  logout: () => set({ user: undefined }),
}));
