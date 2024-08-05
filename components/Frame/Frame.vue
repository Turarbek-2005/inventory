<script setup lang="ts"></script>
<template>
  <div class="frame">
    <Icon name="material-symbols:close-rounded" size="20" class="exit" />
  </div>
</template>
<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";
.frame {
  width: 100%;
  height: 4rem;
  background: $bgColor;
  border: 1px solid $borderColor;
  border-radius: 12px;
  margin-top: 1.5rem;
  position: relative;
}

.exit {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  cursor: pointer;
}
</style>
