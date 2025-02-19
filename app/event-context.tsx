import { create } from "zustand";


export const myStore = create(() => ({
  eventID: 1,
  setEvent: (id: number) => myStore.setState((state) => ({ eventID: id })),
}));