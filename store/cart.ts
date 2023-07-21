"use client";
import { create } from "zustand";
import { encode, decode } from "js-base64";

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

type cartData = {
  data: {
    hotelName: string;
    roomType: string;
    ratePlanName: string;
    rateKey: string;
    price: number;
  }[];
};

interface iCart {
  cartData: cartData | null;
  setCartData: (a: cartData | null) => void;
}

const useCartStore = create<iCart>((set) => ({
  cartData: getLocalStorage("_cd"),
  setCartData: (dt: cartData | null) => {
    setLocalStorage("_cd", dt);
  },
}));

export default useCartStore;
