<script setup lang="ts">
import { useSlotSlideStore } from "~/store/slot-slide.store";

const store = useSlotSlideStore();

const props = defineProps({
  data: Object,
});

const item = props.data?.item;
</script>
<template>
  <div class="slot" @click="store.set(item)">
    <NuxtImg :src="item?.image" width="85" />
    <label v-if="item" class="quantity">{{ item?.quantity }}</label>
  </div>
</template>
<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";

.slot {
  border: 1px solid $borderColor;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.quantity {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  font-size: 10px;
  font-weight: 500;
  color: rgba($color: #fff, $alpha: 0.6);
  border: 1px solid $borderColor;
  border-top-left-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
