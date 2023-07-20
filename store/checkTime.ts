import { create } from "zustand";

interface iCheckTimeState {
  checkInTime: string;
  checkOutTime: string;
  setCheckTime: (a: string, b: string) => void;
}

const useCheckTimeStore = create<iCheckTimeState>()((set) => ({
  checkInTime: "",
  checkOutTime: "",
  setCheckTime: (a, b) => set({ checkInTime: a, checkOutTime: b }),
}));

export default useCheckTimeStore;
