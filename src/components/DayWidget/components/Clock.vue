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
});

const currentTime = computed(() => {

});
</script>

<template>
  <div class="day-widget-clock">
    <div class="day-widget-clock__block day-widget-clock__block_hours">{{ hours }}</div>:
    <div class="day-widget-clock__block day-widget-clock__block_minutes">{{ minutes }}</div>
  </div>
</template>

<style scoped lang="scss">
.day-widget-clock {
  display: flex;
  font-size: 36px;
  color: white;
}
</style>