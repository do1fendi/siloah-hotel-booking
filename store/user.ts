import { create } from "zustand";

interface iUser {
  userData: {
    logged: boolean;
    name: string;
    email: string;
  };
  setUserData: (a: any) => void;
}

const useUserStore = create<iUser>((set) => ({
  userData: getLocalStorage("userData"),
  setUserData: (userData) =>
    set((state) => {
      setLocalStorage("userData", userData);
      return { userData };
    }),
}));

const getLocalStorage = (key: string) =>
  JSON.parse(window.localStorage.getItem(key)!);
const setLocalStorage = (key: string, value: any) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export default useUserStore;
