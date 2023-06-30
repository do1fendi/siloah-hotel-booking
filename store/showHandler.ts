import { create } from "zustand";

interface iShowHandler {
  showLang: boolean;
  showCurrency: boolean;
  showNav: boolean;
  setShowLang: (a: boolean) => void;
  setShowCurrency: (a: boolean) => void;
  setShowNav: (a: boolean) => void;
  setCloseAllShow: () => void;
}

const useShowHandlerStore = create<iShowHandler>()((set) => ({
  showLang: false,
  showCurrency: false,
  showNav: false,
  setShowLang: (a: boolean) => {
    set({ showLang: a });
  },
  setShowCurrency: (a: boolean) => {
    set({ showCurrency: a });
  },
  setShowNav: (a: boolean) => {
    set({ showNav: a });
  },
  setCloseAllShow: () => {
    set({ showNav: false, showCurrency: false, showLang: false });
  },
}));

export default useShowHandlerStore;
