"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface iCurrencyState {
  currency: string;
  setCurrency: (a: string) => void;
}

const useCurrencyStore = create<iCurrencyState>()(
  persist(
    (set) => ({
      currency: "TWD",
      setCurrency: (a) => set({ currency: a }),
    }),
    {
      name: "_cr",
    }
  )
);

export default useCurrencyStore;
