<script setup>
import DayWidget from './components/DayWidget/DayWidget.vue';
import TheControlsOverlay from './components/TheControlsOverlay/TheControlsOverlay.vue';
import DAY_WIDGET_CONSTANTS from './components/DayWidget/constants.js';
import { ref, computed } from 'vue';
import CONSTANTS from './constants.js';

const setThemeColorCodesToBody = (theme) => {
  console.log('CONSTANTS: ', CONSTANTS);
  let currentThemeColorCollection = CONSTANTS.COLOR_COLLECTION[theme];
  if (!currentThemeColorCollection) {
    currentThemeColorCollection = CONSTANTS.COLOR_COLLECTION[DAY_WIDGET_CONSTANTS.THEME.DARK];
  }
  console.log('currentThemeColorCollection: ', currentThemeColorCollection);
  const body = document.querySelector('body');
  body.style = '';
  const bodyStyleArray = [];
  Object.keys(currentThemeColorCollection).forEach((colorKey) => {
    bodyStyleArray.push(`--color_${colorKey}: ${currentThemeColorCollection[colorKey]}`);
  });
  body.style = bodyStyleArray.join('; ');
  console.log('body: ', body);
};

const getDayWidgetTheme = computed(() => {
  if (!window.localStorage) {
    return DAY_WIDGET_CONSTANTS.THEME.DARK;
  }
  const themeFromLS = window.localStorage.getItem('theme');
  if (themeFromLS) {
    setThemeColorCodesToBody(themeFromLS);
    return themeFromLS;
  }
  const defaultTheme = DAY_WIDGET_CONSTANTS.THEME.DARK;
  setThemeColorCodesToBody(defaultTheme);
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
  setThemeColorCodesToBody(theme);
  localStorage.setItem('theme', theme);
}

const computedWidgetWrapperClass = computed(() => ({
  'widget-wrapper_theme_dark': currentTheme.value === DAY_WIDGET_CONSTANTS.THEME.DARK,
  'widget-wrapper_theme_light': currentTheme.value === DAY_WIDGET_CONSTANTS.THEME.LIGHT,
}));
</script>

<template>
  <div class="widget-wrapper" :class="computedWidgetWrapperClass">
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
  background-size: cover;
  background-position: center center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &_theme {
    &_dark {
      background-image: url('@/assets/background-dark.jpg');
    }
    &_light {
      background-image: url('@/assets/background-light.jpg');
    }
  }
}
.controls-overlay-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
