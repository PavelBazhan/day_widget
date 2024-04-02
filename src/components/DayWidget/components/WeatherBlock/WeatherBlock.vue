<script setup>
import { computed } from 'vue';
import LOCAL_CONSTANTS from './constants.js';

const props = defineProps({
  big: {
    type: Boolean,
    default: false,
  },
  dayTime: {
    type: String,
    default: null,
  },
  temperatureValue: {
    type: Number,
    default: null,
  },
  temperatureUnit: {
    type: String,
    default: LOCAL_CONSTANTS.TEMPERATURE_UNIT.CELSIUS,
  },
  weatherCode: {
    type: Number,
    default: null,
  },
});

const dayTimeLocaleString = computed(() => {
  if (!props.dayTime) {
    return null;
  }
  const foundDayTimeObject = LOCAL_CONSTANTS.DAY_TIME.find((dt) => dt._code === props.dayTime);
  if (!foundDayTimeObject) {
    return null;
  }
  return foundDayTimeObject.localeValues[1]; // <- need to fix that stuff
});

const weatherTypeImgUrl = computed(() => {
  if (typeof props.weatherCode !== 'number') {
    return null;
  }

  const weatherTypeObject = LOCAL_CONSTANTS.WEATHER_TYPE.find((wt) => {
    return wt.appropriateWeatherTypeCodeList.some((wtc) => wtc === props.weatherCode);
  });

  return weatherTypeObject?.url || null;
});

const temperatureValueIsValid = computed(() => typeof props.temperatureValue === 'number');
</script>

<template>
  <div
    class="weather-block"
    :class="{
      'weather-block_big': big,
    }"
  >
    <div class="weather-block__top">
      <div class="weather-block__label">{{ dayTimeLocaleString }}</div>
      <div class="weather-block__temperature" v-show="temperatureValueIsValid">{{ temperatureValue }}°C</div>
    </div>
    <div class="weather-block__bottom">
      <div class="weather-block__icon-wrapper">
        <img :src="weatherTypeImgUrl" v-show="weatherCode" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather-block {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  &__top {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
  }
  &__label {
    min-height: 18px;
    font-size: 14px;
    line-height: 18px;
    font-weight: 100;
  }
  &__temperature {
    font-size: 24px;
    line-height: 30px;
    font-weight: 100;
  }
  &__icon-wrapper {
    width: 48px;
    height: 48px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  &_big {
    .weather-block__top {
      gap: 0;
    }
    .weather-block__temperature {
      font-size: 32px;
      line-height: 38px;
      font-weight: 590;
    }
    .weather-block__icon-wrapper {
      width: 64px;
      height: 64px;
    }
  }
}
</style>