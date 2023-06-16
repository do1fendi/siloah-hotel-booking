"use client";
import { create } from "zustand";

const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem(key)!);
    // return { logged: true, name: "John", email: "siloah.dev@gmail.com" };
  }
};
const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

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

export default useUserStore;
