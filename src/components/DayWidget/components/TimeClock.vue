<script setup>
import { computed } from 'vue';

const props = defineProps({
  hours: {
    type: Number,
    default: null,
  },
  minutes: {
    type: Number,
    default: null,
  },
  seconds: {
    type: Number,
    default: null,
  },
  showSeconds: {
    type: Boolean,
    default: false,
  },
});

const getTwoSymbolsValue = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value).padStart(2, '0');
}
</script>

<template>
  <div class="day-widget-clock">
    <div class="day-widget-clock__block day-widget-clock__block_hours">{{ getTwoSymbolsValue(hours) }}</div>
    <div class="day-widget-clock__divider">
      <div class="day-widget-clock__divider__circle"></div>
      <div class="day-widget-clock__divider__circle"></div>
    </div>
    <div class="day-widget-clock__block day-widget-clock__block_minutes">{{ getTwoSymbolsValue(minutes) }}</div>
    <div class="day-widget-clock__divider" v-show="showSeconds" />
    <div class="day-widget-clock__block day-widget-clock__block_seconds" v-show="showSeconds">{{ getTwoSymbolsValue(seconds) }}</div>
  </div>
</template>

<style scoped lang="scss">
.day-widget-clock {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 36px;
  &__block {
    flex: 1 1 0;
    height: 120px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3C4C5299;
    font-weight: 700;
    font-size: 80px;
  }
  &__divider {
    display: flex;
    flex-flow: column nowrap;
    gap: 16px;
    &__circle {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #ECFEFF;
    }
  }
}
</style>