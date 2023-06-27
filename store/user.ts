"use client";
import { create } from "zustand";
// import create, { GetState, SetState } from "zustand";
import { persist } from "zustand/middleware";
import { encode, decode } from "js-base64";

const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    // return decode(JSON.parse(window.localStorage.getItem(key)!));
    return window.localStorage.getItem(key) !== null
      ? JSON.parse(decode(window.localStorage.getItem(key)!))
      : null;
    // return { logged: true, name: "John", email: "siloah.dev@gmail.com" };
  }
};
const setLocalStorage = (key: string, value: userData | null) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, encode(JSON.stringify(value)));
  }
};

type userData = {
  logged: boolean;
  name: string;
  token: string;
};

interface iUser {
  userData: userData | null;
  setUserData: (a: userData | null) => void;
  //userStorage?: string;
  //setLocalStorage?: (a: string) => void;
}

const useUserStore = create<iUser>((set) => ({
  userData: getLocalStorage("_ud"),
  setUserData: (dt: userData | null) => {
    setLocalStorage("_ud", dt);
  },
}));

// const useUserStore = create<iUser>()(
//   persist(
//     (set) => ({
//       userData: getLocalStorage("ud"),
//       setUserData: (a: userData | null) =>
//         set({ userStorage: encode(JSON.stringify(a)) }),
//     }),
//     {
//       name: "ud",
//     }
//   )
// );

export default useUserStore;
