import { create } from "zustand";

interface iLangState {
  lang: string;
  setLang: (a: string) => void;
}

const useLangStore = create<iLangState>()((set) => ({
  lang: "TW",
  setLang: (a) => set({ lang: a }),
}));

export default useLangStore;
