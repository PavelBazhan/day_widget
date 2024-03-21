<script setup>
const props = defineProps({
  todayString: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div class="day-widget-day-and-weather">
    <div class="date-block">
      {{ todayString }}
    </div>
    <!-- <div class="weather-block">

    </div>
    <div class="weather-forecast-block">

    </div> -->
  </div>
</template>

<style scoped lang="scss">
.day-widget-day-and-weather {
  width: 100%;
  border-radius: 12px;
  background: #3C4C5299;
  padding: 12px;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 16px;
}
.date-block {
  font-size: 48px;
  line-height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>