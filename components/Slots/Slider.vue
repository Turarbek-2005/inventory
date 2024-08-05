<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_OBJECTS, DB_ID } from "~/app.constants";
import { useSlotSlideStore } from "~/store/slot-slide.store";

const store = useSlotSlideStore();
const isLocalOpen = computed({
  get: () => store.isOpen,
  set: (value) => {
    store.isOpen = value;
  },
});

const { mutate } = useMutation({
  mutationKey: ["move card"],
  mutationFn: (docId: string) =>
    DB.deleteDocument(DB_ID, COLLECTION_OBJECTS, docId),
  onSuccess: () => {},
});

function deleteItem(id: string | undefined) {
  if (id) {
    mutate(id);
  }
}
</script>
<template>
  <div :class="{ slider: true, open: store.isOpen, none: !store.card }">
    <Icon
      name="material-symbols:close-rounded"
      size="30"
      class="exit"
      @click="store.toggle()"
    />
    <div class="img">
      <NuxtImg :src="store.card?.image" class="image" />
    </div>
    <div class="text">
      <h3 class="title">{{ store.card?.name }}</h3>
      <p class="subtitle">{{ store.card?.description }}</p>
    </div>
    <button class="delete" @click="deleteItem(store.card?.id)">
      Удалить предмет
    </button>
  </div>
</template>
<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";

.slider {
  position: absolute;
  height: 100%;
  width: 45%;
  background: $bgColor;
  border: 1px solid $borderColor;
  transition: right 0.3s ease-in-out;
  right: -45%;
  padding: 15px;
}

.open {
  right: 0;
}

.none {
  display: none;
}

.exit {
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
}

.img {
  width: 100%;
  margin-top: 2rem;
}

.image {
  width: 70%;
  display: flex;
  margin: 0 auto;
}

.text {
  border-top: 1px solid $borderColor;
  border-bottom: 1px solid $borderColor;
  padding: 0.5rem 0;
  margin-top: 1rem;
  color: rgba($color: #fff, $alpha: 0.6);
  height: 16rem;
}

.delete {
  width: 100%;
  height: 3rem;
  margin-top: 2rem;
  border: 0;
  cursor: pointer;
  background-color: $primaryRed;
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
}
</style>
