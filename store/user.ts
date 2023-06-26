"use client";
import { create } from "zustand";
// import create, { GetState, SetState } from "zustand";
import { persist, devtools } from "zustand/middleware";
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
  // refresh: boolean;
  // setRefresh: (a: boolean) => void;
  setUserData: (a: userData | null) => void;
}

const useUserStore = create<iUser>((set) => ({
  userData: getLocalStorage("ud"),
  refresh: false,
  setUserData: (dt: userData | null) => {
    setLocalStorage("ud", dt);
  },
}));

// export const useUserStore = create<iUser>(
//   persist(
//     (set) => ({
//       userData: null,
//       setUserData: (a: userData) => set({ userData: a }),
//     }),
//     {
//       name: "userData", // name of the item in the storage (must be unique)
//       // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//     }
//   )
// );

export default useUserStore;
