"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { encode, decode } from "js-base64";
import { get } from "http";

/*
cart template as below
[
  {
    hotelName:"",
    roomType:"",
    ratePlanName:"",
    rateKey:"",
    price:""
  }
]
*/
/*
const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key) !== null
      ? JSON.parse(decode(window.localStorage.getItem(key)!))
      : null;
  }
};
const setLocalStorage = (key: string, value: cartData | null) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, encode(JSON.stringify(value)));
  }
};

const asyncLocalStorage = {
  setItem(key: string, value: cartData | null) {
    return Promise.resolve().then(function () {
      window.localStorage.setItem(key, JSON.stringify(value));
    });
  },
  getItem(key: string) {
    return Promise.resolve().then(function () {
      return JSON.parse(window.localStorage.getItem(key)!);
    });
  },
};

type cartData = {
  hotelName: string;
  roomType: string;
  ratePlanName: string;
  rateKey: string;
  price: number;
}[];

interface iCart {
  trackUpdate: boolean;
  cartData: cartData | null;
  setTrackUpdate: (a: boolean) => void;
  setCartData: (a: cartData | null) => void;
}

const useCartStore = create<any>((set: any) => ({
  trackUpdate: false,
  cartData: asyncLocalStorage.getItem("_cd").then((e) => e),
  setCartData: (dt: cartData | null) => {
    // setLocalStorage("_cd", dt);
    asyncLocalStorage.setItem("_cd", dt).then((e) => e);
  },
  setTrackUpdate(a:any) {
    set({ trackUpdate: a });
  },
}));

*/
interface BearState {
  cartData: string;
  setCartData: (a: string) => void;
}

const useCartStore = create<BearState>()(
  persist(
    (set) => ({
      cartData: "",
      setCartData: (a) => set({ cartData: encode(a) }),
    }),
    {
      name: "_cd",
    }
  )
);

export default useCartStore;
