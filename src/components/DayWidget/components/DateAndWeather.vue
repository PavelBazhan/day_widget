<script setup>
import { computed, inject } from 'vue';
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
  connectionPending: {
    type: Boolean,
    default: false,
  },
});

const getLocaleValue = inject('getLocaleValue');

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

const LABEL_COLLECTION = {
  PREDICTION: [
    {
      _code: 'CODLER',
      localeValues: [ 'tomorrow it will be colder', 'завтра будет прохладнее' ],
    },
    {
      _code: 'WARMER',
      localeValues: [ 'tomorrow it will be warmer', 'завтра будет теплее' ],
    },
  ],
  LOADING: {
    localeValues: [ 'Loading...', 'Загрузка...' ],
  },
  ERROR: {
    localeValues: [ 'An error has occurred', 'Произошла ошибка' ],
  },
};
</script>

<template>
  <div class="day-widget-day-and-weather">
    <div class="date-block">
      {{ todayString }}
    </div>

    <div class="weather-block-wrapper">
      <Transition name="fsi">
        <div class="weather-block-pending" v-if="connectionPending">
          <span>{{ getLocaleValue(LABEL_COLLECTION.LOADING) }}</span>
        </div>
      </Transition>
      <Transition name="fs">
        <div class="weather-block-error" v-if="!connectionPending && connectionError">
          <span>{{ getLocaleValue(LABEL_COLLECTION.ERROR) }}</span>
        </div>
      </Transition>
      <Transition name="fs">
        <div class="weather-block-container" v-if="!connectionPending && !connectionError && weather">
          <WeatherBlock
            v-for="(weatherBlock, index) in slicedWeather"
            :key="index"
            :big="index === 1"
            :day-time="weatherBlock?.dayTimeCode"
            :temperature-value="weatherBlock?.temperature"
            :weather-code="weatherBlock?.weatherCode"
          />
        </div>
      </Transition>
    </div>
    
    <div
      class="weather-forecast-block"
      :class="weatherForecastBlockComputedClass"
    >
      <Transition name="fs">
        <div v-if="tomorrowInfo && !connectionPending">
          <span v-show="tomorrowWillBeColder">{{ getLocaleValue(LABEL_COLLECTION.PREDICTION[0]) }}</span>
          <span v-show="!tomorrowWillBeColder">{{ getLocaleValue(LABEL_COLLECTION.PREDICTION[1]) }}</span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.day-widget-day-and-weather {
  width: 100%;
  border-radius: 12px;
  background-color: var(--color_slotBg);
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
  background-color: var(--color_weatherBg);
  position: relative;
}
.weather-block-error,
.weather-block-pending {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    opacity: 0.3;
  }
}
.weather-block-container {
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
    color: var(--color_cold);
  }
  &_warm {
    color: var(--color_warm);
  }
}

$animationTime: 0.2s;
$animationScale: 85%;

.fsi-enter-active,
.fsi-leave-active,
.fs-enter-active,
.fs-leave-active {
  transition: opacity $animationTime ease, transform $animationTime ease;
}

.fs-enter-from,
.fsi-leave-to,
.fs-leave-to {
  opacity: 0;
  transform: scale($animationScale);
}
</style>