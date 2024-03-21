<script setup>
import WeatherBlock from './WeatherBlock.vue';

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
    <div class="weather-block-wrapper">
      <WeatherBlock
        v-for="n in 3"
        :key="n"
        :big="n === 2"
      />
    </div>
    <div class="weather-forecast-block weather-forecast-block_cold">
      <span>завтра будет прохладнее</span>
      <span v-show="false">завтра будет теплее</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.day-widget-day-and-weather {
  width: 100%;
  border-radius: 12px;
  background: #3C4C5299;
  padding: 16px 0;
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
  font-weight: 500;
  min-height: 58px;
}
.weather-block-wrapper {
  height: 136px;
  background-color: #22343A99;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 8px 24px;
}
.weather-forecast-block {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 19px;
  &_cold {
    color: #9AC8EA;
  }
}
</style>