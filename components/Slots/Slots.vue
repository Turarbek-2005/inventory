<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { useSlotsQuery } from "./useSlotsQuery";
import { COLLECTION_OBJECTS, DB_ID } from "~/app.constants";
import type { ICard, IColumn } from "./slots.types";

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useSlotsQuery();
watch(data, (newValue) => {
  console.log("Данные обновились:", newValue);
});
type TypeMutationVaraiables = {
  docId: string;
  slot?: string;
};

const { mutate } = useMutation({
  mutationKey: ["move card"],
  mutationFn: async ({ docId, slot }: TypeMutationVaraiables) =>
    await DB.updateDocument(DB_ID, COLLECTION_OBJECTS, docId, {
      slot,
    }),
  onSuccess: async () => {
    await refetch();
    console.log("Данные обновлены после refetch:", data.value);
  },
  onError: (error) => {
    console.log(error);
  },
});

function handleDragStart(card: ICard | null, column: IColumn) {
  dragCardRef.value = card;
  sourceColumnRef.value = column;
}
function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(targetColumn: IColumn) {
  if (dragCardRef.value && sourceColumnRef.value) {
    const slotValue = targetColumn.id.toString();
    mutate({ docId: dragCardRef.value.id, slot: slotValue });
  }
}
</script>
<template>
  <div class="slots">
    <div v-if="isLoading" class="loading">Loading...</div>
    <SlotsSlot
      v-for="(slot, index) of data"
      :data="slot"
      :key="index"
      @dragover="handleDragOver"
      @drop="() => handleDrop(slot)"
      draggable="true"
      @dragstart="() => handleDragStart(slot.item, slot)"
    />
    <SlotsSlider />
  </div>
</template>
<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";

.slots {
  height: 38rem;
  background-color: $bgColor;
  border-radius: 12px;
  border: 1px solid $borderColor;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  overflow: hidden;
  position: relative;
}

.loading {
  margin: 1rem;
}
</style>
