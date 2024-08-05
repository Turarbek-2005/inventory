<script setup lang="ts"></script>
<template>
  <div class="container">
    <div class="grid">
      <AddSlot />
      <Slots />
    </div>
    <Frame />
  </div>
</template>
<style lang="scss" scoped>
.container {
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}
</style>
