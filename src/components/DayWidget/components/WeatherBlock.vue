<script setup>
import weatherRainyUrl from '../../../assets/weather_rainy.svg';

defineProps({
  big: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="weather-block"
    :class="{
      'weather-block_big': big,
    }"
  >
    <div class="weather-block__top">
      <div class="weather-block__label">утро</div>
      <div class="weather-block__temperature">13°C</div>
    </div>
    <div class="weather-block__bottom">
      <div class="weather-block__icon-wrapper">
        <img :src="weatherRainyUrl" />
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