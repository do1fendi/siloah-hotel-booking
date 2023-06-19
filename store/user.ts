"use client";
import { create } from "zustand";

const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem(key)!);
    // return { logged: true, name: "John", email: "siloah.dev@gmail.com" };
  }
};
const setLocalStorage = (key: string, value: userData | null) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

type userData = {
  logged: boolean;
  name: string;
  token: string;
};

interface iUser {
  userData: userData;
  refresh: boolean;
  setRefresh: (a: boolean) => void;
  setUserData: (a: userData | null) => void;
}

const useUserStore = create<iUser>((set) => ({
  userData: getLocalStorage("userData"),
  refresh: false,
  setUserData: (dt: userData | null) =>
    // set() => {
    setLocalStorage("userData", dt),
  // return { dt };
  // }),
  setRefresh: (a: boolean) => set({ refresh: a }),
}));

export default useUserStore;
