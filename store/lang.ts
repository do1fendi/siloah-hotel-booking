"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface iLangState {
  lang: string;
  setLang: (a: string) => void;
}

const useLangStore = create<iLangState>()(
  persist(
    (set) => ({
      lang: "TW",
      setLang: (a) => set({ lang: a }),
    }),
    {
      name: "_ln",
    }
  )
);
export default useLangStore;
