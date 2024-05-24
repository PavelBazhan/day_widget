<script setup>
import DayWidget from './components/DayWidget/DayWidget.vue';
import TheControlsOverlay from './components/TheControlsOverlay/TheControlsOverlay.vue';
import DAY_WIDGET_CONSTANTS from './components/DayWidget/constants.js';
import { ref, computed } from 'vue';

const getDayWidgetTheme = computed(() => {
  if (!window.localStorage) {
    return DAY_WIDGET_CONSTANTS.THEME.DARK;
  }
  const themeFromLS = window.localStorage.getItem('theme');
  if (themeFromLS) {
    return themeFromLS;
  }
  const defaultTheme = DAY_WIDGET_CONSTANTS.THEME.DARK;
  localStorage.setItem('theme', defaultTheme);
  return defaultTheme;
});

const currentTheme = ref(getDayWidgetTheme.value);

const setLanguage = (languageCode) => {
  console.log('setLanguage: ', languageCode);
}

const setDayWidgetTheme = (theme) => {
  currentTheme.value = theme;
  if (!window.localStorage) {
    return;
  }
  localStorage.setItem('theme', theme);
}
</script>

<template>
  <div class="widget-wrapper">
    <DayWidget :theme="currentTheme"/>
  </div>
  <div class="controls-overlay-wrapper">
    <TheControlsOverlay
      :currentTheme="currentTheme"
      @setLanguage="setLanguage"
      @setDayWidgetTheme="setDayWidgetTheme"
    />
  </div>
</template>

<style scoped lang="scss">
.widget-wrapper {
  background-image: url('background-forest.jpg');
  background-size: cover;
  background-position: center center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.controls-overlay-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
