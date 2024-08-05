import { defineStore } from "pinia";
import type { ICard } from "~/components/Slots/slots.types";

const defaultValue: { card: ICard | null; isOpenChange: boolean } = {
  card: null,
  isOpenChange: false,
};

export const useSlideChangeStore = defineStore("change-slide", {
  state: () => defaultValue,
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    set(card: ICard | null) {
      this.$patch({ card, isOpenChange: true });
    },
    toggle() {
      this.isOpenChange = !this.isOpenChange;
    },
  },
});
