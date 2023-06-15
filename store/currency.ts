import { create } from "zustand";

interface iCurrencyState {
  currency: string;
  setCurrency: (a: string) => void;
}

const useCurrencyStore = create<iCurrencyState>()((set) => ({
  currency: "TWD",
  setCurrency: (a) => set({ currency: a }),
}));

export default useCurrencyStore;
