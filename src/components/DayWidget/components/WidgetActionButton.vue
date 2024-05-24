<script setup>
import { computed } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    default: null,
  },
});

const iconComputedClass = computed(() => {
  if (!props.icon) {
    return;
  }
  const iconClass = `icon-${ props.icon }`;
  return {
    [ iconClass ]: true,
  };
});
</script>

<template>
  <button class="widget-action-button">
    <div class="icon" :class="iconComputedClass"></div>
  </button>
</template>

<style scoped lang="scss">
.widget-action-button {
  display: block;
  background-color: var(--color_slotBg);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 24px;
  color: var(--color_content);
  border: 2px solid transparent;
  transition: all 0.1s ease;
  &:hover {
    border-color: var(--color_content);
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
}
</style>