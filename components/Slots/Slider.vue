<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_OBJECTS, DB_ID } from "~/app.constants";
import { useSlotSlideStore } from "~/store/slot-slide.store";
import { useSlideChangeStore } from "~/store/slide-change.store";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const store = useSlotSlideStore();
const storeChange = useSlideChangeStore();

const { mutate } = useMutation({
  mutationKey: ["move card"],
  mutationFn: (docId: string) =>
    DB.deleteDocument(DB_ID, COLLECTION_OBJECTS, docId),
  onSuccess: () => {
    toast("Товар успешно удалён! ");
  },
});

function deleteItem(id: string | undefined) {
  if (id) {
    mutate(id);
  }
}
</script>
<template>
  <div
    :class="{ slider__wrapper: true, open: store.isOpen, none: !store.card }"
  >
    <div class="slider">
      <Icon
        name="material-symbols:close-rounded"
        size="30"
        class="exit"
        @click="store.toggle()"
      />
      <div class="img">
        <NuxtImg
          v-if="store.card?.image"
          :src="store.card?.image"
          class="image"
        />
      </div>
      <div class="text">
        <h3 class="title">{{ store.card?.name }}</h3>
        <p class="subtitle">{{ store.card?.description }}</p>
        <p>Количество: {{ store.card?.quantity }}</p>
        <button class="change" @click="storeChange.set(store?.card)">
          Изменить количество
        </button>
      </div>
      <button class="delete" @click="deleteItem(store.card?.id)">
        Удалить предмет
      </button>
      <SlotsSliderChange />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";

.slider__wrapper {
  position: absolute;
  height: 100%;
  width: 45%;
  background: $bgColor;
  border: 1px solid $borderColor;
  transition: 0.3s;
  right: -45%;
}

.slider {
  position: relative;
  padding: 15px;
  height: 100%;
  width: 100%;
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
  margin-top: 1rem;
  color: rgba($color: #fff, $alpha: 0.6);
  height: 18rem;
  .subtitle {
    height: 8.5rem;
  }
  .change {
    width: 60%;
    height: 2rem;
    border-radius: 8px;
    border: 0;
    cursor: pointer;
  }
}

.delete {
  width: 100%;
  height: 3rem;
  margin-top: 0.5rem;
  border: 0;
  cursor: pointer;
  background-color: $primaryRed;
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
}
</style>
