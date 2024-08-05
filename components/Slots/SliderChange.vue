<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_OBJECTS, DB_ID } from "~/app.constants";
import { useSlideChangeStore } from "~/store/slide-change.store";
import { useSlotsQuery } from "./useSlotsQuery";

const storeChange = useSlideChangeStore();

const { refetch } = useSlotsQuery();

const quantity = ref("");

const { mutate } = useMutation({
  mutationKey: [""],
  mutationFn: async (quantity: string) => {
    const formattedData = {
      name: storeChange.card?.name,
      description: storeChange.card?.description,
      image: storeChange.card?.image,
      slot: storeChange.card?.slot,
      quantity: quantity,
    };
    const id = <string>storeChange.card?.id;
    await DB.updateDocument(DB_ID, COLLECTION_OBJECTS, id, formattedData);
  },
  onSuccess() {
    console.log("Количество предметов успешно изменён!");
    refetch();
    storeChange.toggle();
  },
});
</script>
<template>
  <div :class="{ sliderChange__wrapper: true, open: storeChange.isOpenChange }">
    <input
      class="quantity"
      placeholder="Введите количество"
      v-model="quantity"
    />
    <div class="buttons">
      <button class="exit" @click="storeChange.toggle()">Отмена</button>
      <button class="done" @click="mutate(quantity)">Подтвердить</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";

.sliderChange__wrapper {
  position: absolute;
  height: 25%;
  width: 100%;
  background: $bgColor;
  border-top: 1px solid $borderColor;
  bottom: -25%;
  transition: bottom 0.3s ease-in-out;
  padding: 1rem;
}

.sliderChange {
  position: relative;
  height: 100%;
  width: 100%;
}

.open {
  bottom: 0;
}

.quantity {
  width: 100%;
  height: 2.5rem;
  background: none;
  border: 1px solid $borderColor;
  border-radius: 4px;
  outline: none;
  color: rgba($color: #fff, $alpha: 0.6);
  padding-left: 1rem;
  font-size: 14px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  .exit {
    font-size: 16px;
    width: 40%;
    height: 2.5rem;
    border-radius: 4px;
    border: none;
    box-shadow: 0px 0px 8px 1px $primaryRed;
    cursor: pointer;
  }

  .done {
    font-size: 16px;
    cursor: pointer;
    width: 50%;
    height: 2.5rem;
    border-radius: 4px;
    border: none;
    color: #fff;
    background-color: $primaryRed;
    box-shadow: 0px 0px 8px 1px $primaryRed;
  }
}
</style>
