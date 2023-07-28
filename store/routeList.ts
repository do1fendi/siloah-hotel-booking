import { create } from "zustand";

interface iRouteListState {
  routeList: string[];
  acceptedList: string[];
  setRouteList: (a: string[]) => void;
}

const useRouteListStore = create<iRouteListState>()((set) => ({
  routeList: [],
  // set list for check previous page includes acceptedList, otherwise go to home
  acceptedList: ["search", "book", "cart", "package"],
  setRouteList: (a: string[]) => {
    set({ routeList: a });
  },
}));

export default useRouteListStore;
