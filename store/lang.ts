import { create } from "zustand";

interface LangState {
  lang: string;
  setLang: (a: string) => void;
}

const useLangStore = create<LangState>()((set) => ({
  lang: "En",
  setLang: (a) => set({ lang: a }),
}));

export default useLangStore;
