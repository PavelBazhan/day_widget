<script setup>

</script>

<template>
  <div class="day-widget-dictionary">
    <div class="day-widget-dictionary__icon-wrapper">

    </div>
    <div class="day-widget-dictionary__original-text-wrapper">
      <span>give somebody an edge</span>
    </div>
    <div class="day-widget-dictionary__translated-text-wrapper">
      <span>давать преимущество</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.day-widget-dictionary {
  width: 100%;
  min-height: 112px;
  border-radius: 12px;
  background: #3C4C5299;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 8px;
  &__icon-wrapper {
    width: 32px;
    height: 32px;
  }
  &__original-text-wrapper {
    font-size: 24px;
    line-height: 30px;
    color: #D09AEA;
  }
  &__translated-text-wrapper {
    font-size: 14px;
    line-height: 18px;
  }
}
</style>