import { create } from "zustand";
import { persist } from "zustand/middleware";
import { encode } from "js-base64";

interface iPackageState {
  packs: string;
  setPackage: (a: string) => void;
}

const usePackageStore = create<iPackageState>()(
  persist(
    (set) => ({
      packs: encode("null"),
      setPackage: (a) => set({ packs: encode(a) }),
    }),
    {
      name: "_pk",
    }
  )
);

export default usePackageStore;
