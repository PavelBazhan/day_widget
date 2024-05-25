<script setup>
import ControlsOverlayButton from './components/ControlsOverlayButton.vue';

const props = defineProps({
  currentTheme: {
    type: String,
    default: null,
  },
});

const emit = defineEmits([ 'setLanguage', 'setDayWidgetTheme' ]);

const themeIsSelected = (theme) => theme === props.currentTheme;

const setLanguage = (languageCode) => {
  emit('setLanguage', languageCode);
}

const setDayWidgetTheme = (theme) => {
  emit('setDayWidgetTheme', theme);
}
</script>

<template>
  <div class="controls-overlay">
    <div class="controls-overlay__background">
      <div class="controls-overlay__author-block">
        <div class="c-block">
          <div class="c-block__title">Разработка:</div>
          <div>
            <a target="_blank" href="https://github.com/PavelBazhan/">Павел Бажан</a>
          </div>
        </div>
        <div class="c-block">
          <div class="c-block__title">Дизайн:</div>
          <div>
            <a target="_blank" href="https://nataliia-shishkina.ru/">Наталия Шишкина</a>
          </div>
        </div>
      </div>
      <div class="controls-overlay__controls-block">
        <div class="c-block">
          <div class="c-block__title">Язык:</div>
          <div>
            <ControlsOverlayButton class="mr-1" :disabled="true" @click="setLanguage('ruRU')">Русский</ControlsOverlayButton>
            <ControlsOverlayButton @click="setLanguage('enUS')">Английский</ControlsOverlayButton>
          </div>
        </div>
        <div class="c-block">
          <div class="c-block__title">Тема:</div>
          <div>
            <ControlsOverlayButton
              class="mr-1"
              :disabled="themeIsSelected('DARK')"
              @click="setDayWidgetTheme('DARK')"
            >
              Темная
            </ControlsOverlayButton>
            <ControlsOverlayButton
              :disabled="themeIsSelected('LIGHT')"
              @click="setDayWidgetTheme('LIGHT')"
            >
              Светлая
            </ControlsOverlayButton>
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
    width: 84px;
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