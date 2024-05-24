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
        <div class="person-link">
          <div class="person-link__title">Разработка:</div>
          <div>
            <a target="_blank" href="https://github.com/PavelBazhan/">Павел Бажан</a>
          </div>
        </div>
        <div class="person-link">
          <div class="person-link__title">Дизайн:</div>
          <div>
            <a target="_blank" href="https://nataliia-shishkina.ru/">Наталия Шишкина</a>
          </div>
        </div>
      </div>
      <div class="controls-overlay__controls-block">
        <div class="language-controls mr-8">
          <div class="language-controls__title">
            <span>Язык</span>
          </div>
          <div class="language-controls__buttons">
            <ControlsOverlayButton :selected="true" :disabled="true" @click="setLanguage('ruRU')">Ру</ControlsOverlayButton>
            <ControlsOverlayButton @click="setLanguage('enUS')">Англ</ControlsOverlayButton>
          </div>
        </div>
        <div class="theme-controls">
          <div class="theme-controls__title">
            <span>Тема</span>
          </div>
          <div class="theme-controls__buttons">
            <!-- <ControlsOverlayButton :selected="true" :disabled="true" @click="setDayWidgetTheme('DARK')">Темная</ControlsOverlayButton> -->
            <ControlsOverlayButton
              :selected="themeIsSelected('DARK')"
              :disabled="themeIsSelected('DARK')"
              @click="setDayWidgetTheme('DARK')"
            >
              Темная
            </ControlsOverlayButton>
            <ControlsOverlayButton
              :selected="themeIsSelected('LIGHT')"
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
  background: linear-gradient(138deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.02) 100%);
  backdrop-filter: blur(8px);
  color: #ECFEFF;
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
    display: flex;
  }
}
.person-link {
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