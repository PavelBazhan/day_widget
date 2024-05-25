<script setup>
import { inject } from 'vue';
import ControlsOverlayButton from './components/ControlsOverlayButton.vue';

const props = defineProps({
  currentTheme: {
    type: String,
    default: null,
  },
  currentLanguage: {
    type: String,
    default: null,
  },
});

const emit = defineEmits([ 'setLanguage', 'setDayWidgetTheme' ]);

const getLocaleValue = inject('getLocaleValue');

const setLanguage = (languageCode) => {
  if (languageCode === props.currentLanguage) {
    return;
  }
  emit('setLanguage', languageCode);
}

const themeIsSelected = (theme) => theme === props.currentTheme;

const setDayWidgetTheme = (theme) => {
  if (themeIsSelected(theme)) {
    return;
  }
  emit('setDayWidgetTheme', theme);
}

const LABEL_COLLECTION = {
  DEVELOPMENT: {
    localeValues: [ 'Development:', 'Разработка:' ],
  },
  DEVELOPER: {
    localeValues: [ 'Pavel Bazhan', 'Павел Бажан' ],
  },
  DESIGN: {
    localeValues: [ 'Design:', 'Дизайн:' ],
  },
  DESIGNER: {
    localeValues: [ 'Natalia Shishkina', 'Наталия Шишкина' ],
  },
  LANGUAGE: {
    localeValues: [ 'Language:', 'Язык:' ],
  },
  LANGUAGE_EN: {
    localeValues: [ 'English', 'Английский' ],
  },
  LANGUAGE_RU: {
    localeValues: [ 'Russian', 'Русский' ],
  },
  THEME: {
    localeValues: [ 'Theme:', 'Тема:' ],
  },
  THEME_DARK: {
    localeValues: [ 'Dark', 'Тёмная' ],
  },
  THEME_LIGHT: {
    localeValues: [ 'Light', 'Светлая' ],
  },
};
</script>

<template>
  <div class="controls-overlay">
    <div class="controls-overlay__background">
      <div class="controls-overlay__author-block">
        <div class="c-block">
          <div class="c-block__title">{{ getLocaleValue(LABEL_COLLECTION.DEVELOPMENT) }}</div>
          <div>
            <a target="_blank" href="https://github.com/PavelBazhan/">{{ getLocaleValue(LABEL_COLLECTION.DEVELOPER) }}</a>
          </div>
        </div>
        <div class="c-block">
          <div class="c-block__title">{{ getLocaleValue(LABEL_COLLECTION.DESIGN) }}</div>
          <div>
            <a target="_blank" href="https://nataliia-shishkina.ru/">{{ getLocaleValue(LABEL_COLLECTION.DESIGNER) }}</a>
          </div>
        </div>
      </div>
      <div class="controls-overlay__controls-block">
        <div class="c-block">
          <div class="c-block__title">{{ getLocaleValue(LABEL_COLLECTION.LANGUAGE) }}</div>
          <div>
            <ControlsOverlayButton class="mr-1" @click="setLanguage('en')">{{ getLocaleValue(LABEL_COLLECTION.LANGUAGE_EN) }}</ControlsOverlayButton>
            <ControlsOverlayButton @click="setLanguage('ru')">{{ getLocaleValue(LABEL_COLLECTION.LANGUAGE_RU) }}</ControlsOverlayButton>
          </div>
        </div>
        <div class="c-block">
          <div class="c-block__title">{{ getLocaleValue(LABEL_COLLECTION.THEME) }}</div>
          <div>
            <ControlsOverlayButton class="mr-1" @click="setDayWidgetTheme('DARK')">{{ getLocaleValue(LABEL_COLLECTION.THEME_DARK) }}</ControlsOverlayButton>
            <ControlsOverlayButton @click="setDayWidgetTheme('LIGHT')">{{ getLocaleValue(LABEL_COLLECTION.THEME_LIGHT) }}</ControlsOverlayButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.controls-overlay {
  width: 100%;
  height: 80px;
  padding: 12px 36px;
  display: flex;
  justify-content: center;
  background-color: var(--color_slotBg);
  backdrop-filter: blur(8px);
  color: var(--color_content);
  font-family: "SF Pro";
  &__background {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1024px;
  }
  &__author-block {
    font-size: 14px;
    line-height: 18px;
  }
  &__controls-block {
    font-size: 14px;
    line-height: 18px;
  }
}
.c-block {
  display: flex;
  &__title {
    width: 92px;
    margin-right: 0.5em;
    opacity: 0.7;
    text-align: right;
  }
}
.language-controls {
  width: 92px;
}
.theme-controls {
  width: 148px;
}
.language-controls,
.theme-controls {
  &__title {
    display: flex;
    justify-content: center;
    opacity: 0.7;
    font-size: 14px;
    line-height: 18px;
  }
  &__buttons {
    display: flex;
    justify-content: space-between;
  }
}
</style>