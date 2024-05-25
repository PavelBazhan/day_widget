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
  width: 100%;
  height: 48px;
  background-color: var(--color_slotBg);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: var(--color_contentTp);
  border: 2px solid transparent;
  transition: all 0.1s ease;
  .icon {
    width: 24px;
    height: 24px;
  }
  &:hover {
    border-color: var(--color_contentTp);
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
}
</style>