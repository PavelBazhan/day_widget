<script setup>
import { reactive, computed } from 'vue';

const phraseCollection = reactive([
  {
    en: 'jump at the opportunity',
    ru: 'воспользоваться возможностью',
  },
  {
    en: 'give somebody an edge',
    ru: 'давать преимущество',
  },
  {
    en: 'trials and tribulations',
    ru: 'испытания и невзгоды',
  },
  {
    en: 'in the blink of an eye',
    ru: 'в мгновение ока',
  },
{
    en: 'get goosebumps',
    ru: 'мурашки по коже',
  },
{
    en: 'go to pieces',
    ru: 'терять присутствие духа',
  },
{
    en: 'reinvent the wheel',
    ru: 'изобретать велосипед',
  },
]);

const phrase = computed(() => {
  const index = Math.floor(Math.random() * phraseCollection.length);
  return phraseCollection[index];
});
</script>

<template>
  <div class="day-widget-dictionary">
    <div class="day-widget-dictionary__icon-wrapper">
      <div class="icon icon-handbook"></div>
    </div>
    <div class="day-widget-dictionary__original-text-wrapper">
      <span>{{ phrase.en }}</span>
    </div>
    <div class="day-widget-dictionary__translated-text-wrapper">
      <span>{{ phrase.ru }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.day-widget-dictionary {
  width: 100%;
  min-height: 112px;
  border-radius: 12px;
  background-color: var(--color_slotBg);
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;
  gap: 8px;
  padding: 12px 8px 8px 8px;
  &__icon-wrapper {
    width: 32px;
    height: 32px;
    font-size: 24px;
    color: var(--color_accent);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__original-text-wrapper {
    font-size: 24px;
    line-height: 30px;
    font-weight: 500;
    color: var(--color_accent);
  }
  &__translated-text-wrapper {
    font-size: 14px;
    line-height: 18px;
  }
}
</style>