<script setup>
import { computed } from 'vue';
import WeatherBlock from './WeatherBlock/WeatherBlock.vue';

const props = defineProps({
  todayString: {
    type: String,
    default: null,
  },
  weather: {
    type: Array,
    default: null,
  },
  connectionError: {
    type: Boolean,
    default: false,
  },
});

const slicedWeather = computed(() => {
  if (!Array.isArray(props.weather)) {
    return null;
  }
  return props.weather.slice(0, -1);
});

const tomorrowInfo = computed(() => {
  if (!Array.isArray(props.weather)) {
    return null;
  }
  return props.weather[3];
});

const tomorrowWillBeColder = computed(() => {
  const temperatureNow = props.weather[1]?.temperature;
  const temperatureTomorrow = tomorrowInfo.value?.temperature;
  return temperatureNow > temperatureTomorrow;
});

const weatherForecastBlockComputedClass = computed(() => ({
  'weather-forecast-block_cold': tomorrowWillBeColder?.value,
  'weather-forecast-block_warm': !tomorrowWillBeColder?.value,
}));
</script>

<template>
  <div class="day-widget-day-and-weather">
    <div class="date-block">
      {{ todayString }}
    </div>
    <div class="weather-block-wrapper" v-if="!connectionError">
      <template v-if="weather">
        <WeatherBlock
          v-for="(weatherBlock, index) in slicedWeather"
          :key="index"
          :big="index === 1"
          :day-time="weatherBlock?.dayTimeCode"
          :temperature-value="weatherBlock?.temperature"
          :weather-code="weatherBlock?.weatherCode"
        />
      </template>
    </div>
    <div class="weather-block-error" v-else>
      <span>Connection Error</span>
    </div>
    <div
      class="weather-forecast-block"
      :class="weatherForecastBlockComputedClass"
    >
      <template v-if="tomorrowInfo">
        <span v-show="tomorrowWillBeColder">завтра будет прохладнее</span>
        <span v-show="!tomorrowWillBeColder">завтра будет теплее</span>
      </template>
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
.weather-block-wrapper,
.weather-block-error {
  height: 136px;
  background-color: #22343A99;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 8px 24px;
}
.weather-block-error  {
  justify-content: center;
  align-items: center;
  & > span {
    opacity: 0.5;
  }
}
.weather-forecast-block {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 19px;
  &_cold {
    color: #9AC8EA;
  }
  &_warm {
    color: #F6D972;
  }
}
</style>