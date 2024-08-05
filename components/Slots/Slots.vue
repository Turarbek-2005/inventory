<script setup lang="ts">
import { useSlotsQuery } from "./useSlotsQuery";

const { data, isLoading, refetch } = useSlotsQuery();
console.log(data.value);
</script>
<template>
  <div class="slots">
    <SlotsSlot v-if="!data" v-for="item of 25" />
    <SlotsSlot v-for="item of data" :data="item" />
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
}
</style>
