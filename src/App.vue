<script setup>
import DayWidget from './components/DayWidget/DayWidget.vue';
import TheControlsOverlay from './components/TheControlsOverlay/TheControlsOverlay.vue';
import DAY_WIDGET_CONSTANTS from './components/DayWidget/constants.js';
import { ref, computed, provide } from 'vue';
import CONSTANTS from './constants.js';

const setThemeColorCodesToBody = (theme) => {
  let currentThemeColorCollection = CONSTANTS.COLOR_COLLECTION[theme];
  if (!currentThemeColorCollection) {
    currentThemeColorCollection = CONSTANTS.COLOR_COLLECTION[DAY_WIDGET_CONSTANTS.THEME.DARK];
  }
  const body = document.querySelector('body');
  body.style = '';
  const bodyStyleArray = [];
  Object.keys(currentThemeColorCollection).forEach((colorKey) => {
    bodyStyleArray.push(`--color_${colorKey}: ${currentThemeColorCollection[colorKey]}`);
  });
  body.style = bodyStyleArray.join('; ');
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

const setDayWidgetTheme = (theme) => {
  currentTheme.value = theme;
  if (!window.localStorage) {
    return;
  }
  setThemeColorCodesToBody(theme);
  localStorage.setItem('theme', theme);
}

const getLanguage = computed(() => {
  if (!window.localStorage) {
    return CONSTANTS.LANGUAGE.RU;
  }
  const languageFromLS = window.localStorage.getItem('language');
  if (languageFromLS) {
    return languageFromLS;
  }
  const defaultLanguage = CONSTANTS.LANGUAGE.RU;
  localStorage.setItem('language', defaultLanguage);
  return defaultLanguage;
});

const currentLanguage = ref(getLanguage.value);

const setLanguage = (languageCode) => {
  console.log('setLanguage: ', languageCode);
  currentLanguage.value = languageCode;
  if (!window.localStorage) {
    return;
  }
  localStorage.setItem('language', languageCode);
}

const computedWidgetWrapperClass = computed(() => ({
  'widget-wrapper_theme_dark': currentTheme.value === DAY_WIDGET_CONSTANTS.THEME.DARK,
  'widget-wrapper_theme_light': currentTheme.value === DAY_WIDGET_CONSTANTS.THEME.LIGHT,
}));

provide('getLocaleValue', (multilocaleObject) => {
  let index = Object.keys(CONSTANTS.LANGUAGE).findIndex((l) => CONSTANTS.LANGUAGE[l] === currentLanguage.value);
  if (index === -1) {
    index = 0;
  }
  return multilocaleObject.localeValues[index];
});

provide('currentLanguage', currentLanguage);
</script>

<template>
  <div class="widget-wrapper" :class="computedWidgetWrapperClass">
    <DayWidget :theme="currentTheme" :language="currentLanguage"/>
  </div>
  <div class="controls-overlay-wrapper">
    <TheControlsOverlay
      :currentTheme="currentTheme"
      :currentLanguage="currentLanguage"
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
